const dotenv = require("dotenv").config();
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const { Reader } = require("@maxmind/geoip2-node");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Static file serving
app.use(express.static("public"));

// JSON parsing
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

/* Listening to the port that is set in the environment. */
app.listen(PORT, () => console.log(`listening to ${PORT}`));

// IP lookup API endpoint
app.post("/lookup", async (req, res) => {

    // Check if the ipAddresses key exists in the request body
    if (!req.body.ipAddresses) {
        return res.status(400).json({ message: 'Missing ipAddresses key in request body' });
    }

	const ips = req.body.ipAddresses.split(",");
	const results = [];

	try {
		const reader = await Reader.open(process.env.GEOIP_DB_PATH);

		for (const ip of ips) {
			try {
				const response = await reader.city(ip.trim());

                results.push({
                    ip: ip.trim(),
                    countryCode: response.country.isoCode,
                    postalCode: response.postal.code,
                    city: response.city.names.en,
                    timezone: response.location.timeZone,
                    accuracyRadius: response.location.accuracyRadius,
                }); 
			} catch (err) {
                results.push({
                    ip: ip.trim(),
                    error: 'Not found',
                });
			}
		}
	} catch (err) {
        res.status(400).json({
            message: `<p>Error: ${err.message}</p>`
        });
	} finally {
        res.status(200).json(results);
	}
});

module.exports = app;