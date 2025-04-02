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
    dateFinished: {
        type: Date,
    },
    readCount: {
        type: Number,
        default: 0,
    },
    readHistory: [
        {
            dateFinished: Date,
        },
    ],
    favorite: {
        type: Boolean,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Book', BookSchema);
