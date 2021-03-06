const express = require('express'),
	router = express.Router(),
 	crypto = require('crypto'),
 	jwt = require("jsonwebtoken"),
 	Services = require('../../controllers'),
 	config = require("../../config");

router.post('/:className/:method', (req, res) => {
	PostAndGet(req, res); 
});
router.options('/:className/:method', (req, res) => {
	PostAndGet(req, res);
});
router.get('/:className/:method', (req, res) => {
	PostAndGet(req, res);
});

function PostAndGet(req, res){
	//className
	var className = req.params.className || 'empty';
	//methodName
	let method = req.params.method || 'empty';
	// request params
	let params = JSON.stringify(req.body) === '{}' ? req.query : req.body;
	params.ip = req.ip;
	
	let token = req.headers.authorization;
	if(!(className == 'user'&& (method == 'login' || method == 'register'))){
		if(token){
			jwt.verify(token, config.secret, function(err, decoded) {
				console.log(decoded)
			    if (err) {
			        res.status(200).json({  status: 2, data: 'token信息错误.' });
			    } else {
			        if(decoded.exp < Date.now()){
			        	res.status(200).json({  status: 2, data: 'token 已经过期' });
			        }else{
			        	GetServiceMethod()
			        }
			    }
		    });
		}else{
			res.status(200).json({  status: 2, data: '没有传入token信息.' });
			return false
		}
		
	}else{
		GetServiceMethod()
	}
	
	//new Promise((resolve, reject) =>{});
	//  get Class
	function GetServiceMethod(){
	
		if(!Services[`${className}Service`]){
			res.status(404).render('404', { title: '404' });
			return  
		}
		var serviceObj = new Services[`${className}Service`]();
		
		if( serviceObj[method]){
			serviceObj[method](params, result =>{
				res.json(result);
				return   
			},req);
		}else{
			res.status(404).render('404', { title: '404' });
		}
		
	}
}



module.exports = router;