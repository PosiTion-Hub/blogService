const express = require('express');
const router = express.Router(),
	config = require("../../config"),
	marked = require('marked');
	marked.setOptions({
	  renderer: new marked.Renderer(),
	  gfm: true,
	  highlight: function (code) {
	    return require('highlight.js').highlightAuto(code).value;
	  },
	  tables: true,
	  breaks: false,
	  pedantic: false,
	  sanitize: false,
	  smartLists: true,
	  smartypants: false,
	});
let art =  require('../../controllers/articleService').service;
art = new art()
/* GET home page. */
router.get('/:id', (req, res, next) => {
	let artId = req.params.id
		console.log(artId)
	art.edit({id:artId},function(d){
		res.locals.artInfo = {
			title: d.data.title,
			creatDate: new Date(d.data.creatDate).format("yyyy-M-d h:m:s") ,
			tag:  d.data.tag.split(','),
			content:  marked(d.data.content),
		}
		res.render('details', { title: '文章详情页'});
	})
});
router.get('/*', (req, res, next) => {
	next();
// res.render('404', { title: 'Express'});
});
module.exports = router;
