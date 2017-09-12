const express = require('express');
const router = express.Router(),
	config = require("../../config");
let art =  require('../../controllers/articleService').service;
art = new art()
	
router.get('/', (req, res, next) => {
	let classify = req.query.classify || ''
	let tag = req.query.tag || ''
	art.getArticleList({classify,tag,pageSize:20,status:1}, (data)=>{
		res.locals.keyws = classify || tag || ''
		res.locals.searchList = data.data
		res.render(classify?'classify':'tags', { title: `${classify?'分类':'标签'}页面`});
		
	})
});
	


module.exports = router;
