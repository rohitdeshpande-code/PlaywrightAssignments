

const {test, expect} = require('@playwright/test')

test('Tooltips validation', async ({page}) => {

    await page.goto('https://demoqa.com/')
    await page.locator(".category-cards a[href*='widgets']").click()
    await page.getByText("Tool Tips").click()

    await page.locator("#toolTipButton").hover()
    const toolTipText = page.locator(".tooltip-inner")
    await expect(toolTipText).toBeVisible()
    await expect(toolTipText).toHaveText("You hovered over the Button")

    const field = page.locator('#toolTipTextField');
    await field.hover();

    const tooltip = page.locator('#textFieldToolTip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText('You hovered over the text field');
    
    await page.pause()


})