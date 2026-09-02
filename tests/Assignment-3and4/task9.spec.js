

const {test, expect} = require('@playwright/test')

test('Sliders validation', async ({page}) => {

    await page.goto('https://demoqa.com/')
    await page.locator(".category-cards a[href*='widgets']").click()
    await page.getByRole("link", {name: "Slider"}).click()

    const slider = page.locator('input.range-slider');
    const initialValue = await slider.inputValue();
    console.log('Initial slider value:', initialValue);

    await slider.fill('50');
    const newValue = await slider.inputValue();
    console.log('New slider value:', newValue);

    expect(newValue).toBe('50');
    expect(newValue).not.toBe(initialValue);


})