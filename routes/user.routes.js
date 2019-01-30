const constants = require('../constants');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.get('/', function(req, res, next) { res.redirect('/')});
router.post('/google', passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email'] }));
router.get('/:provider/cb', sessionsController.createWithIDPCallback);



module.exports = router;
