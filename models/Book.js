const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: true,
    },
    authorFirstName: {
        type: String,
        required: true,
    },
    authorLastName: {
        type: String,
    },
    finished: {
        type: Boolean,
        required: true,
    },
    favorite: {
        type: Boolean,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Book', BookSchema);
