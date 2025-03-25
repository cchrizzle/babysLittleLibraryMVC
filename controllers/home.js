const Book = require('../models/Book');

module.exports = {
    getIndex: async (req, res) => {
        const bookCount = await Book.find();
        const finishedBooks = await Book.find({ finished: true });
        const finishedBooksCount = await Book.countDocuments({ finished: true });
        const unreadBooks = await Book.find({ finished: false });
        const unreadBooksCount = await Book.countDocuments({ finished: false });
        res.render('index.ejs', { bookCount, finished: finishedBooks, finishedCount: finishedBooksCount, unread: unreadBooks, unreadCount: unreadBooksCount });
    },
};
