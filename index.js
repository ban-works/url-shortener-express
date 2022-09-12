require('./models/connect');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var shortlinkRouter = require('./routes/shortlink');
var usersRouter = require('./routes/users');

var app = express();

// export the API to vercel

app.listen(3000);


// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/shortlink', shortlinkRouter);
app.use('/users', usersRouter);

// app.get("/", (req, res) => {
//   res.send(indexRouter);
// });
// app.get("/shortlink", (req, res) => {
//   res.send(shortlinkRouter);
// });
// app.get("/users", (req, res) => {
//   res.send(usersRouter);
// });
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
