const express = require('express');
const router = express.Router();
const toysController = require('../controllers/toys.js');

router.get('/', toysController.getToys);

router.post('/addToy', toysController.addToy);

module.exports = router;
