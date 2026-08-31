
const {test, expect} = require('@playwright/test')

test('Checkboxes validation', async ({page}) => {

    await page.goto('https://demoqa.com/')
    await page.locator(".category-cards a[href*='elements']").click()
    await page.getByText("Check Box").click()

    const collapsedNodes = page.locator('.rc-tree-switcher_close');

    while (await collapsedNodes.count() > 0) {
        await collapsedNodes.first().click();
    }

    await page.getByRole("checkbox", {name: "Notes"}).click()
    await page.getByRole("checkbox", {name: "React"}).click()
    await page.getByRole("checkbox", {name: "Public"}).click()
    await page.getByRole("checkbox", {name: "Word File.doc"}).click()

    await expect(page.locator("#result .text-success")).toContainText(["notes", "react", "public", "wordFile"]);

    await page.pause()



})