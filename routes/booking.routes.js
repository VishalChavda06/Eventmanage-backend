const express = require('express');
const {
  createBooking,
  getUserBookings,
  cancelBooking
} = require('../controllers/booking.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Create a new booking
router.post('/', authMiddleware, createBooking);

// Get user's bookings
router.get('/my', authMiddleware, getUserBookings);

// Cancel a booking
router.put('/:id/cancel', authMiddleware, cancelBooking);

module.exports = router;
