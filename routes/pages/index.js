const express = require('express');
const router = express.Router();



/* GET home page. */
router.get('/', (req, res, next) => {
	
  	res.render('index', { title: 'Express'});
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
