const express = require('express');
const router = express.Router();
let	articleModel = require('../../models/articleModel')

//	getArticleList(params, callback){
//		
//	}
//	
	


/* GET home page. */
router.get('/', (req, res, next) => {
	let params = req.query;
	console.log(params)
	let list = new Promise((resolve, reject) =>{
		
	let pageCtr = {
			pageSize:  5,
			pageCur:  params.pageCur,
//			key: params.tag ? {tag : params.tag} : {}
			key: params.status ==1 ? {status : 1,isDraft:0} : {}
		}
		if(params.tag) pageCtr.key['$or'] = [{"tag": new RegExp( params.tag, 'i')}] //pageCtr.key.tag = params.tag
		if(params.classify) pageCtr.key.categories = params.classify
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
				res.locals.artList = result;
				res.locals.page =pageParams;
				res.render('test', { title: '首页'});
			});
		})
			
			
		
		
	})
		
})
router.get('/*', (req, res, next) => {
	next();
// res.render('404', { title: 'Express'});
});


module.exports = router;
