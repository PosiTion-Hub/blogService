const express = require('express'),
	router = express.Router(),
   	crypto = require('crypto'),
	session = require('express-session'),
   	userCtr = require('../controllers/userCtr')

	console.log( '...........')
/* GET  page. */
/*router.get('/', (req, res) => {
	
	console.log( req.path)
	
	if(req.cookies.islogin){
		res.redirect('/');
	}
	//res.render('login', { title: '登录' });
});*/

/* GET  page. */
//router.post('/', (req, res) => {
//	let userName = req.param('userName'),
//	  	userPwd = req.param('PassWord');
//	userCtr.login({username:userName,userpwd:userPwd}, res, req);
//});
module.exports = router;