const passport = require('passport');

module.exports.createWithIDPCallback = (req, res, next) => {
  passport.authenticate(`${req.params.provider}-auth`, (error, user) => {
    if (error) {
      next(error);
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.redirect('/user/profile')
        }
      });
    }
  })(req, res, next);
}

module.exports.profile = (req, res, next) => {
  console.log(req.user);
  res.render('user/profile');
}
