const express = require('express');
const router = express.Router(),
	config = require("../../config");
		
router.get('/', (req, res, next) => {
	res.locals.status = 1
	res.render('Resource',{title:'资源分析'});
});

router.get('/*', (req, res, next) => {
	next();
// res.render('404', { title: 'Express'});
});
module.exports = router;
