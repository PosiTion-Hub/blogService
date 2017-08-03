const express = require('express'),
	router = express.Router(),
 	crypto = require('crypto'),
 	Services = require('../../controllers')
 	// userCtr = require('../../controllers/userCtr')

router.post('/:className/:method', (req, res) => {
	//console.log(req.Authorization)
	// console.log(req)
	PostAndGet(req, res);
});
router.options('/:className/:method', (req, res) => {
	//console.log(req)
	// console.log(req)
	PostAndGet(req, res);
});
router.get('/:className/:method', (req, res) => {
	PostAndGet(req, res);
});

function PostAndGet(req, res){
	// res.header("Content-Type", "application/json;charset=utf-8");
	
	//className
	var className = req.params.className || 'empty';
	//methodName
	let method = req.params.method || 'empty';
	// request params
	let params = JSON.stringify(req.body) === '{}' ? req.query : req.body;
	params.ip = req.ip;

	console.log(Services[`${className}Service`])
	//  get Class
	if(!Services[`${className}Service`]){
		res.status(404).render('404', { title: '404' });
		return  
	}
	var serviceObj = new Services[`${className}Service`]();
	if( serviceObj[method] ){
		serviceObj[method](params, result =>{
			res.json(result);
			return   
		});
	}else{
		res.status(404).render('404', { title: '404' });
	}
}


/*router.post('/sign', (req, res) => {
  	return res.status(200).json({ success: false, message: 'token信息错误.' ,ip:req.ip});
});


router.post('/login', (req, res) => {

	let userName = req.body['userName'],
	  	userPwd = req.body['PassWord'];
	userCtr.login({username:userName,userpwd:userPwd},res,req);
	// var get_client_ip = function(req) {
	//     var ip = req.headers['x-forwarded-for'] ||
	//         req.ip ||
	//         req.connection.remoteAddress ||
	//         req.socket.remoteAddress ||
	//         req.connection.socket.remoteAddress || '';
	//     if(ip.split(',').length>0){
	//         ip = ip.split(',')[0]
	//     }
	//     return ip;
	// };
	// console.log(get_client_ip(req));
  	// return res.status(200).json({ success: false, message: 'token信息错误.' ,ip:req.ip});
});
*/
module.exports = router;