const express = require('express');
const {
  getAllBookings,
  getAllUsers,
  toggleUserStatus,
  getAnalytics
} = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { isAdmin } = require('../middleware/role.middleware');

const router = express.Router();

// Get all bookings
router.get('/bookings', authMiddleware, isAdmin, getAllBookings);

// Get all users
router.get('/users', authMiddleware, isAdmin, getAllUsers);

// Toggle user status (activate/deactivate)
router.put('/users/:id/toggle', authMiddleware, isAdmin, toggleUserStatus);

// Get analytics
router.get('/analytics', authMiddleware, isAdmin, getAnalytics);

module.exports = router;
