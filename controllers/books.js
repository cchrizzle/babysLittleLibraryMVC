const Book = require('../models/Book');

module.exports = {
    getBooks: async (req, res) => {
        try {
            const bookList = await Book.find();
            const booksRead = await Book.countDocuments({ finished: true });
            res.render('index.ejs', { books: bookList, finished: booksRead });
        } catch (err) {
            console.error(err);
        }
    },
    addBook: async (req, res) => {
        try {
            const { bookTitle, authorFirstName, authorLastName, finished, favorite } = req.body;
            if (!bookTitle || !authorFirstName) {
                return res.status(400).json({ error: 'Title and first name required!' });
            }
            const newBook = await Book.create({
                bookTitle,
                authorFirstName,
                authorLastName,
                finished: finished === 'true', // To enforce boolean
                favorite,
            });

            // 3/24/25: Commenting out to reload page, but keeping for future reference: res.status(201).json({ message: 'Book added successfully!', book: newBook });
            console.log(`Book added successfully! ${newBook.bookTitle} by ${newBook.authorFirstName} ${authorLastName}`);
            res.redirect('/');
        } catch (err) {
            console.error('Error creating book: ', err);
            res.status(500).send('Error adding book.');
        }
    },
    markComplete: async (req, res) => {
        try {
            const entry = { _id: req.params.id };
            const completedBook = await Book.findOne(entry);
            await Book.findOneAndUpdate(entry, {
                finished: true,
            });
            console.log(`Finished ${completedBook.bookTitle}, good job!`);
            res.redirect('/');
        } catch (err) {
            console.error(err);
        }
    },
    markToRead: async (req, res) => {
        try {
            await Book.findOneAndUpdate(
                { _id: req.params.id },
                {
                    finished: false,
                }
            );
            console.log('Added to reading list!');
            res.redirect('/');
        } catch (err) {
            console.error(`Error marking as read: ${err}`);
        }
    },
    markFave: async (req, res) => {
        try {
            await Book.findOneAndUpdate(
                { _id: req.body.id },
                {
                    favorite: true,
                }
            );
            console.log('Added book to favorites!');
            res.json('Added book to favorites!');
        } catch (err) {
            console.error('Error favoriting book: ', err);
            res.status(500).send('Error favoriting book.');
        }
    },
    deleteBook: async (req, res) => {
        try {
            const deletedBook = await Book.findOne({ _id: req.params.id });
            await Book.deleteOne({ _id: req.params.id });
            console.log(`Deleted book: ${deletedBook.bookTitle}.`);
            res.redirect('/');
        } catch (err) {
            console.error(`Error deleting book: ${err}`);
        }
    },
};
