const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const connectDB = require('./config/database');

require('dotenv').config({ path: './config/.env' }); // .env file

require('./config/passport'); // Require passport

connectDB();

app.set('view engine', 'ejs'); // Use EJS for views
app.use(express.static('public')); // Static folder
// Body parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method')); // Use forms for put/delete

// Passport session
app.use(
    session({
        secret: process.env.PASSPORT_SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_STRING, collectionName: 'sessions' }),
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('errors');
    next();
});

// Global variables middleware (for user interactions in header partial)
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

// Routes
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const booksRouter = require('./routes/books');
app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/books', booksRouter);

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}, you better go catch it!`);
});
