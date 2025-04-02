const Book = require('../models/Book');

module.exports = {
    getLogin: (req, res) => {
        if (!req.user) {
            return res.render('login');
        }
    },
    getIndex: async (req, res) => {
        const bookCount = await Book.countDocuments({ user: req.user._id });
        const finishedBooks = await Book.find({ user: req.user.id, finished: true });
        const finishedBooksCount = await Book.countDocuments({ user: req.user.id, finished: true });
        const unreadBooks = await Book.find({ user: req.user.id, finished: false });
        const unreadBooksCount = await Book.countDocuments({ user: req.user.id, finished: false });
        res.render('index.ejs', { bookCount, finished: finishedBooks, finishedCount: finishedBooksCount, unread: unreadBooks, unreadCount: unreadBooksCount });
    },
};
