var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var socketio=require("socket.io");
var indexRouter = require('./routes/index');
 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
const server = require('http').createServer(app);
const io = socketio(server,{
  cors:{
    origin:[]
  }
});
 
io.on('connection', function(socket) {
  console.log('A user connected');
  // we need to recive the data from the client 
  socket.on('input',(input)=>{
   io.emit('message',input)
  })


 socket.on("disconnect",()=>{
   console.log("use disconnected")
 })
 
});
 
 
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

module.exports = {app,server};
