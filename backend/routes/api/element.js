var router = require('express').Router();
var logger = require('log4js').getLogger();
var faker = require('faker/locale/es');
var mongoose = require('mongoose')
var MyUser = mongoose.model('MyUser');
var auth = require('../auth');

var Element = mongoose.model('Element');

router.param('slug', function name(req, res, next, slug) {

    Element.findOne({ slug: slug }).then(function (element) {
        if (!element) {
            res.sendStatus(400);
            return;
        }

        req.element = element;
        return next()
    }).catch(next);

})

router.get('/get', auth.optional, async function (req, res) {
    try {
        var payload = req.payload;
        var user = null
        if (payload) {
            user = await MyUser.findById(payload.id);
        }

        var elements = await Element.find({});

        let result = {};
        Object.keys(elements).forEach(i => {
            result[i] = elements[i].toJSONFor(user);
        });

        res.send(result);
    } catch (error) {
        logger.error(error);
        res.status(500).send(error);
    }
});

router.get('/get/mylikes', auth.required, async function (req, res) {
    try {
        var user = await MyUser.findById(req.payload.id);
        var elements = await Element.find({ '_id': { $in: user.likes } })

        let result = {};
        Object.keys(elements).forEach(i => {
            result[i] = elements[i].toJSONFor(user);
        });

        logger.debug(user.getLikes());
        res.send(result);
    } catch (error) {
        logger.error(error);
        res.status(500).send(error);
    }
});

router.get('/get/:slug', auth.optional, async function (req, res) {
    var payload = req.payload;
    try {
        var user = null
        if (payload) {
            user = await MyUser.findById(payload.id);
        }
        res.send(req.element.toJSONFor(user));
    } catch (error) {
        logger.error(error);
        res.status(500).send(error);
    }
});

var fakerEnabled = false;
router.post('/fake/:qty', function (req, res) {
    if (!fakerEnabled) {
        res.status(404).send();
        return;
    }

    let qty = req.params.qty;
    let elementJson;
    let element;
    for (let i = 0; i < qty; i++) {

        elementJson = {
            type: faker.fake("{{lorem.word}}"),
            title: faker.fake("{{commerce.productName}}"),
            description: faker.fake("{{lorem.sentences}}"),
            rate: faker.fake("{{commerce.price}}"),
            tags: [
                faker.fake("{{lorem.word}}"),
                faker.fake("{{lorem.word}}"),
                faker.fake("{{lorem.word}}")
            ]
        }

        element = new Element(elementJson);
        element.save();

    }

    res.send('ok');
});

router.post('/like/:slug', auth.required, async function (req, res) {
    var element = req.element;
    try {
        var user = await MyUser.findById(req.payload.id);
        if (!user) {
            res.sendStatus(401);
            return;
        }

        await user.like(element);
        res.send(element.toJSONFor(user));
    } catch (error) {
        logger.error(error);
        res.status(500).send(err.message);
    }
});

router.delete('/like/:slug', auth.required, async function (req, res) {
    var element = req.element;
    try {
        var user = await MyUser.findById(req.payload.id);
        if (!user) {
            res.sendStatus(401);
            return;
        }
        await user.unlike(element);
        res.send(element.toJSONFor());
    } catch (error) {
        res.status(500).send(err.message);
    }
});

router.delete('/like/:slug', auth.required, function (req, res) {
    res.send();
});

module.exports = router;