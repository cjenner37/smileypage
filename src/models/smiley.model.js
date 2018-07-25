const mongoose = require('mongoose');

const SmileySchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	faceWidth: {type: Number, default: 120},
	faceHeight: {type: Number, default: 140},
	eyeWidth: {type: Number, default: 20},
	eyeHeight: {type: Number, default: 10},
	pupilSize: {type: Number, default: 8},
	mouthMarginTop: {type: Number, default: 20},
	mouthWidth: {type: Number, default: 60},
	mouthHeight: {type: Number, default: 20},
	jaw: {type: Number, default: 5},
	created_at: {type: Date, default: Date.now},
	deleted: { type: Boolean }
});

const Smiley = mongoose.model('Smiley', SmileySchema);


module.exports = Smiley
