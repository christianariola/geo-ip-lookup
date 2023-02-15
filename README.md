# Geolocation IP Lookup
## Description
Homework Exercise for MaxMind. It's a web form that allows a user to enter one or more IP addresses and on submission, it will look up these IP addresses in the GeoLite2 City database and display the following data:
- Country Code
- Postal Code
- City Name
- Time Zone
- Accuracy Radius

## Getting Started
These instructions will help you get the application up and running on your local machine for development and testing purposes.

## Prerequisites
To run this application, you will need to have Node.js installed on your machine.

## Installing
* Clone the repository: git clone https://github.com/christianariola/geo-ip-lookup.git
* Navigate to the project's root directory: cd geo-ip-lookup
* Install the dependencies: npm install
* Create a .env file and add the following environment variables:
  - PORT = 8080
  - GEOIP_DB_PATH = "./database/GeoLite2-City.mmdb"
* Start the development server: node app.js

## Unit Testing
* Navigate to the project's root directory: cd geo-ip-lookup
* Make sure the application is not running or started
* Run unit tests: npm test

## Built With
- Javascript
- Node.js
- Express.js
- Bootstrap 4
- MaxMind GeoIP2 Node.js API
- Jest (Supertest and Puppeteer)