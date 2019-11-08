var router = require('express').Router();
var logger = require('log4js').getLogger();
var email = require('../../utils/email');
var PrismaUtils = require('../../utils/prisma');

// Nueva sugerencia
router.use('/new', async function (req, res) {
    try {
        if (req.method != 'POST') {
            logger.warn('New suggestion - Method not allowed')
            res.status(405).json({
                error: true,
                message: 'Method not allowed'
            })
            return;
        }

        var mutation = `mutation {createSuggestion(name : "${req.body.name}" email: "${req.body.email}" content: "${req.body.content}")}`

        // Enviar a prisma
        PrismaUtils.mutation(mutation);

        // Enviar email
        email.newSuggestion(req, res);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: true,
            message: err
        })
    }
});

module.exports = router;