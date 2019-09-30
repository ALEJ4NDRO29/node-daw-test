var router = require('express').Router();
var logger = require('log4js').getLogger();
var email = require('../../utils/email');

router.use('/new', function (req, res) {
    if(req.method != 'POST') {
        logger.warn('New suggestion - Method not allowed')
        res.status(405).json({
            error: true,
            message: 'Method not allowed'
        })
        return;
    }
    
    email.newSuggestion(req, res);
});

module.exports = router;