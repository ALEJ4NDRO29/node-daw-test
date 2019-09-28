var sgMail = require('@sendgrid/mail');

var secrets = require('../config/secret')

sgMail.setApiKey(secrets.SENDGRID_APIKEY);

exports.newSuggestion = function (req, res) {
    const msg = {
        to: 'josealejandro.r.29@gmail.com',
        from: 'noreply@example.com',
        subject: 'New suggestion',
        text: 'New Suggestion',
        html: `<p>${req.body.name} --- ${req.body.name}</p> <p>${req.body.content}</p>`,
    };

    sgMail.send(msg, function (error, info) {
        if (error) {
            res.status('500').json({
                err: "No se ha podido enviar el correo"
            });
        } else {
            res.status('200').json({
                success: true
            });
        }
    });
};
