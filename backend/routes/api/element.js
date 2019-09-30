var router = require('express').Router();
var logger = require('log4js').getLogger();

var Element = require('mongoose').model('Element');


router.get('/get', function (req, res) {
    logger.info('get elements')
    res.send('ok');
})

module.exports = router;