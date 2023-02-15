const request = require('supertest');
const app = require('../app');

describe("POST /lookup", () => {
    // Test 1
    it("should return an array of location data for valid IP addresses", async () => {
        const response = await request(app)
            .post("/lookup")
            .send({
                ipAddresses: "119.92.244.146, 99.199.150.193"
            })
            .set("Accept", "application/json");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
                ip: "119.92.244.146",
                countryCode: "PH",
                postalCode: "4200",
                city: "Batangas",
                timezone: "Asia/Manila",
                accuracyRadius: 500,
            },
            {
                ip: "99.199.150.193",
                countryCode: "CA",
                postalCode: "V6Y",
                city: "Richmond",
                timezone: "America/Vancouver",
                accuracyRadius: 5,
            },
        ]);
    });

    // Test 2
    it("should return an error message for invalid IP addresses", async () => {
        const response = await request(app)
            .post("/lookup")
            .send({
                ipAddresses: "invalid ip, 119.92.244.146"
            })
            .set("Accept", "application/json");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{
                ip: "invalid ip",
                error: "Not found",
            },
            {
                ip: "119.92.244.146",
                countryCode: "PH",
                postalCode: "4200",
                city: "Batangas",
                timezone: "Asia/Manila",
                accuracyRadius: 500,
            },
        ]);
    });

    // Test 3
    it("should return an error message for an invalid request body", async () => {
        const response = await request(app)
            .post("/lookup")
            .send({
                invalidKey: "119.92.244.146, 99.199.150.193"
            })
            .set("Accept", "application/json");
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Missing ipAddresses key in request body",
        });
    });
});