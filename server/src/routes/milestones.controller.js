var express = require('express');
var router = express.Router();
var MilestonesService = require('../services/milestones.service');
var SignatureService = require('../services/signature.service');

// router.get('/', async function (req, res, next) {
// 	const incidents = await MilestoneService.retrieve()
// 	res.json(incidents);
// });

router.get('/:id', async (req, res, next) => {
	try {
		const milestone = await MilestonesService.get(req.params.id);
		const signatures = await SignatureService.getByMilestone(req.params.id);
		return res.json({ 
			...milestone, 
			signatures: signatures
		});
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});


router.post('/signature', async (req, res, next) => {
	const body = req.body;
	try {
		console.log(body)
		const milestone = await SignatureService.create(body);
		return res.status(201).json(true);
	}
	catch (err) {
		if (err.name === 'ValidationError') {
			return res.status(400).json({ error: err.message });
		}
		return next(err);
	}
});

router.post('/', async (req, res, next) => {

	const body = req.body;

	try {
		const milestone = await MilestonesService.create(body);
		return res.status(201).json(milestone);
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
		const milestone = await MilestonesService.update(req.params.id, req.body);

		return res.json(milestone);
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});


router.delete('/:id', async (req, res, next) => {
	try {
		const milestone = await MilestonesService.delete(req.params.id);

		return res.json({ success: true });
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});

module.exports = router;