let	classifyModel = require('../models/classifyModel'),
	crypto = require('crypto'),
	util = require('../utils')
 	config = require("../config");
class classify {
	constructor(){
	}
	
	add(params, callback){
		let classIfyName = params.classifyName.toUpperCase();
		let Promis = new Promise((resolve, reject) =>{
			
			classifyModel.query({classIfyName}, (err, result) =>{
				
				if(result.length>0){
					reject('分类名已存在！！');
				}else{
					resolve(result);
				}
			});
		})
		Promis.then(()=>{
			let params = {
				classIfyName,
				classIfyId: Date.now() 
			}
			classifyModel.insert(params,(err, result) => {
				callback({ status: 1, data:  result });	
			})
			
		}).catch(function(err){
			callback({ status: 0, data:  err });	
		})
	}
	
	get (params, callback){
		classifyModel.query( (err, result) =>{
			if(result.length>0){
				callback({ status: 1, data:  result });
			}else{
				callback({ status: 0, data:  result });
			}
		});
		
	}
	
	removeById(params, callback){
		let delParams = {
			classIfyId : params.id
		}
		let Promis = new Promise((resolve, reject) =>{
			classifyModel.query(delParams, (err, result)=>{
				if(result.length==0){
					reject(err);
					// callback({ status: 0, data: "数据不存在！！！" });
					return
				}
				resolve(result)

			})
		})

		Promis.then(function(val){
			classifyModel.delete(delParams, (err, result)=>{
				if(err){
					callback({ status: 0,  data: '删除失败' });
					return
				}
				callback({ status: 1, data: result.result });
			})	
		}).catch(function(){
			callback({ status: 0, data: "数据不存在！！！" });
		})
		
		
	}
	
}
exports.service = classify;