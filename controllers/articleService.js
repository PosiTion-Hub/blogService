let	articleModel = require('../models/articleModel'),
	crypto = require('crypto'),
	util = require('../utils')
 	config = require("../config");
class article {
	constructor(){
	}
	edit (params, callback) {
		let articleParams = {
			articleId: params.id
		}
		articleModel.query(articleParams,function(err, result){
			console.log(err, result);
			let res=  { status: 1, data: result[0] };
			callback(res);
		})	

	}
	publish (params,callback){
		let articleId = params.id
		let articleParams = {
			title: params.title,
			tag: params.tag,
			content: params.content,
			categories: params.categories,
			updataDate: Date.now(), //util.getDate()
			status:params.status
		}
		// 编辑 发布
		if(articleId){
			articleModel.query({articleId},function(err, result){
				let res = {};
				if(result.length>0){
					articleModel.update({articleId}, articleParams, function(err, result){
						if(err){
							res = { status: 0, data: '更新失败！！！'};
							return;
						}
						res=  { status: 1, data: result };
						callback(res);
						
					});
					console.log(res)
					
					
				}else{
					res = { status: 0, data: '文章不存在！！！'};
					callback(res);
				}
				// callback(res);
			});

		}else{
			//新增 发布
			if( !articleParams.title || !articleParams.content || !articleParams.tag || !articleParams.categories){
				callback({ status: 2, data: '参数错误'});
				return;
			}

			articleModel.query({title:articleParams.title}, (err, result)=>{
				console.log(err, result);
				let res = {};
				if(result.length>0){
					res = { status: 0, data: '文章已存在！！！'};
					callback(res);
				}else{
					articleParams.articleId = Date.now() //util.getDate();
					// let md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列
		 		// 	let md4 = md5.update(articleParams.articleId.toString()).digest('hex');
		 		// 	console.log(md4)
		 			console.log(articleParams)
		 			articleParams = Object.assign(articleParams,params);
					articleModel.insert(articleParams, (err, result)=>{
						if(err){
							res = { status: 0, data: '发布失败！！！'};
							return;
						}
						res= { status: 1, data: result };
						callback(res);
					});
				}
			});
		}
		
	}
	getTagCount (params, callback){
		let whereParms = params.tag ?  {tag: params.tag} : {};
		console.log(whereParms,1122);
		articleModel.getCount(whereParms, (err, result) =>{
			callback({ status: 1, data: {count: result} });	
		});
	}
	getArticleList(params, callback){
		let pageCtr = {
			pageSize: params.pageSize || 5,
			pageCur: params.pageCur,
			key: params.tag ? {tag : params.tag} : {}
		}
		pageCtr.pageStart = pageCtr.pageSize * (pageCtr.pageCur - 1);
		let Promis = new Promise((resolve, reject) =>{
			articleModel.getCount(pageCtr.key, (err, result) =>{
				if(err){
					reject(err);
				}else{
					resolve(result);
				}
			});
		})
		Promis.then((val)=>{
			let pageParams = {
				pageSize: pageCtr.pageSize,
				pageCur:  pageCtr.pageCur,
				pageCunt:  val
			}
			articleModel.pageQuery(pageCtr, (err, result)=>{
				callback({ status: 1, pageParams, data:  result });	
			});
		});
	}
	delArticleById (params, callback){
		let delParams = {
			articleId : params.id
		}
		let Promis = new Promise((resolve, reject) =>{
			articleModel.query(delParams, (err, result)=>{
				if(result.length==0){
					reject(err);
					// callback({ status: 0, data: "数据不存在！！！" });
					return
				}
				resolve(result)

			})
		})

		Promis.then(function(val){
			articleModel.delete(delParams, (err, result)=>{
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
	
	delArticle (params, callback){
		
		console.log(params)
		let delParams = {
			articleId: {$in:params.articleId}
		}
		articleModel.delete(delParams, (err, result)=>{
			if(err){
				callback({ status: 0,  data: '删除失败' });
				return
			}
			callback({ status: 1, data: result.result });
		})	
	}
}
exports.service = article;