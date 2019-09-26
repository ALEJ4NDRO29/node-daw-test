var router = require('express').Router();

router.use('/api/:text', function (req, res) {
   var text = req.params.text;
   res.send(text);
});

router.use('/404', function (req, res) {
    console.log('/404');
    res.sendStatus(404);
});

router.use('/status/:code', function (req, res) {
    var code = req.params.code;
    console.log(code);

    res.status(code);
    res.send(`Code ${code}`);
});

module.exports = router;