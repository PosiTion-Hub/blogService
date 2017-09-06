const express = require('express');
const router = express.Router();
let art =  require('../../controllers/articleService').service;
let getDate =  require('../../utils').d;

art = new art();

/* GET home page. */
router.get('/', (req, res, next) => {
	 art.getArticleList({pageSize:10,status:1}, function(e){
	 	
	 	console.log( e.data)
		res.locals.artList = e.data;
		res.locals.page = e.pageParams
  		res.render('index', { title: '首页'});
	})
  	
});




router.get('/:name', (req, res, next) => {
	let Path = req.path.substr(1);
	


	
  	res.render( Path, { title: 'Express'});
});
router.get('/:name/:bbb', (req, res, next) => {
	
	console.log(req.path);
	
  	// res.render('index', { title: 'Express'});
});


module.exports = router;
