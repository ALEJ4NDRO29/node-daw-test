var http = require('http')
var path = require('path')
var methods = require('methods')
var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')
var cors = require('cors')
var passport = require('passport')
var errorhandler = require('errorhandler')
var mongoose = require('mongoose')
var swaggerUi = require('swagger-ui-express')
var log4js = require('log4js');

// MODELS
require('./models/User');
require('./models/MyUser');
require('./models/Article');
require('./models/Comment');
require('./models/Element');

require('./config/passport');

var constants = require('./config/constants')

log4js.configure({
  appenders: { 'app': { type: 'file', filename: 'logs/app.log' } , 'console':{type:'console'}},
  categories: { default: { appenders: ['app', 'console'], level: 'debug' } }
});

const logger = log4js.getLogger();

//// Swagger ////
var swaggerDocument = require('./swagger.json');
swaggerDocument.host="localhost:3001"

var isProduction = process.env.NODE_ENV === 'production';

// Create global app object
var app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

if(isProduction){
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/conduit_nodejs');
  mongoose.set('debug', true);
}

app.use(require('./routes'));
//// Swagger ////
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...
var server = app.listen(constants.PORT, function(){
  logger.info('Listening on port ' + constants.PORT);
  // console.log('Listening on port ' + constants.PORT);
});
