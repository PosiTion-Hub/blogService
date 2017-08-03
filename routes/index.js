const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	if(req.cookies.islogin){ 
       	req.session.username = req.cookies.islogin;
       	res.locals.username = req.session.username; 
  	}else{
  		res.redirect('/login');
        return;    
  	}

  res.render('index', { title: 'Express'});
});

module.exports = router;
