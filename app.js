const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session'); 

const pages = require('./routes/pages');

// yemian
const index = require('./routes/index');
const login = require('./routes/login'); 
const logout = require('./routes/logout');
const register = require('./routes/register');
//api
const api = require('./routes/api');
const conf = require('./config');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

//这里传入了一个密钥加session id
app.use(cookieParser(conf.secret));
//使用靠就这个中间件
app.use(session({ secret: conf.secret ,resave: true,  
  saveUninitialized: true,  }));




// app.all('*', function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", '*');
  // res.header('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
  // res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, " +
  //     "Last-Modified, Cache-Control, Expires, Content-Type, Content-Language, Cache-Control, X-E4M-With,X_FILENAME");
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By",' 3.2.1')
  // res.header("Content-Type", "application/json;charset=utf-8");
  // next();
// });


app.use('/', pages);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/api', api);


var server = app.listen(8888,()=>{
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", 'localhost', port)
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
