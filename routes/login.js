const express = require('express'),
	router = express.Router(),
   	crypto = require('crypto'),
	//session = require('express-session'),
   	userCtr = require('../controllers/userCtr')

/* GET  page. */
router.get('/', (req, res) => {
	res.render('login', { title: '登录' });
});

/* Post  page. */
router.post('/', (req, res) => {
	let userName = req.param('userName'),
	  	userPwd = req.param('PassWord');
	if(!userName || userName === '' || !userPwd || userPwd === ''){
		res.locals.error = "用户名或密码不能为空@！"
	}else if(userName !== 'admin' || userPwd !== 'admin'){
		res.locals.error = "用户名或密码错误@！";
	}else{
		res.locals.success = "登录成功5s后跳转首页......";
		
	}
	res.render('login', { title: '登录' });
	
});
module.exports = router;