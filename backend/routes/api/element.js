var router = require('express').Router();
var logger = require('log4js').getLogger();
var faker = require('faker/locale/es');

var Element = require('mongoose').model('Element');

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


// router.get('/fake/:qty', function (req, res) {
//     let qty = req.params.qty;
//     let txt = "";
//     for (let i = 0; i < qty; i++) {
//         txt += faker.fake("{{name.firstName}} {{name.lastName}}\n");
//     }

//     res.send(txt)
//     logger.debug(txt);
// });

module.exports = router;