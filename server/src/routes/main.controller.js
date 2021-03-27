var express = require('express');
var router = express.Router();
var ProjectService = require('../services/projects.service');



router.get('/', async function (req, res, next) {
	
	res.write("it's works");
});


module.exports = router;