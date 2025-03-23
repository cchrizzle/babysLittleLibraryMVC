const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');

router.get('/', homeController.getIndex);

// 3/21/25: Trying to add delete route

module.exports = router;
