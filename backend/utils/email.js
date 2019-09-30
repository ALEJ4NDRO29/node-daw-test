var sgMail = require('@sendgrid/mail');
var secrets = require('../config/secret')
var logger = require('log4js').getLogger();

sgMail.setApiKey(secrets.SENDGRID_APIKEY);

exports.newSuggestion = function (req, res) {
    const enabled = false;

    const msg = {
        to: 'josealejandro.r.29@gmail.com',
        from: 'noreply@example.com',
        subject: 'New suggestion',
        text: 'New Suggestion',
        html: `<p>${req.body.name} --- ${req.body.name}</p> <p>${req.body.content}</p>`,
    };

    if(enabled) {
        sgMail.send(msg, function (error, info) {
            if (error) {
                logger.error('Error sending mail');
                res.status('500').json({
                    err: "No se ha podido enviar el correo"
                });
            } else {
                logger.info('Email sended');
                res.status('200').json({
                    success: true
                });
            }
        });
    } else {
        var message = 'Send Mail disabled on server';
        logger.warn(message);
        res.status(200).json({
            correct: true, 
            message: message
        })
    }
    
};