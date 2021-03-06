var os = require('os');
var bodyParser = require('body-parser');
require('dotenv').config({path: __dirname + '/.env'});
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerJSDoc = require('swagger-jsdoc');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authenticatorRouter = require('./routes/authenticator');
var apiRouter = require('./routes/api');
var gatewayRouter = require('./routes/Gateway');
var coreBankingRouter = require('./routes/CoreBanking');
var productService = require('./routes/productService');


var app = express();
app.use(cors());
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
var hostname = process.env['BASE_URL'];
// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Ahab Reactor API',
    version: '2.0.0',
    description: 'Documentation for the Ahab Reactor',
  },
  host: hostname,
  // host: 'localhost:5250',
  // host: 'ahab-reactor.herokuapp.com',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
app.get('/swagger', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // support json encoded bodies
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authenticate', authenticatorRouter);
app.use('/api', apiRouter);
app.use('/gateway', gatewayRouter);
app.use('/corebanking', coreBankingRouter);
app.use('/product-service', productService);
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
  res.render('error');
});

module.exports = app;
