const Toy = require('../models/Toy');

module.exports = {
    getToys: async (req, res) => {
        try {
            const toyList = await Toy.find();
        } catch (err) {
            console.error(err);
        }
    },
    addToy: async (req, res) => {
        try {
            const { toyCompanyName, toy } = req.body;

            const newToy = await Toy.create({
                toyCompanyName,
                toy,
            });

            res.status(201).json({ message: 'Toy added successfully!', toy: newToy });
        } catch (err) {
            console.error(`Error adding toy: ${err}`);
            res.status(500).send('Error adding toy.');
        }
    },
};
