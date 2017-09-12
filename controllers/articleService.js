let	articleModel = require('../models/articleModel'),
	crypto = require('crypto'),
	util = require('../utils')
 	config = require("../config");
 	console.log()
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
			desc: params.desc,
			categories: params.categories,
			updataDate: util.curDate, //util.getDate()
			status:params.status
		}
		// 编辑 发布
		if(articleId){
			articleModel.query({articleId},function(err, result){
				let res = {};
				if(result.length>0){
					console.log(articleParams)
					articleModel.update({articleId}, articleParams, function(err, result){
						if(err){
							res = { status: 0, data: '更新失败！！！'};
							return;
						}
						res=  { status: 1, data: result };
						callback(res);
						
					});
					
					
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
					articleParams.creatDate = util.curDate
					
					// let md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列
		 		// 	let md4 = md5.update(articleParams.articleId.toString()).digest('hex');
		 		// 	console.log(md4)
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
		
		articleModel.getCount(whereParms, (err, result) =>{
			callback({ status: 1, data: {count: result} });	
		});
	}
	getArticleList(params, callback){
		let pageCtr = {
			pageSize: params.pageSize || 5,
			pageCur: params.pageCur,
//			key: params.tag ? {tag : params.tag} : {}
			key: params.status ==1 ? {status : 1,isDraft:0} : {}
		}
		if(params.tag) pageCtr.key.tag = params.tag
		if(params.classify) pageCtr.key.classify = params.classify
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
		//当个与批量删除 单个需要传id数组
		let delParams = {
			articleId: {$in:params.id}
		}
		articleModel.delete(delParams, (err, result)=>{
			if(err){
				callback({ status: 0,  data: '删除失败' });
				return
			}
			callback({ status: 1, data: result.result });
		})	
	}
	
	searchArticle(params, callback){
		let Params = {
			key:{}
		}
//		Params.key = Object.assign(Params.key,params)
		if(params.categories){
			Params.key.categories = params.categories.toUpperCase()
		}
		if(params.keyword){
			Params.key['$or'] = [{"title": new RegExp(params.keyword, 'i')}]
		}
		if(params.status){
			Params.key.status = 1 
			Params.key.isDraft = 0 
		}
		 console.log(Params.key)
		
		let Promis = new Promise((resolve, reject) =>{
			articleModel.query(Params.key, function(err, result){
				if(err){
					 reject(err) 
				}else{
					resolve(result);
				}
			})
		})
		
		Params.pageSize = params.pageSize || 5
		Params.pageCur = params.pageCur ||1
		Params.pageStart = Params.pageSize * (Params.pageCur - 1);
		
		Promis.then((val)=>{
			let pageParams = {
				pageSize: Params.pageSize,
				pageCur:  Params.pageCur ,
				pageCunt:  val.length
			}
			articleModel.pageQuery(Params, (err, result)=>{
				callback({ status: 1, pageParams, data:  result });	
			});
		});
		
	}
}
exports.service = article;