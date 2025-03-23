const express = require('express');
const app = express();
const connectDB = require('./config/database');

require('dotenv').config({ path: './config/.env' });

connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const homeRoutes = require('./routes/home');
const bookRoutes = require('./routes/books');
const toysRoutes = require('./routes/toys');
const foodRoutes = require('./routes/food');
app.use('/', homeRoutes);
app.use('/books', bookRoutes);
app.use('/toys', toysRoutes);
app.use('/food', foodRoutes);

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}, you better go catch it!`);
});
