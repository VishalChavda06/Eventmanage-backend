const Notification = require('../models/notification.model');

/**
 * Sends a notification to a user
 * @param {string} userId - The user ID
 * @param {string} message - The notification message
 * @param {string} type - Type of notification: "booking", "payment", "event", "general"
 * @param {string} link - Link associated with the notification
 * 
 * Note: Failures are silently caught - notification errors must never break booking flow
 */
module.exports = async function sendNotification(userId, message, type, link) {
  try {
    const notification = new Notification({
      user: userId,
      message,
      type,
      link,
      isRead: false
    });

    await notification.save();
  } catch (error) {
    // Silently catch notification errors - must not break main flow
    console.error('Notification error (non-blocking):', error);
  }
};
