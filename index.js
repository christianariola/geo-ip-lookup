const dotenv = require("dotenv").config();
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

// Static file serving
app.use(express.static('public'));

// JSON parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Listening to the port that is set in the environment. */
app.listen(PORT, () => console.log(`listening to ${PORT}`));

// IP lookup API endpoint
app.post('/lookup', (req, res) => {

});