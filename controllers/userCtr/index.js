let	user = require('../../models/userModel'),
 	crypto = require('crypto')
module.exports = {
	register: function(params, res){
		// 	生成口令的散列值
	  	let md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列
	 	params.userpwd = md5.update(params.userpwd).digest('hex');
		user.query({username: params.username}, function(err, result){
			
			if(result.length>0){
				res.locals.error = '用户名已存在！！！';
				res.render('register', { title: '注册' });
				return;
			}else{
				user.insert({ username: params.username, userpwd: params.userpwd }, function(err, result){
					console.log(result)
					if(result){
						res.redirect('/login');
					}else{
						res.locals.error = '注册失败！！！';
					}
				});
			}
		});
	},
	login: function(params, res, req){
		// 	生成口令的散列值
	  	let md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列
	 	params.userpwd = md5.update(params.userpwd).digest('hex');
		user.query({ username: params.username, userpwd: params.userpwd }, function(err, result){
			// console.log(result);
			if(result.length>0){

				return res.status(200).json({ success: true, message: '登录成功！.' ,ip:req.ip});
				// res.locals.error = '登录成功';
				// res.locals.username = result[0].username;
		  //       req.session.username = res.locals.username;
		  //       res.cookie('islogin', result[0].username, { maxAge: 30000 }); 
		  //       res.redirect('/');
			}else{
				return res.status(200).json({ success: false, message: '用户名或密码错误' ,ip:req.ip});
				// res.locals.error = '账号或密码错误！！！';
				// res.render('login',{title:'登录'});
			}
		});

	}
}