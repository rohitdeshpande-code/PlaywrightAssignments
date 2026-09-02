import { test, expect } from '@playwright/test';

const fakePayLoadOrders = {
    data: [],
    message: "No Data Show"
};

test('Browser and API integration for intercepting response', async ({ page }) => {

    await page.route(
        'https://jsonplaceholder.typicode.com/posts',
        async route => {

            const response = await page.request.fetch(route.request());

            await route.fulfill({
                response,
                body: JSON.stringify(fakePayLoadOrders)
            });
        }
    );

    const responsePromise = page.waitForResponse(
        response =>
            response.url() === 'https://jsonplaceholder.typicode.com/posts'
    );

    await page.evaluate(async () => {
        await fetch('https://jsonplaceholder.typicode.com/posts');
    });

    const response = await responsePromise;

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    console.log('Response:', responseBody);

    expect(responseBody).toEqual(fakePayLoadOrders);
    expect(responseBody.data).toEqual([]);
    expect(responseBody.message).toBe('No Data Show');
});