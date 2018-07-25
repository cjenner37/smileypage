
const $mouth = $('#mouth')[0]
var currentSmiley = ""

$(document).ready(function () {
		insertSmileyList()

	$('#jaw').change(function () {
		jawValue = this.value
		$mouth.style.boxShadow = "0px " + jawValue + "px 0 0 black"
	})
})

// CREATE and UPDATE
function saveSmiley() {
	var route = ""
	var httpMethod = ""

	const smileyData = {
		name: $('#name').val(),
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

		$mouth.style.boxShadow = "0px " + smiley.jaw + "px 0 0 black"
		$('#jaw').val(smiley.jaw)
		// currentSmiley = smiley.id
		$('#name').val(smiley.name)		

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
			<p>
				<button onclick="loadSmiley('${smiley.id}')"><h3>${smiley.name}</h3></button>
			</p>
		`
	})
	compiled = `<ul>${compiled}</ul>`
	return compiled
}

function insertSmileyList() {
	getSmileys().then(smileys => {
		window.smileyList = smileys
		$('#container').html(compileSmileyLinkHTML(smileys))
	})
}