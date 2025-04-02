const Book = require('../models/Book');

module.exports = {
    addBook: async (req, res) => {
        try {
            const { bookTitle, authorFirstName, authorLastName, finished, favorite } = req.body;
            if (!bookTitle || !authorFirstName) {
                return res.status(400).json({ error: 'Title and first name required!' });
            }
            const bookData = {
                bookTitle,
                authorFirstName,
                authorLastName,
                finished: finished === 'true', // To enforce boolean
                favorite,
                user: req.user._id,
            };

            // Only add dateFinished if book finished and date provided
            if (finished === 'true') {
                const { dateFinished } = req.body;
                if (finished === true) {
                    const finishedDate = dateFinished ? new Date(dateFinished) : new Date();
                    bookData.dateFinished = finishedDate;
                    bookData.readCount = 1;
                    bookData.readHistory = [{ dateFinished: finishedDate }];
                }
            }

            const newBook = await Book.create(bookData);

            // 3/24/25: Commenting out to reload page, but keeping for future reference: res.status(201).json({ message: 'Book added successfully!', book: newBook });
            console.log(`Book added successfully! "${newBook.bookTitle}" by ${newBook.authorFirstName} ${authorLastName}`);
            res.redirect('/');
        } catch (err) {
            console.error('Error creating book: ', err);
            res.status(500).send('Error adding book.');
        }
    },
    markFinished: async (req, res) => {
        try {
            const currentDate = new Date();

            // Find book
            const book = await Book.findById(req.params.id);
            if (!book) {
                return res.status(404).send('Book not found.');
            }

            // Increment read count and update history
            const finishedBook = await Book.findOneAndUpdate(
                { _id: req.params.id },
                {
                    finished: true,
                    dateFinished: currentDate,
                    $inc: { readCount: 1 }, // Increment read count
                    $push: { readHistory: { dateFinished: currentDate } }, // Add to history
                },
                { new: true }
            );
            console.log(`Finished "${finishedBook.bookTitle}", good job!`);
            res.redirect('/');
        } catch (err) {
            console.error(`Error marking as finished: ${err}`);
        }
    },
    markToRead: async (req, res) => {
        try {
            const toReadBook = await Book.findOneAndUpdate({ _id: req.params.id }, { finished: false }, { new: true });
            console.log(`Added ${toReadBook.bookTitle} to reading list! You've read this book ${toReadBook.readCount} times!`);
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
            const deletedBook = await Book.findOneAndDelete({ _id: req.params.id });
            console.log(`Deleted book: "${deletedBook.bookTitle}".`);
            res.redirect('/');
        } catch (err) {
            console.error(`Error deleting book: ${err}`);
        }
    },
    getReadingStats: async (req, res) => {
        try {
            // Get most read books
            const mostReadBooks = await Book.find({ user: req.user._id }).sort({ readCount: -1 }).limit(10);

            // Get monthly reading counts
            const monthlyReadingCounts = await Book.aggregate([
                { $match: { user: req.user._id } },
                { $unwind: '$readHistory' },
                {
                    $group: {
                        _id: {
                            month: { $month: '$readHistory.dateFinished' },
                            year: { $year: '$readHistory.dateFinished' },
                        },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { '_id.year': 1, '_id.month': 1 } },
            ]);
            res.render('stats', {
                mostReadBooks,
                monthlyReadingCounts,
                user: req.user,
            });
        } catch (err) {
            console.error(`Error getting reading stats: ${err}`);
            res.status(500).send('Error retrieving reading statistics.');
        }
    },
};
