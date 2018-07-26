
const $mouth = $('#mouth')[0]
const $mouthSpace = $('#mouth-space')[0]
const $face = $('#face')[0]
const $eyeSpace = $('#eye-space')[0]
const $leftEye = $('#left-eye')[0]
const $rightEye = $('#right-eye')[0]
const $leftPupil = $('#left-pupil')[0]
const $rightPupil = $('#right-pupil')[0]
var currentSmiley = ""
const $saveButton = $('#saveButton')
const $deleteButton = $('#deleteButton')

$(document).ready(function () {

	insertSmileyList()
	$('#faceWidth').change(function () {
		$face.style.width = `${this.value}px`
	})
	$('#faceHeight').change(function () {
		$face.style.height = `${this.value}px`
	})
	$('#eyeWidth').change(function () {
		$leftEye.style.width = `${this.value}px`
		$rightEye.style.width = `${this.value}px`
	})
	$('#eyeHeight').change(function () {
		$leftEye.style.height = `${this.value}px`
		$rightEye.style.height = `${this.value}px`
	})
	$('#pupilSize').change(function () {
		$leftPupil.style.width = `${this.value}px`
		$leftPupil.style.height = `${this.value}px`
		$rightPupil.style.width = `${this.value}px`
		$rightPupil.style.height = `${this.value}px`
	})
	$('#mouthMarginTop').change(function () {
		$mouthSpace.style.marginTop = `${this.value}px`
	})
	$('#mouthWidth').change(function () {
		$mouth.style.width = `${this.value}px`
	})
	$('#mouthHeight').change(function () {
		$mouth.style.height = `${this.value}px`
	})
	$('#jaw').change(function () {
		$mouth.style.boxShadow = `0px ${this.value}px 0px 0px black`
	})
})

// CREATE and UPDATE
function saveSmiley() {
	var route = ""
	var httpMethod = ""

	const smileyData = {
		name: $('#name').val(),
		faceWidth: $('#faceWidth').val(),
		faceHeight: $('#faceHeight').val(),
		eyeWidth: $('#eyeWidth').val(),
		eyeHeight: $('#eyeHeight').val(),
		pupilSize: $('#pupilSize').val(),
		mouthMarginTop: $('#mouthMarginTop').val(),
		mouthWidth: $('#mouthWidth').val(),
		mouthHeight: $('#mouthHeight').val(),
		jaw: $('#jaw').val()
	}
	console.log(JSON.stringify(smileyData))
	// $.post("/api/new", JSON.stringify(smileyData), null, "json")
	if (currentSmiley === "") {
		route = "/api/smiley"
		httpMethod = "POST"
	} else {
		route = `/api/smiley/${currentSmiley}`
		httpMethod = "PUT"
	}

	fetch(route, {
		method: httpMethod,
		body: JSON.stringify(smileyData),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		// .then(response => response.json())
		.then(smiley => {
			console.log("We Saved One!", smiley)
			updateSmiley(smiley)
			insertSmileyList()

		})
		.catch(err => {
			console.error('Something went wrong:', err)
		})
	// insertSmileyList()
	// updateSmiley(currentSmiley)
}

function loadSmiley(smileyId) {
	return $.ajax(`/api/smiley/${smileyId}`).then(res => {
		currentSmiley = smileyId
		updateSmiley(res)
		// return res
	}).fail(err => {
		console.log('Could not load', err)
		throw err
	})
}

function updateSmiley(smiley) {

		$face.style.height = `${smiley.faceHeight}px`
		$face.style.width = `${smiley.faceWidth}px`
		$leftEye.style.width = `${smiley.eyeWidth}px`
		$rightEye.style.width = `${smiley.eyeWidth}px`
		$leftEye.style.height = `${smiley.eyeHeight}px`
		$rightEye.style.height = `${smiley.eyeHeight}px`
		$leftPupil.style.height = `${smiley.pupilSize}px`
		$rightPupil.style.height = `${smiley.pupilSize}px`
		$leftPupil.style.width = `${smiley.pupilSize}px`
		$rightPupil.style.width = `${smiley.pupilSize}px`
		$mouthSpace.style.marginTop = `${smiley.mouthMarginTop}px`
		$mouth.style.width = `${smiley.mouthWidth}px`
		$mouth.style.height = `${smiley.mouthHeight}px`
		$mouth.style.boxShadow = `0px ${smiley.jaw}px 0px 0px black`

		// currentSmiley = smiley.id
		$('#name').val(smiley.name)
		$('#faceHeight').val(smiley.faceHeight)
		$('#faceWidth').val(smiley.faceWidth)
		$('#eyeWidth').val(smiley.eyeWidth)
		$('#eyeHeight').val(smiley.eyeHeight)
		$('#pupilSize').val(smiley.pupilSize)
		$('#mouthMarginTop').val(smiley.mouthMarginTop)
		$('#mouthWidth').val(smiley.mouthWidth)
		$('#mouthHeight').val(smiley.mouthHeight)
		$('#jaw').val(smiley.jaw)

}

function deleteSmiley() {
	if (currentSmiley === "") {
		alert("No Smiley Selected")
	} else {
		fetch(`/api/smiley/${currentSmiley}`, { 
			method: 'DELETE',
			headers: {'Content-Type': 'application/json'}
		})
			.then(response => response.json())
			.then(response => {
				alert("Smiley was deleted!")
				currentSmiley = ""
				updateSmiley()
			})
			.catch(err => {
				console.error("Delete failed", err)
			})
	}
	location.reload()
}

// IMPORTED
function getSmileys() {
	return $.ajax('/api/smileys').then(res => {
		console.log("Results from getSmileys()", res)
		return res
	})
	.fail(err => {
		console.log('Error in getSmileys()', err)
		throw err
	})
}

function compileSmileyLinkHTML(data) {
	var compiled = ''
	data.forEach(smiley => {
		compiled += `
			<button class="button is-medium" style="margin: 5px" onclick="loadSmiley('${smiley.id}')"><h3>${smiley.name}</h3></button>
		`
	})
	compiled = `<div class="field is-grouped is-grouped-multiline">${compiled}</div>`
	return compiled
}

function insertSmileyList() {
	getSmileys().then(smileys => {
		window.smileyList = smileys
		$('#container').html(compileSmileyLinkHTML(smileys))
	})
}