const express = require('express');
const router = express.Router(),
	config = require("../../config");
	
router.get('/', (req, res, next) => {
	
	
	res.render('TimeLine');
	
});
		
router.get('/TimeLine', (req, res, next) => {
	res.locals.status = 1
	res.render('TimeLine',{title:'点滴-时光鸡'});
});
	
router.get('/NoteWall', (req, res, next) => {
	res.locals.status = 0
	res.render('TimeLine',{title:'点滴-笔记强'});
});
	

module.exports = router;
