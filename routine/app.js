var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dloadRouter = require('./routes/dload');
var textRouter = require('./routes/text')
var wxbRouter = require('./wxbrouter/wxb')
var socketio = require('./wxbrouter/socketio')
// var wssbRouter = require('./wxbrouter/wssoc')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**自定义跨域中间件，（注意执行顺序，该中间件必须在定义路由前）*/
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  // res.header("Content-Type", "application/json;charset=utf-8");
  res.header('Access-Control-Allow-Credentials','true');
  next();
})

app.use('/', indexRouter);
app.use('/wxb', wxbRouter);
app.use('/users', usersRouter);
app.use('/dload', dloadRouter);
app.use('/text',textRouter)
app.use('/socket',socketio)
// app.use('/wssoc',wssbRouter)

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
