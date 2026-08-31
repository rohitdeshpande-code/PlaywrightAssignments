

const {test, expect} = require('@playwright/test')

test('Dialog boxes validation', async ({page}) => {

    await page.goto('https://demoqa.com/')
    await page.locator(".category-cards a[href*='alertsWindows']").click()
    await page.getByRole("link", {name: "Alerts"}).click()

   // Alert
    await Promise.all([
        page.waitForEvent('dialog').then(async dialog => {
        console.log('Alert:', dialog.message());
        await dialog.accept();
    }),
    page.locator('#alertButton').click()
    ]);

    // Timer Alert
    await Promise.all([
        page.waitForEvent('dialog').then(async dialog => {
        console.log('Timer Alert:', dialog.message());
        await dialog.accept();
    }),
    page.locator('#timerAlertButton').click()
    ]);

    // Confirm
    await Promise.all([
        page.waitForEvent('dialog').then(async dialog => {
        console.log('Confirm:', dialog.message());
        await dialog.accept();
    }),
    page.locator('#confirmButton').click()
    ]);

    // Prompt
    await Promise.all([
        page.waitForEvent('dialog').then(async dialog => {
        console.log('Prompt:', dialog.message());
        await dialog.accept('Rohit');
    }),
    page.locator('#promtButton').click()
    ]);

    //await page.pause()

})