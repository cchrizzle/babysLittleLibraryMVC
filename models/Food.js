const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    companyName: {
        type: String,
    },
    dish: {
        type: String,
    },
});

module.exports = mongoose.model('Food', FoodSchema);
