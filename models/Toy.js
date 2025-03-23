const mongoose = require('mongoose');

const ToySchema = new mongoose.Schema({
    company: {
        type: String,
    },
    toy: {
        type: String,
        required: true,
    },
    added: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Toy', ToySchema);
