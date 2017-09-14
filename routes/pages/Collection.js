const express = require('express');
const router = express.Router(),
	config = require("../../config");
		
router.get('/', (req, res, next) => {
	res.render('TimeLine',{title:'点滴-时光鸡'});
});
	

router.get('/*', (req, res, next) => {
	next();
});
module.exports = router;
