const router = require('express').Router();

const models = require('../models/index.js');
const smiley = models.Smiley;
const num = models.Num;

router.get('/smileys', (req, res, next) => {
	smiley.find({deleted: {$ne: true}}, (err, smileys) => {
		if (err) {
			console.log(err);
			return res.status(500).json(err);
		}

		res.json(smileys);
	});
});

router.get('/smiley/:smileyId', (req, res, next) => {
	const {smileyId} = req.params;
	const smiley = Smileys.find(entry => entry.id === smileyId);
	if (!smiley) {
		return res.status(404).end(`Smiley with ID ${smileyId} does not exist`);
	};

	res.json(smiley);
});

router.post('/new', (req, res, next) => {
	console.log("POASTY POST");
	console.log(req.body.jaw);
	const smileyData = {
		name: req.body.name,
		faceWidth: req.body.faceWidth,
		faceHeight: req.body.faceHeight,
		eyeWidth: req.body.eyeWidth,
		eyeHeight: req.body.eyeHeight,
		eyeSize: req.body.eyeSize,
		pupilSize: req.body.pupilSize,
		mouthMarginTop: req.body.mouthMarginTop,
		mouthWidth: req.body.mouthWidth,
		mouthHeight: req.body.mouthHeight,
		jaw: req.body.jaw
	}

	smiley.create(smileyData, (err, newSmiley) => {
		if (err) {
			console.log(err);
			return res.status(500).json(error);
		} else {
			return res.redirect('/smileys')
		}

		;

		res.json(newSmiley)
	})
})

module.exports = router