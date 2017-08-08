let	userModel = require('../models/userModel'),
 	crypto = require('crypto'),
 	jwt = require("jsonwebtoken"),
 	config = require("../config");
class user {
	constructor(){
	}
	login (params, callback) {
		if(!params.username || !params.userpwd){
			callback({ success: false, message: '参数错误！！！'});
			return;
		}
	  	let md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列
	 	params.userpwd = md5.update(params.userpwd).digest('hex');
		userModel.query({ username: params.username, userpwd: params.userpwd }, {username:1, _id:0},function(err, result){
			let res = {};
			if(result.length>0){
				 const token = jwt.sign({
					uid:result[0]._id,
					name:result[0].username,
					exp:Math.floor(Date.now()/1000) + 24 * 60 * 60//1 hours
			      }, config.secret);
				res=  { status: 1, data: result[0], token: token };
			}else{
				res = { status: 0, data: '用户名或密码错误'};
			}
			callback(res);
		});
	}
	register (params,callback){
		if(!params.username || !params.userpwd){
			callback({ success: false, message: '参数错误！！！'});
			return;
		}
	  	let md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列
	 	params.userpwd = md5.update(params.userpwd).digest('hex');
	 	var registerParams = {
	 		ip: params.ip || '0.0.0.0',
	 		registerDate: Date.now,
	 		username: params.username,
	 		userpwd: params.userpwd
	 	}

		userModel.query({username:registerParams.username},function(err, result){
			let res = {};
			if(result.length>0){
				res = { status: 0, data: '用户名已存在'};
			}else{
				userModel.insert(registerParams, function(err, result){
					if(result.length>0){
						res=  { status: 1, data: result };
					}else{
						res = { status: 0, data: '注册失败'};
					}
				});
			}
			callback(res);
		});
	}
}
exports.service = user;
