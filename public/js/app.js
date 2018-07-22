

$(document).ready(function () {
	$('#jaw').change(function () {
		const $mouth = $('#mouth');
		jawValue = this.value;
		$mouth[0].style.boxShadow = "0px " + jawValue + "px 0 0 black";
	})
})

function saveSmiley() {
	const smileyData = {
		jaw: $('#jaw').val()
	}
	console.log(JSON.stringify(smileyData))
	// $.post("/api/new", JSON.stringify(smileyData), null, "json")
	fetch('/api/new', {
		method: 'POST',
		body: JSON.stringify(smileyData),
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(smiley => {
			console.log("We Saved One!", smiley)

		})
		.catch(err => {
			console.error('Something went wrong:', err)
		})
}