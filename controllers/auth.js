const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');

module.exports = {
    getLogin: (req, res) => {
        if (req.user) {
            return res.redirect('/');
        }
        res.render('login', {
            title: 'Login',
        });
    },

    postLogin: (req, res, next) => {
        const validationErrors = [];
        if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
        if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });

        if (validationErrors.length) {
            req.flash('errors', validationErrors);
            return res.redirect('/login');
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        });

        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                req.flash('errors', info);
                return res.redirect('/login');
            }
            req.logIn(user, err => {
                if (err) {
                    return next(err);
                }
                req.flash('success', { msg: 'Success! You are logged in.' });
                res.redirect(req.session.returnTo || '/');
            });
        })(req, res, next);
    },

    getSignup: (req, res) => {
        if (req.user) {
            return res.redirect('/');
        }
        res.render('signup', {
            title: 'Create Account',
        });
    },

    postSignup: async (req, res, next) => {
        try {
            const validationErrors = [];
            if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
            if (!validator.isLength(req.body.password, { min: 8 }))
                validationErrors.push({
                    msg: 'Password must be at least 8 characters long',
                });
            if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' });

            if (validationErrors.length) {
                req.flash('errors', validationErrors);
                return res.redirect('../signup');
            }
            req.body.email = validator.normalizeEmail(req.body.email, {
                gmail_remove_dots: false,
            });

            // Check if user already exists
            const existingUser = await User.findOne({
                $or: [{ email: req.body.email }, { username: req.body.username }],
            });

            if (existingUser) {
                req.flash('errors', {
                    msg: 'Account with that email address or username already exists.',
                });
                return res.redirect('../signup');
            }

            // Create new user
            const user = new User({
                createdAt: req.body.createdAt,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });

            await user.save();

            // Log in after successful registration
            req.logIn(user, err => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        } catch (err) {
            console.error(err);
        }
    },

    logout: (req, res, next) => {
        req.logout(err => {
            if (err) return next(err);
            req.session.destroy(err => {
                if (err) {
                    console.log('Error destroying session: ', err);
                    return next(err);
                }
            });
            res.redirect('/');
        });
    },
};
