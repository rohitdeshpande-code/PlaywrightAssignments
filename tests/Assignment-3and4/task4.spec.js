
const {test, expect} = require('@playwright/test')

test('Dropdowns validation', async ({page}) => {

    await page.goto('https://demoqa.com/')
    await page.locator(".category-cards a[href*='widgets']").click()
    await page.getByText("Select Menu").click()

    await page.locator("#withOptGroup").click()
    await page.getByText("Group 2, option 1").click()

    await page.locator("#selectOne").click()
    await page.getByText("Prof.").click()

    const oldDropDown = page.locator("#oldSelectMenu")
    oldDropDown.selectOption("7")

    const options = ["Green", "Blue", "Black"]

    for( const option of options) {
        await page.locator("#react-select-4-input").click()
        await page.getByRole('listbox').getByText(option, { exact: true }).click();
    }

    const carModels = page.locator("#cars")
    carModels.selectOption(["volvo", "opel", "audi"])

    await page.pause()


})