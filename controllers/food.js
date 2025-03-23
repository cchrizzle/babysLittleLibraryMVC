const Food = require('../models/Food');

module.exports = {
    getFood: async (req, res) => {
        try {
            const faves = await Food.find({ faves: true });
            res.render('../views/food');
        } catch (err) {
            console.error(err);
        }
    },
};
