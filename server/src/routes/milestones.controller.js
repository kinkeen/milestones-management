var express = require('express');
var router = express.Router();
var MilestoneService = require('../services/milestone.service');

router.get('/', async function (req, res, next) {
	const incidents = await MilestoneService.retrieve()
	res.json(incidents);
});

router.get('/:id', async (req, res, next) => {
	try {
		const incident = await MilestoneService.get(req.params.id);

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
		const incident = await MilestoneService.create(body);

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
		const incident = await MilestoneService.update(req.params.id, req.body);

		return res.json(incident);
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});


router.delete('/:id', async (req, res, next) => {
	try {
		const incident = await MilestoneService.delete(req.params.id);

		return res.json({ success: true });
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});

module.exports = router;