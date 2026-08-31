
const {test, expect} = require('@playwright/test')


test('Radio buttons validation', async ({page}) => {

    await page.goto('https://demoqa.com/')
    await page.locator(".category-cards a[href*='elements']").click()
    await page.getByText("Radio Button").click()

    await page.getByLabel("Yes").click()
    await expect(page.locator("p.mt-3")).toContainText("Yes")

    await page.getByLabel("Impressive").click()
    await expect(page.locator("p.mt-3")).toContainText("Impressive")

    await page.pause()


})