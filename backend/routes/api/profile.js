var router = require('express').Router();
var mongoose = require('mongoose');
var MyUser = mongoose.model('MyUser');
var auth = require('../auth');

router.get('/get/:username', function (req, res) {
    var username = req.params.username;
    MyUser.findOne({username : username}).then((user) => {
        if(user) {
            res.send(user.toPublicProfileJSON());
        } else {
            res.sendStatus(404);
        }
    })
})

module.exports = router;