/* globals module */

const passport = require('passport');

let config = {};
if (process.env.ENV_MODE === 'PRODUCTION') {
    config.GOOGLECREDENTIALS_PROFILE_LOGIN = process.env.GOOGLECREDENTIALS_PROFILE_LOGIN;
    config.GOOGLECREDENTIALS_PROFILE_EMAIL = process.env.GOOGLECREDENTIALS_PROFILE_EMAIL;
} else {
    const googleCredentials = require('./config/configurationStrings').googleCredentials;
    config.GOOGLECREDENTIALS_PROFILE_LOGIN = googleCredentials.profile[0];
    config.GOOGLECREDENTIALS_PROFILE_EMAIL = googleCredentials.profile[1];
}

const profile = [
    config.GOOGLECREDENTIALS_PROFILE_LOGIN,
    config.GOOGLECREDENTIALS_PROFILE_EMAIL
];

module.exports = function (data, createHash, validator) {
    return {
        signUp(req, res) {
            let newUser = {};
            let propoerties = ['username', 'firstName', 'lastName', 'email', 'picture', 'phoneNumber', 'experience', 'city', 'street'];
            propoerties.forEach(property => {
                if (!property || property.length < 0) {
                    res.status(411).json(`Missing ${property}`);
                }
                newUser[property] = req.body[property];
            });

            if (!validator.validatePassword(req.body.password)) {
                console.log({ error: 'Password doesn\'t match requirements!' });
                res.redirect('/auth/sign-up');
                return;
            }
            newUser.password = createHash(req.body.password);

            data.createUser(newUser)
                .then(
                () => {
                    res.redirect('/auth/sign-in');
                })
                .catch(error => {
                    console.log(error);
                    res.redirect('/auth/sign-up');
                });
        },
        signOut(req, res) {
            req.logout();
            return res.redirect('/home');
        },
        getSignUpForm(req, res) {
            return res.render('authentication/sign-up', {
                result: { user: req.user }
            });
        },
        getSignInForm(req, res) {
            return res.render('authentication/sign-in', {
                result: { user: req.user }
            });
        },
        getSgnInGoogle(req, res, next) {
            const auth = passport.authenticate('google', { scope: profile }, (error, user) => {
                if (error) {
                    next(error);
                    return;
                }

                if (!user) {
                    res.redirect('/auth/sign-in');
                }

                req.login(user, error1 => {
                    if (error1) {
                        next(error1);
                        return;
                    }

                    res.redirect('/profile');
                });
            });
            auth(req, res, next);
        }
    };
};