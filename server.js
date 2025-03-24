const express = require('express');
const app = express();
const connectDB = require('./config/database');
const methodOverride = require('method-override');

require('dotenv').config({ path: './config/.env' });

connectDB();

app.set('view engine', 'ejs'); // Use EJS for views
app.use(express.static('public')); // Static folder
app.use(methodOverride('_method')); // Use forms for put/delete
// Body parsing
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
