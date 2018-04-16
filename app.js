var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash= require('connect-flash');
var winston= require('./config/winston');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// rutas para partials
var hbs=require('hbs');
hbs.registerPartials(`${__dirname}/views/partials`);
// Actualize la pag automaticamente sin apagar el server
var hbsUtils=require('hbs-utils')(hbs);
hbsUtils.registerWatchedPartials(`${__dirname}/views/partials`);

// Cookie
app.use(session({
    secret:'clave',
    name:'sesión',
    resave:true,
    saveUninitialized:true
    }));

app.use(flash());

//app.use(logger('dev'));
//app.use(logger('combined',{stream:winston.stream}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// rutas estaticas public y node_modules
app.use(express.static(path.join(__dirname, 'public')));
app.use('/components',express.static(`${__dirname}/public/components`));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

// error page
  res.status(err.status || 500);
  res.render('error404',{
        title:'error',
        layout:'layout'
      });
});

module.exports = app;
