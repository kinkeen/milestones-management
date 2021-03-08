var express = require('express');
var router = express.Router();
var ProjectService = require('../services/projects.service');



router.get('/', async function (req, res, next) {
	const incidents = await ProjectService.retrieve()
	res.json(incidents);
});

router.get('/:id', async (req, res, next) => {
	try {
		const incident = await ProjectService.get(req.params.id);

		return res.json(incident);
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});


router.post('/', async (req, res, next) => {
	
	const body = req.body;

	try {
		const incident = await ProjectService.create(body);

		if (body.id != null) {
			incident.id = body.id;
		}

		return res.status(201).json(incident);
	}
	catch (err) {
		if (err.name === 'ValidationError') {
			return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});


router.put('/:id', async (req, res, next) => {
	try {
		const incident = await ProjectService.update(req.params.id, req.body);

		return res.json(incident);
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});


router.delete('/:id', async (req, res, next) => {
	try {
		const incident = await ProjectService.delete(req.params.id);

		return res.json({ success: true });
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});

module.exports = router;