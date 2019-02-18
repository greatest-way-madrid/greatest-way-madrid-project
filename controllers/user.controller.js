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
          res.redirect('/')
        }
      });
    }
  })(req, res, next);
}

module.exports.profile = (req, res, next) => {
  res.render('user/profile');
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
}
