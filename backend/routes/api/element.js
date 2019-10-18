var router = require('express').Router();
var logger = require('log4js').getLogger();
var faker = require('faker/locale/es');
var mongoose = require('mongoose')
var MyUser = mongoose.model('MyUser');
var auth = require('../auth');

var Element = mongoose.model('Element');

router.param('slug', function name(req, res, next, slug) {

    logger.debug('slug param ' + slug)

    Element.findOne({ slug: slug }).then(function (element) {
        if (!element) {
            res.sendStatus(400);
            return;
        }

        req.element = element;
        return next()
    }).catch(next);

})

router.get('/get', function (req, res) {

    Element.find({}, function (err, elements) {
        res.send(elements);
    });

});

router.get('/get/:slug', function (req, res) {
    let slug = req.params.slug;
    Element.find({ 'slug': slug }, function (err, element) {
        if (element.length == 0) {
            res.sendStatus(404);
            logger.debug(`Element ${slug} not found`);
            return;
        }
        res.send(element);
        logger.debug(`Get element ${slug}`);
    });
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

router.post('/like/:slug', auth.required, function (req, res) {
    var element = req.element;

    logger.debug('like')

    MyUser.findById(req.payload.id).then(function (user) {
        if(!user) { 
            res.sendStatus(401);
            return;
        }

        user.like(element).then(function () {
            res.send(element.toJSONFor());
        });
    }).catch(function (err) {
        logger.fatal(err);
        res.status(500).send(err.message);
    })
});

router.delete('/like/:slug', auth.required, function (req, res) {
    var element = req.element;
    
    logger.debug('unlike');

    MyUser.findById(req.payload.id).then(function (user) {
        if(!user) { 
            res.sendStatus(401);
            return;
        }
        user.unlike(element).then(function () {
            res.send(element.toJSONFor());
        });
    }).catch(function (err) {
        logger.fatal(err);
        res.status(500).send(err.message);
    })
});

router.delete('/like/:slug', auth.required, function (req, res) {
    res.send();
});

module.exports = router;