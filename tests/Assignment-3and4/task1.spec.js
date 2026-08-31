
const {test, expect} = require('@playwright/test')

test('Input fields validation', async ({page}) => {

    const username = "qauser"
    const email = "testing123@qa.com"
    const currentAddress = "2, MG Road, Downtown, Pune-01"
    const permanentAddress = "32, Main Road, Uptown, Pune-02"

    await page.goto('https://demoqa.com/')
    await page.locator(".category-cards a[href*='elements']").click()
    await page.getByText("Text Box").click()

    await page.getByPlaceholder("Full Name").fill(username)
    await page.getByPlaceholder("name@example.com").fill(email)
    await page.locator("textarea#currentAddress").fill(currentAddress)
    await page.locator("textarea#permanentAddress").fill(permanentAddress)
    await page.locator("button#submit").click()

    await expect(page.locator("p#name")).toContainText(username)
    await expect(page.locator("p#email")).toContainText(email)
    await expect(page.locator("p#currentAddress")).toContainText(currentAddress)
    await expect(page.locator("p#permanentAddress")).toContainText(permanentAddress)

    await page.pause()
})