const Booking = require('../models/booking.model');
const Event = require('../models/event.model');
const Ticket = require('../models/ticket.model');
const generateTicketCode = require('../utils/generateTicketCode');
const sendNotification = require('../utils/sendNotification');
const { successResponse, errorResponse } = require('../utils/formatResponse');

/**
 * Create a new booking for an event
 * POST /api/bookings
 * Protected - requires authentication
 */
exports.createBooking = async (req, res) => {
  try {
    const { eventId, seatsBooked } = req.body;

    // Validate required fields
    if (!eventId || seatsBooked === undefined) {
      return errorResponse(res, 'Event ID and seats booked are required', 400);
    }

    // Validate seats
    if (seatsBooked < 1) {
      return errorResponse(res, 'Must book at least 1 seat', 400);
    }

    // Check if user has already booked this event
    const existingBooking = await Booking.findOne({
      user: req.user._id,
      event: eventId,
      status: { $ne: 'cancelled' }
    });
    if (existingBooking) {
      return errorResponse(res, 'You have already booked this event', 400);
    }

    // Find event
    const event = await Event.findById(eventId);
    if (!event) {
      return errorResponse(res, 'Event not found', 404);
    }

    // Check event status
    if (event.status === 'cancelled') {
      return errorResponse(res, 'This event has been cancelled', 400);
    }

    // Check available seats
    if (event.availableSeats < seatsBooked) {
      return errorResponse(res, 'Not enough seats available', 400);
    }

    // Calculate total amount
    const totalAmount = event.isFree ? 0 : event.price * seatsBooked;

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      event: eventId,
      seatsBooked,
      totalAmount,
      status: 'confirmed'
    });
    await booking.save();

    // Reduce available seats in event
    event.availableSeats -= seatsBooked;
    await event.save();

    // Generate ticket code
    const ticketCode = generateTicketCode();

    // Create ticket
    const ticket = new Ticket({
      booking: booking._id,
      user: req.user._id,
      event: eventId,
      ticketCode,
      status: 'active'
    });
    await ticket.save();

    // Send notification
    await sendNotification(
      req.user._id,
      `Your booking for ${event.title} is confirmed! Ticket: ${ticketCode}`,
      'booking',
      '/dashboard/bookings'
    );

    return successResponse(res, 'Booking confirmed successfully', {
      booking,
      ticket
    }, 201);
  } catch (error) {
    console.error('Booking creation error:', error);
    return errorResponse(res, 'Error creating booking', 500);
  }
};

/**
 * Get all bookings for the logged-in user
 * GET /api/bookings/my
 * Protected - requires authentication
 */
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('event', 'title date time location image price status')
      .populate({
        path: 'event',
        populate: {
          path: 'organizer',
          select: 'name email'
        }
      })
      .sort({ createdAt: -1 });

    return successResponse(res, 'Bookings fetched', bookings);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return errorResponse(res, 'Error fetching bookings', 500);
  }
};

/**
 * Cancel a booking
 * PUT /api/bookings/:id/cancel
 * Protected - requires authentication
 */
exports.cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return errorResponse(res, 'Booking not found', 404);
    }

    // Check authorization
    if (booking.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Not authorized to cancel this booking', 403);
    }

    // Check if already cancelled
    if (booking.status === 'cancelled') {
      return errorResponse(res, 'Booking is already cancelled', 400);
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save();

    // Restore available seats
    const event = await Event.findById(booking.event);
    event.availableSeats += booking.seatsBooked;
    await event.save();

    // Cancel related ticket
    const ticket = await Ticket.findOne({ booking: booking._id });
    if (ticket) {
      ticket.status = 'cancelled';
      await ticket.save();
    }

    // Send notification
    await sendNotification(
      req.user._id,
      `Your booking for ${event.title} has been cancelled`,
      'booking',
      '/dashboard/bookings'
    );

    return successResponse(res, 'Booking cancelled successfully');
  } catch (error) {
    console.error('Cancel booking error:', error);
    return errorResponse(res, 'Error cancelling booking', 500);
  }
};
