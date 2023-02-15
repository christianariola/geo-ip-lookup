const form = document.getElementById('iplookup-form');
const resultsDiv = document.getElementById('results');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const ipAddresses = formData.get('ipAddresses');

    const response = await fetch('/lookup', {
        method: 'POST',
        body: JSON.stringify({ ipAddresses }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const results = await response.json();

    let resultsHtml = '<h2>Results</h2>';

    results.forEach(result => {
        resultsHtml += `<div><h3>${result.ip}</h3>`;
        if (result.error) {
            resultsHtml += `<p>${result.error}</p>`;
        } else {
            resultsHtml += `<p>Country Code: ${result.countryCode}</p>`;
            resultsHtml += `<p>Postal Code: ${result.postalCode}</p>`;
            resultsHtml += `<p>City: ${result.city}</p>`;
            resultsHtml += `<p>Timezone: ${result.timezone}</p>`;
            resultsHtml += `<p>Accuracy Radius: ${result.accuracyRadius}</p>`;
        }
        resultsHtml += `</div>`;
    });

    resultsDiv.innerHTML = resultsHtml;
});