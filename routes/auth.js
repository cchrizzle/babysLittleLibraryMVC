const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth');

// Login
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Signup
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

// Logout
router.post('/logout', authController.logout);

module.exports = router;
