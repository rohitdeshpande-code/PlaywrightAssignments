

const {test, expect} = require('@playwright/test')

test('Date picker validation', async ({page}) => {

    await page.goto('https://demoqa.com/')
    await page.locator(".category-cards a[href*='widgets']").click()
    await page.getByRole("link", {name: "Date Picker"}).click()

    await page.locator("#datePickerMonthYearInput").click()
    await page.getByRole('button', { name: 'Previous Month' }).click()
    await page.locator(".react-datepicker__day--020").click()

    const selectedValue = await page.locator('#datePickerMonthYearInput').inputValue();
    console.log('Selected date:', selectedValue);
    expect(selectedValue).toMatch(/\/20\/\d{4}$/); 

    await page.locator("#dateAndTimePickerInput").click()
    await page.getByRole("button", {name: "Previous Month"}).click()
    await page.locator(".react-datepicker__day--028").click()

    const timeToPick = '01:00';
    await page.getByRole("option", {name: timeToPick}).click()

    const selectedValueWithTime = await page.locator("#dateAndTimePickerInput").inputValue()
    console.log('Selected date with time:', selectedValueWithTime);
    expect(selectedValueWithTime).toMatch(/^[A-Za-z]+ \d{1,2}, \d{4} 1:00 AM$/);



})