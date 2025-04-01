const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const homeController = require('../controllers/home');

router.get('/', ensureAuth, homeController.getIndex);

module.exports = router;
