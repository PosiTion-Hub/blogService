const express = require('express'),
	router = express.Router();

router.get('/', function(req, res) {
  req.session.destroy();
  res.clearCookie('islogin');
  res.redirect('/login');
});

module.exports = router;