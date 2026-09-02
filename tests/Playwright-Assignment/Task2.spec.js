const { test, expect } = require('@playwright/test');

test('Mocking and Modifying API - Invalid ID', async ({ page }) => {

    await page.route(
        'https://jsonplaceholder.typicode.com/posts',
        async route => {
            await route.continue({
                url: 'https://jsonplaceholder.typicode.com/posts/1001'
            });
        }
    );

    const response = await page.goto(
        'https://jsonplaceholder.typicode.com/posts'
    );

    const responseJson = await response.json();

    console.log('Status:', response.status());
    console.log('Response:', responseJson);

    expect(response.status()).toBe(404);
    expect(responseJson).toEqual({});

})

test('Mocking and Modifying API - Response', async ({ page }) => {

    const mockedResponsePayLoad = {
        userId: 10,
        id: 1002,
        title: "New section for 1002",
        body: "Addition of new section 1002"
    }

    await page.route("https://jsonplaceholder.typicode.com/posts", 
        async route => {
            const response = await page.request.fetch(route.request())
            const body = JSON.stringify(mockedResponsePayLoad)
            await route.fulfill({
                response,
                body
            })
        }
    )

    const mockedResponse = await page.goto(
        'https://jsonplaceholder.typicode.com/posts'
    );


    const mockedResponseJson = await mockedResponse.json();

    //console.log(mockedResponseJson)

    expect(mockedResponse.status()).toBe(200);
    expect(mockedResponseJson).toBeTruthy()
    expect(mockedResponseJson).toHaveProperty("userId", mockedResponsePayLoad.userId)

})

    

