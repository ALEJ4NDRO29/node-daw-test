var logger = require('log4js').getLogger();
var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var MyUser = mongoose.model('MyUser');
var auth = require('../auth');

// PROFILE
router.get('/upgradeablefields', auth.required, function (req, res) {
    MyUser.findById(req.payload.id).then(function (user) {
        res.send(user.getUpgradeableFields());
    });
});

// PROFILE
router.get('/noupgradeablefields', auth.required, function (req, res) {
    MyUser.findById(req.payload.id).then(function (user) {
        res.send(user.getNoUpgradeableFields());
    });
});

router.get('/', auth.required, function (req, res) {
    MyUser.findById(req.payload.id).then(function (user) {
        res.send(user.toAuthJSON());
    }).catch(function () {
        res.status(401).send();
    });
    
});

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

    passport.authenticate('local', { session: false }, function (err, user, info) {

        if (err) { return next(err); }

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

router.put('/upgrade', auth.required, function (req, res) {
    // logger.debug(req.body);
    (async function () {
        try {
        var user = await MyUser.findById(req.payload.id);
        if(!user) {
            logger.error(`error upgrading user ${req.payload.id}`)
            res.status(500).send();
            return;
        }

        user.bio = req.body.bio;
        await user.save();
        res.send()
    } catch (error) {
        logger.error(errro);
        res.status(500).send(error);
    }
    })();
    // MyUser.findById(req.payload.id).then(function (user) {
    //     if(!user) {
    //         logger.error(`error upgrading user ${req.payload.id}`)
    //         res.status(500).send();
    //         return;
    //     }

    //     user.bio = req.body.bio;

    //     user.save().then(function () {
    //         res.send();
    //     });
    // }).catch(function () {
    //     res.status(500).send();
    // });
})

router.post('/sociallogin', function (req, res) { // TODO
    let memorystore = req.sessionStore;
    let sessions = memorystore.sessions;
    let sessionUser;
    for(var key in sessions){
      sessionUser = (JSON.parse(sessions[key]).passport.user);
    }

    // logger.debug('sessionUser');
    // logger.debug(sessionUser);

    MyUser.findOne({'_id' : sessionUser}, function (err, user) {
        // logger.debug(user);
        if(user) {
            res.send(user.toAuthJSON());
        } else {
            logger.error(`Social login, error getting user ${sessionUser}`)
            res.status(500).send();
        }
    })
});


router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
    successRedirect: 'http://localhost:8080/#!/login/sociallogin',
    failureRedirect: 'http://localhost:8080/#!/login' 
}));

module.exports = router;