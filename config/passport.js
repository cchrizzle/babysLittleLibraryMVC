const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email: email });

                if (!user) {
                    return done(null, false, { msg: 'User not found' });
                }

                // comparePassword method from User model
                const isMatch = await user.comparePassword(password);

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { msg: 'Invalid credentials' });
                }
            } catch (err) {
                return done(err);
            }
        }
    )
);

// Serialize & deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
