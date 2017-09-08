const express = require('express');
const router = express.Router(),
	config = require("../../config");
let art =  require('../../controllers/articleService').service;
art = new art()
	
router.get('/', (req, res, next) => {
	let ws = req.query.keyword 
	art.searchArticle({keyword:ws,pageSize:20,status:1}, (data)=>{
		res.locals.keyws = ws
		res.locals.searchList = data.data
		res.render('search', { title: '搜索页面'});
		
	})
});
	


module.exports = router;
