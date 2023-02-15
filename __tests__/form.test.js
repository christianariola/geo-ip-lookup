const puppeteer = require("puppeteer");
const path = require("path");

describe("Geolocation IP Lookup Form", () => {
	let browser, page;

	beforeAll(async () => {
		browser = await puppeteer.launch();
		page = await browser.newPage();
		await page.goto(`file:${path.join(__dirname, "../public/index.html")}`);
	});

	afterAll(async () => {
		await browser.close();
	});

	// Test 1
	test("Input field should not be empty", async () => {
		const input = await page.$("#ip-addresses");
		await input.type("");
		const submitBtn = await page.$('button[type="submit"]');
		await submitBtn.click();
		const error = await page.$(".invalid-feedback");
		const errorMessage = await page.evaluate((el) => el.textContent, error);
		expect(errorMessage).toBe("Please enter at least one IP address.");
	});

	// Test 2
	test("Input field should display an error message for more than 10 IP addresses", async () => {
		const input = await page.$("#ip-addresses");
		await input.type(
			"192.168.0.1,192.168.0.2,192.168.0.3,192.168.0.4,192.168.0.5,192.168.0.6,192.168.0.7,192.168.0.8,192.168.0.9,192.168.0.10,192.168.0.11"
		);
		const submitBtn = await page.$('button[type="submit"]');
		await submitBtn.click();
		const error = await page.$(".invalid-feedback");
		const errorMessage = await page.evaluate((el) => el.textContent, error);
		expect(errorMessage).toBe("Please enter a maximum of 10 IP addresses.");
	});
});
