var logger = require('log4js').getLogger();
var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var MyUser = mongoose.model('MyUser');
var auth = require('../auth');

router.post('/', function (req, res, next) {
    let userJson = req.body.user;

    let hasErrors;
    if (userJson.username == null || userJson.username == '') {
        hasErrors = true;
    }
    if (userJson.password == null || userJson.password == '') {
        hasErrors = true;
    }
    if (hasErrors) {
        res.status(500).send('Invalid params');
        return;
    }

    // MyUser.findOne({ nickname: userJson.nickname }).then(function (user) {
    //     console.log(user);

    //   }).catch(done);

    passport.authenticate('local', { session: false }, function (err, user, info) {
        // console.log(err);
        // console.log(user);
        // console.log(info);

        if (err) { return next(err); }

        console.log(user);

        if (user) {
            return res.json(user.toAuthJSON());
        } else {
            return res.status(500).send('Invalid user or password');
        }
    })(req, res, next);


});

router.post('/register', function (req, res) {

    logger.info('New user');
    let userJson = req.body;
    let hasErrors;
    if (userJson.username == null || userJson.username == '') {
        hasErrors = true;
    }
    if (userJson.email == null || userJson.email == '') {
        hasErrors = true;
    }
    if (userJson.password == null || userJson.password == '') {
        hasErrors = true;
    }

    if (hasErrors) {
        res.status(500).send('Invalid params');
        return;
    }

    let user = new MyUser(userJson);
    user.setPassword(userJson.password);
    user.save();
    res.send(user.toAuthJSON());

});

module.exports = router;