
const {test, expect} = require('@playwright/test')

test('Task 1 - Open website and basic validation', async ({page}) => {

    await page.goto('https://www.saucedemo.com/')
    //console.log(await page.title()) //Swag Labs
    await expect(page).toHaveTitle('Swag Labs')
    await expect(page.locator("input[data-test='login-button']")).toBeVisible()

})

test('Task 2 - Locate elements', async({page}) => {

    await page.goto('https://www.saucedemo.com/')
    await expect(page.getByPlaceholder('Username')).toBeEmpty()
    await expect(page.getByPlaceholder('Password')).toBeEmpty()
    await expect(page.getByRole("button", {name: "Login"})).toBeVisible()

})

test('Task 3 - Perform Login', async({page}) => {

    await page.goto('https://www.saucedemo.com/')
    await page.locator('#user-name').fill('standard_user')
    await page.locator('input[type="password"]').fill('secret_sauce')
    await page.locator('.submit-button').click()
    await expect(page).toHaveURL(/inventory\.html/)
})

test('Task 4 - DOM Handeling', async({page}) => {

    await page.goto('https://www.saucedemo.com/')
    await page.locator('#user-name').fill('standard_user')
    await page.locator('input[type="password"]').fill('secret_sauce')
    await page.locator('.submit-button').click()

    const products = page.locator('.inventory_item')
    for(let i=0; i< await products.count(); ++i) {

        const product = products.nth(i)
        const name = await product.locator('.inventory_item_name').textContent()
        const price = await product.locator('.inventory_item_price').textContent()
        console.log("Product names: ", name + " *** " + "Product prices: ", price)
    }
})

test('Task 5 - Extract Data', async({page}) => {

    await page.goto('https://www.saucedemo.com/')
    await page.locator('#user-name').fill('standard_user')
    await page.locator('input[type="password"]').fill('secret_sauce')
    await page.locator('.submit-button').click()

    const products = page.locator('.inventory_item')
    for(let i=0; i< await products.count(); ++i) {

        const name = await products.nth(i).locator('.inventory_item_name').textContent()
        console.log("Product names: ", name)
    }
})

test('Task 6 - Assertions', async({page}) => {

    await page.goto('https://www.saucedemo.com/')
    await page.locator('#user-name').fill('standard_user')
    await page.locator('input[type="password"]').fill('secret_sauce')
    await page.locator('.submit-button').click()

    const products = page.locator('.inventory_item')
    const productCount = await products.count()

    expect(productCount).toBeGreaterThanOrEqual(6)

    const names = []
    for(let i=0; i< productCount; ++i) {

        const product = products.nth(i)
        const name = await product.locator('.inventory_item_name').textContent()
        const price = await product.locator('.inventory_item_price').textContent()

        names.push(name)
        expect(price).toMatch(/^\$\d+\.\d{2}$/)
    }

    expect(names).toContain('Sauce Labs Backpack')
})

test('Task 7 - Reusable Locators', async({page}) => {

    const username = page.locator('#user-name')
    const password = page.locator('input[type="password"]')
    const signInBtn = page.locator('.submit-button')
    const products = page.locator('.inventory_item')

    
    await page.goto('https://www.saucedemo.com/')
    await username.fill('standard_user')
    await password.fill('secret_sauce')
    await signInBtn.click()

    const productCount = await products.count()
    expect(productCount).toBeGreaterThanOrEqual(6)

    for(let i=0;i<productCount;++i) {

        const name = products.nth(i).locator('.inventory_item_name')
        const price = products.nth(i).locator('.inventory_item_price')

        await expect(name).not.toBeEmpty()
        await expect(price).not.toBeEmpty()
    }
})

test.describe('Task 8 - Test structure', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/')
        await page.locator('#user-name').fill('standard_user')
        await page.locator('input[type="password"]').fill('secret_sauce')
        await page.locator('.submit-button').click()
    })

    test.afterEach(async ({page}, testInfo) => {
        console.log(`Finished "${testInfo.title}" with status: ${testInfo.status}`)
        await page.close()
    })

    test('Test case for product should display at least 6 products', async ({page}) => {

        const products = page.locator('.inventory_item')
        expect(await products.count()).toBeGreaterThanOrEqual(6)

    })

    test('Test case for "Sauce Labs Backpack" product to be present', async ({page}) => {
        const productNames = await page.locator('.inventory_item_name').allTextContents()
        expect(productNames).toContain('Sauce Labs Backpack')
    })
})

test.only('Task 10 - Auto-wait & Timeout', async ({page}) => {

    await page.goto('https://www.saucedemo.com/')
    await page.locator('#user-name').fill('standard_user')
    await page.locator('input[type="password"]').fill('secret_sauce')
    await page.locator('.submit-button').click()


    const inventoryList = page.locator('.inventory_list')
    await expect(inventoryList).toBeVisible()

    const firstProduct = page.locator('.inventory_item').first()
    await expect(firstProduct).toBeVisible({timeout: 15*1000})
    await expect(firstProduct.locator('.inventory_item_name')).not.toBeEmpty()

    await firstProduct.locator('.btn_inventory').click({timeout: 5*1000})
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1')
})

