const mongoose = require('mongoose');

const SmileySchema = new mongoose.Schema({
	name: {type: String},
	faceWidth: Number,
	faceHeight: Number,
	eyeWidth: Number,
	eyeHeight: Number,
	pupilSize: Number,
	mouthMarginTop: Number,
	mouthWidth: Number,
	mouthHeight: Number,
	jaw: Number,
	created_at: {type: Date, default: Date.now},
	deleted: { type: Boolean }
});

const Smiley = mongoose.model('Smiley', SmileySchema);

module.exports = Smiley;