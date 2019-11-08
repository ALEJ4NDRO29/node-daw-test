var router = require('express').Router();
var mongoose = require('mongoose');
var MyUser = mongoose.model('MyUser');

// Perfil público de un usuario

router.get('/get/:username', function (req, res) {
    var username = req.params.username;
    MyUser.findOne({username : username}).then((user) => {
        if(user) {
            res.send(user.toPublicProfileJSON());
        } else {
            res.sendStatus(404);
        }
    });
});

module.exports = router;