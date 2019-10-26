var constants = require('./config/constants');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')
var log4js = require('log4js');
var middleware = require('./auth/middleware');

var mongoose = require('mongoose');

// MODELS
require('./models/Element');
require('./models/MyUser');

var routes = require('./routes');

mongoose.connect(constants.MONGO);
mongoose.set('debug', true);

log4js.configure({
	appenders: { 'app': { type: 'file', filename: 'logs/app.log' }, 'console': { type: 'console' } },
	categories: { default: { appenders: ['app', 'console'], level: 'debug' } }
});

const logger = log4js.getLogger();

var app = express();
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Allow', '*');
    next();
});

// TODO (swagger-generator-express)
// const expressSwagger = require('express-swagger-generator')(app);
// var swaggerDef = require('./config/swagger-def');

// app.use('/doc', expressSwagger(swaggerDef));

app.use(require('morgan')('dev'));
app.use(cookieParser());

app.use(middleware.getLoggedUser);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send(err.message);
});

var server = app.listen(constants.PORT, function () {
	logger.debug(`Server listening on port ${constants.PORT}`)
});