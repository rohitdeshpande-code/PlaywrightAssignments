

const {test, expect} = require('@playwright/test')

test('Web Tables validation', async ({page}) => {

    const record = {
        firstName: 'Rohit',
        lastName: 'Deshpande',
        email: 'rohit.qa@example.com',
        age: '29',
        salary: '55000',
        department: 'Engineering',
    };

    await page.goto('https://demoqa.com/')
    await page.locator(".category-cards a[href*='elements']").click()
    await page.getByText("Web Tables").click()

    await page.getByRole("button", {name: "Add"}).click()
    await expect(page.locator("#registration-form-modal")).toHaveText("Registration Form")
    await page.locator("#firstName").fill(record.firstName)
    await page.locator("#lastName").fill(record.lastName)
    await page.getByPlaceholder("name@example.com").fill(record.email)
    await page.getByPlaceholder("Age").fill(record.age)
    await page.locator("#salary").fill(record.salary)
    await page.getByPlaceholder("Department").fill(record.department)
    await page.locator("button[type='submit']").click()

    await page.getByPlaceholder("Type to search").fill(record.firstName)

    const row = page.locator("tbody tr")
    const cells = row.locator('td:not(:last-child)');
    await expect(cells).toContainText([
        record.firstName,
        record.lastName,
        record.age,
        record.email,
        record.salary,
        record.department

    ])
})