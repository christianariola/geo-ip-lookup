const form = document.getElementById("iplookup-form");
const resultsDiv = document.getElementById("results");
const inputField = document.getElementById("ip-addresses");
const invalidFeedback = document.querySelector(".invalid-feedback");

form.addEventListener("submit", async (event) => {
	event.preventDefault();

	// Check if the input field is empty
	if (!inputField.value) {
		inputField.classList.add("is-invalid");
		invalidFeedback.innerHTML =
			"Please enter at least one IP address.";
		return;
	} else {
		inputField.classList.remove("is-invalid");
	}

	const formData = new FormData(event.target);
	const ipAddresses = formData.get("ipAddresses");

	// Check if the input field contains more than 10 IP addresses
	const ipArr = inputField.value.split(",");
	if (ipArr.length > 10) {
		inputField.classList.add("is-invalid");
		invalidFeedback.innerHTML =
			"Please enter a maximum of 10 IP addresses.";
		return;
	} else {
		inputField.classList.remove("is-invalid");
	}

	// Check if the input field contains invalid IP addresses
	const invalidIp = ipArr.find((ip) => {
		const ipRegex = new RegExp(
			/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
		);
		return !ipRegex.test(ip.trim());
	});

	if (invalidIp) {
		inputField.classList.add("is-invalid");
		invalidFeedback.innerHTML =
			"Please enter a valid IP address.";
		return;
	} else {
		inputField.classList.remove("is-invalid");
	}	

	const response = await fetch("/lookup", {
		method: "POST",
		body: JSON.stringify({ ipAddresses }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		resultsDiv.innerHTML =
			"<p>Something went wrong. Please try again later.</p>";
		return;
	}

	const results = await response.json();

    // Show the results in a responsive table using bootstrap
	let resultsHtml =
		'<div class="table-responsive"><table class="table table-striped table-bordered"><thead><tr><th>IP Address</th><th>Country Code</th><th>Postal Code</th><th>City</th><th>Timezone</th><th>Accuracy Radius</th></tr></thead><tbody>';

	results.forEach((result) => {
		resultsHtml += "<tr>";
		resultsHtml += `<td>${result.ip}</td>`;
		if (result.error) {
			resultsHtml += `<td colspan="5">${result.error}</td>`;
		} else {
			resultsHtml += `<td>${result.countryCode}</td>`;
			resultsHtml += `<td>${result.postalCode}</td>`;
			resultsHtml += `<td>${result.city}</td>`;
			resultsHtml += `<td>${result.timezone}</td>`;
			resultsHtml += `<td>${result.accuracyRadius}</td>`;
		}
		resultsHtml += "</tr>";
	});

	resultsHtml += "</tbody></table></div>";

	resultsDiv.innerHTML = resultsHtml;
});

// Reset the form and remove the results
form.addEventListener("reset", async (event) => {
    resultsDiv.innerHTML = "";
    inputField.classList.remove("is-invalid");
});
