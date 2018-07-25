const router = require('express').Router();

// const models = require('../models/index.js');
const Smiley = require('../models/smiley.model.js');

// CREATE
router.post('/smiley', (req, res, next) => {
	console.log("You're in the router. Here's the data we got:");
	console.log(req.body);
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

	Smiley.create(smileyData, (err, newSmiley) => {
		if (err) {
			console.log(err);
			return res.status(500).json(err);
		} 
		console.log(newSmiley)
		res.json(newSmiley)
	})
})

// READ
router.get('/smileys', (req, res, next) => {
	Smiley.find({deleted: {$ne: true}}, (err, smileys) => {
		if (err) {
			console.log(err);
			return res.status(500).json(err);
		} 

		var names = [];
		for (var i = smileys.length - 1; i >= 0; i--) {
			names.push({id: smileys[i]._id, name: smileys[i].name});
		}

		res.json(names);
	});
});

router.get('/smiley/:smileyId', (req, res, next) => {

	Smiley.findById(req.params.smileyId, (err, smiley) => {
		if (err) return res.status(500).send(err)
		console.log("found ", smiley)
		return res.json(smiley)
	})

}); 

// UPDATE
router.put('/smiley/:smileyId', (req, res, next) => {
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
	Smiley.findByIdAndUpdate(req.params.smileyId, smileyData, {new: true})
	.then(smiley => {
		if (!smiley) {
			return res.status(404).send({
				message: "Smiley not found with id" + req.params.smileyId
			})
		}
		res.json(smiley)
	})
})

// DELETE
router.delete('/smiley/:smileyId', (req, res, next) => {
	Smiley.findByIdAndRemove(req.params.smileyId)
	.then(smiley => {
		if (!smiley) {
			return res.status(404).send({
				message: "Smiley not found with id " + req.params.smileyId
			})
		}
		res.send({message: "Smiley deleted successfully!"})
	}).catch(err => {
		if (err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({
				message: "Smiley not found with id " + req.params.smileyId
			})
		}
	})
})


module.exports = router