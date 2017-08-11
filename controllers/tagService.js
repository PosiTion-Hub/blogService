let	tagModel = require('../models/tagModel'),
	crypto = require('crypto'),
	util = require('../utils')
 	config = require("../config");
class tag {
	constructor(){
	}
	
	add(params, callback){
		let tagName = params.tagName.toUpperCase();
		let Promis = new Promise((resolve, reject) =>{
			
			tagModel.query({tagName}, (err, result) =>{
				
				if(result.length>0){
					reject('标签名已存在！！');
				}else{
					resolve(result);
				}
			});
		})
		Promis.then(function(){
			let params = {
				tagName,
				tagId: Date.now() 
			}
			tagModel.insert(params,(err, result) => {
				callback({ status: 1, data:  result });	
			})
			
		}).catch(function(err){
			callback({ status: 0, data:  err });	
		})
	}
	
	getTag(params, callback){
		tagModel.query( (err, result) =>{
				
			if(result.length>0){
				callback({ status: 1, data:  result });
			}else{
				callback({ status: 0, data:  result });
			}
		});
		
	}
	
	removeById(){
		
		
		
	}
	
}
exports.service = tag;