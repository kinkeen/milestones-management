var express = require('express');
var router = express.Router();
var MilestonesService = require('../services/milestones.service');

// router.get('/', async function (req, res, next) {
// 	const incidents = await MilestoneService.retrieve()
// 	res.json(incidents);
// });

// router.get('/:id', async (req, res, next) => {
// 	try {
// 		const incident = await MilestoneService.get(req.params.id);

// 		return res.json(incident);
// 	}
// 	catch (err) {
// 		// unexpected error
// 		return next(err);
// 	}
// });

router.post('/', async (req, res, next) => {
	
	const body = req.body;

	try {
		const milestone = await MilestonesService.create(body);

		// if (body.id != null) {
		// 	milestone.id = body.id;
		// }

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
		const incident = await MilestonesService.update(req.params.id, req.body);
		
		return res.json(incident);
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});


router.delete('/:id', async (req, res, next) => {
	try {
		const incident = await MilestonesService.delete(req.params.id);

		return res.json({ success: true });
	}
	catch (err) {
		// unexpected error
		return next(err);
	}
});

module.exports = router;