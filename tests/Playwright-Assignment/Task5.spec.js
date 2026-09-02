import { test, expect } from '@playwright/test';

let authHeaders;

const loginPayLoad = {
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30
    }

test.beforeAll(async ({ request }) => {

    const loginResponse = await request.post('https://dummyjson.com/auth/login',
        {
            data: loginPayLoad
        }
    );

    expect(loginResponse.status()).toBe(200);

    const loginData = await loginResponse.json();

    const token = loginData.accessToken;

    expect(token).toBeTruthy();

    authHeaders = {
        Authorization: `Bearer ${token}`
    };
});


test('1st Get logged in user', async ({ request }) => {

    const response = await request.get('https://dummyjson.com/auth/me',
        {
            headers: authHeaders
        }
    );

    expect(response.status()).toBe(200);

    const data = await response.json();

    console.log('1st Users login information:', data);

    expect(data).toHaveProperty('username', loginPayLoad.username);
});

test('2nd Get logged in user', async ({ request }) => {

    const response = await request.get('https://dummyjson.com/auth/me',
        {
            headers: authHeaders
        }
    );

    expect(response.status()).toBe(200);

    const data = await response.json();

    console.log('2nd Users login information:', data);

    expect(data).toHaveProperty('password', loginPayLoad.password);
});