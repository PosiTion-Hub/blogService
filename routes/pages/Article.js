const express = require('express');
const router = express.Router();
let art =  require('../../controllers/articleService').service;
let classify =  require('../../controllers/classifyService').service;
let tag =  require('../../controllers/tagService').service;
let getDate =  require('../../utils').d;

art = new art();
classify = new classify()
tag = new tag()
/* GET home page. */
router.get('/', (req, res, next) => {
	
	let list = new Promise((resolve, reject) =>{
		
		art.getArticleList({pageSize:10,status:1}, function(e){
			resolve(e);
//			res.locals.artList = e.data;
//			res.locals.page = e.pageParams
//	  		res.render('index', { title: '首页'});
		})
		
		
	})
		
	let cify = new Promise((resolve, reject) =>{
		
		classify.get({},function(e){
			resolve(e);
//	 	 	res.locals.artList = data.data;
//			res.locals.page = data.pageParams;
//			res.locals.classify = e.data;
//	  		resolve(data);
		 })
		
		
	})
		
	let tagAll = new Promise((resolve, reject) =>{
		
		tag.get({}, function(e){
			resolve(e);
//			res.locals.artList = e.data;
//			res.locals.page = e.pageParams
//	  		res.render('index', { title: '首页'});
		})
		
		
	})
	
	Promise.all([list, cify, tagAll]).then(values => { 
	  	res.locals.artList = values[0].data;
		res.locals.page = values[0].pageParams;
		res.locals.classify = values[1].data;
		res.locals.tags = values[2].data;
		res.render('Article', { title: '首页'});
	  
	  
	});
	
	/*.then(function(data){
	 	 classify.get({},function(e){
	 	 	res.locals.artList = data.data;
			res.locals.page = data.pageParams;
			res.locals.classify = e.data;
//	  		resolve(data);
		 })
	 }).then(function(data){
	 	console.log(data)
		res.render('index', { title: '首页'});
	 	
	 });*/
  	/*
  	 <!--<div>
									<% for(var j=0; j<classify.length; j++) {%>
										<span class="classify-item">classify[j].classifyName</span>
										<% } %>
									
								</div>-->
  	 * */
});




//router.get('/:name', (req, res, next) => {
//	let Path = req.path.substr(1);
//	
//
//
//	
//	res.render( Path, { title: 'Express'});
//});
router.get('/*', (req, res, next) => {
	next();
// res.render('404', { title: 'Express'});
});


module.exports = router;
