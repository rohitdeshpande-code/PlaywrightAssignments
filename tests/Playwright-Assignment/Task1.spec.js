
import {test, expect} from '@playwright/test'

test('API request and validation', async({request}) => {

    const resp = await request.get("https://jsonplaceholder.typicode.com/posts/")

    expect(resp.status()).toBe(200)

    const respJson = await resp.json()

    expect(respJson).toBeTruthy()

    expect(respJson[0]).toHaveProperty("userId",1)
    expect(respJson[0]).toHaveProperty("id",1)
    expect(respJson[0].title).toContain("excepturi")
    expect(respJson[0].body).toContain("quia")

    const payLoadFirst = {
        userId: 1,
        title: 'Playwright API Test',
        body: 'This is a sample post created using Playwright API testing.'
    }

    const firstResp = await request.post("https://jsonplaceholder.typicode.com/posts", 
        {
            data:payLoadFirst
        }
    )
    expect(firstResp.status()).toBe(201)

    const firstRespJson = await firstResp.json()

    expect(firstRespJson).toHaveProperty("userId", 1)
    expect(firstRespJson).toHaveProperty("title", "Playwright API Test")
    expect(firstRespJson.body).toContain("testing.")
    expect(firstRespJson).toHaveProperty("id", 101)

    console.log("Newly Added Response for Request: ", firstRespJson)

})