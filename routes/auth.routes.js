const express = require('express');

const router = express.Router();

const {
    registerUser,
    loginUser
} = require('../controllers/auth.controller');

const auth = require('../middleware/auth.middleware');
const { getProfile, updateProfile } = require('../controllers/auth.controller');

// create user
router.post('/register', registerUser)

// login user
router.post('/login', loginUser)

// protected: get user profile
router.get('/profile', auth, getProfile);

// protected: update user profile
router.put('/profile', auth, updateProfile);

module.exports = router;