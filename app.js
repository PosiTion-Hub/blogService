const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session'); 

const index = require('./routes/pages');
const Article = require('./routes/pages/Article');
const detail = require('./routes/pages/detail');
const search = require('./routes/pages/search');
const classIfyAndTags = require('./routes/pages/classIfyAndTags');
const Record = require('./routes/pages/Record');
const Resource = require('./routes/pages/Recource');
const Collection = require('./routes/pages/Collection');
const About = require('./routes/pages/About');

// yemian
//const index = require('./routes/pages/index');
//const login = require('./routes/login'); 
//const logout = require('./routes/logout');
//const register = require('./routes/register');
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

//页面路由
app.use('/detail', detail);
app.use('/search', search);
app.use('/classify', classIfyAndTags);
app.use('/tags', classIfyAndTags);
app.use('/Article', Article);
app.use('/Record', Record);
app.use('/Resource', Resource);
app.use('/Collection', Collection);
app.use('/About', About);
app.use('/', index);



//app.use('/', pages);
//app.use('/logins', login);
//app.use('/logout',           logout);
//app.use('/register', register);



//api 路由
app.use('/api', api);

//app.all('/api/*', requireAuthentication);

//app.get('/*', (req, res, next) => {
//	res.render('404');
//});	


// 404
app.use((req, res, next) => {
	
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).render('404', { title: '404' });
  console.log(err)
  next(err);
});


// error 错误处理函数
//app.use((err, req, res, next) => {
//	
//	console.log(err )
//res.locals.message = err.message;
//res.locals.error = req.app.get('env') === 'development' ? err : {};
//res.status(err.status || 500);
//res.render('error');
//});


var server = app.listen(8888,()=>{
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", 'localhost', port)
})








module.exports = app;