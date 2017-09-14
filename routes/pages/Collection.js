const express = require('express');
const router = express.Router(),
	config = require("../../config");
		
router.get('/', (req, res, next) => {
	res.render('Collection',{title:'收藏夹'});
});
	

router.get('/*', (req, res, next) => {
	next();
});
module.exports = router;
