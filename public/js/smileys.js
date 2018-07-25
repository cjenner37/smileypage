$(document).ready(function () {
	insertSmileyList()
})

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