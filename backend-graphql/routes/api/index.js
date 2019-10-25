var router = require('express').Router();
router.use('/graphql', require('./graphql'));

router.get('/', function(req, res) {
	res.send('hello :)');
});

module.exports = router;