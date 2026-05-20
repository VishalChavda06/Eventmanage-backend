const Booking = require('../models/booking.model');
const User = require('../models/user.model');
const Event = require('../models/event.model');
const { successResponse, errorResponse } = require('../utils/formatResponse');

/**
 * Get all bookings from the system
 * GET /api/admin/bookings
 * Admin only
 */
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate({
        path: 'event',
        select: 'title date location organizer',
        populate: {
          path: 'organizer',
          select: 'name email'
        }
      })
      .sort({ createdAt: -1 });

    return successResponse(res, 'All bookings fetched', bookings);
  } catch (error) {
    console.error('Fetch all bookings error:', error);
    return errorResponse(res, 'Error fetching bookings', 500);
  }
};

/**
 * Get all users
 * GET /api/admin/users
 * Admin only
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    return successResponse(res, 'Users fetched', users);
  } catch (error) {
    console.error('Fetch users error:', error);
    return errorResponse(res, 'Error fetching users', 500);
  }
};

/**
 * Toggle user active/inactive status
 * PUT /api/admin/users/:id/toggle
 * Admin only
 */
exports.toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    // Flip isActive status
    user.isActive = !user.isActive;
    await user.save();

    return successResponse(res, 'User status updated', user);
  } catch (error) {
    console.error('Toggle user status error:', error);
    return errorResponse(res, 'Error updating user status', 500);
  }
};

/**
 * Get analytics data for admin dashboard
 * GET /api/admin/analytics
 * Admin only
 */
exports.getAnalytics = async (req, res) => {
  try {
    // Run all queries in parallel using Promise.all
    const [totalUsers, totalEvents, totalBookings, confirmedBookings, cancelledBookings, revenueData] = await Promise.all([
      // Count total users
      User.countDocuments(),

      // Count total events
      Event.countDocuments(),

      // Count total bookings
      Booking.countDocuments(),

      // Count confirmed bookings
      Booking.countDocuments({ status: 'confirmed' }),

      // Count cancelled bookings
      Booking.countDocuments({ status: 'cancelled' }),

      // Sum total revenue from confirmed bookings
      Booking.aggregate([
        {
          $match: { status: 'confirmed' }
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$totalAmount' }
          }
        }
      ])
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    return successResponse(res, 'Analytics fetched', {
      totalUsers,
      totalEvents,
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      totalRevenue
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return errorResponse(res, 'Error fetching analytics', 500);
  }
};
