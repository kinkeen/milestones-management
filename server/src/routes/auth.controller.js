var express = require('express');
var router = express.Router();

router.post('/login', async (req, res, next) => {

	const body = req.body;
	console.log(body);

	try {

		return res.status(201).json({
			user: {
				name: 'Shlomi Elbaz',
				id: 1,
				isAdmin: true
			},
			auth_token: 'ece233d0-40d7-47fe-8bd5-e152ea11bccb'
		});
	}
	catch (err) {
		if (err.name === 'ValidationError') {
			return res.status(400).json({ error: err.message });
		}

		// unexpected error
		return next(err);
	}
});

module.exports = router;