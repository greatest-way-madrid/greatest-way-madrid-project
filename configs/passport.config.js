const User = require('../models/user.model');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');

passport.serializeUser((user, next) => {
  next(null, user._id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => {
      next(null, user);
    })
    .catch(error => next(error));
});

passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.GOOGLE_AUTH_CLIENT_ID || 'todo',
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET || 'todo',
  callbackURL: process.env.GOOGLE_AUTH_CB || '/user/google/cb',
}, authenticateOAuthUser));

function authenticateOAuthUser(accessToken, refreshToken, profile, next) {
  let socialId = `${profile.provider}Id`;
  User.findOne({ [`social.${socialId}`]: profile.id})
    .then(user => {
      if (user) {
        next(null, user);
      } else {
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          social: {
            [socialId]: profile.id
          }
        })
        return user.save()
          .then(user => {
            next(null, user);
          });
      }
    })
    .catch(error => next(error));
}