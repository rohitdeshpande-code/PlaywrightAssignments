

const {test, expect} = require('@playwright/test')

test('Web Tables validation', async ({page}) => {

    await page.goto('https://demoqa.com/')
    await page.locator(".category-cards a[href*='elements']").click()
    await page.getByText("Web Tables").click()

    await page.getByRole("button", {name: "Add"}).click()
    await expect(page.locator("#registration-form-modal")).toHaveText("Registration Form")
})