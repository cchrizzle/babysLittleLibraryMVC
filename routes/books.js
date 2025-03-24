const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');

router.get('/', booksController.getBooks);

router.post('/addBook', booksController.addBook);

// Adding below following Leon's setup, but need to process and see.

router.put('/markComplete/:id', booksController.markComplete);

router.put('markToRead/:id', booksController.markToRead);

router.put('markFave/:id', booksController.markFave);

router.delete('/deleteBook/:id', booksController.deleteBook);

module.exports = router;
