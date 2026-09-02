

import {test, expect, request} from '@playwright/test'

test('Token Based Authentication', async({request}) => {

        const loginPayLoadData = {
            username: 'emilys',
            password: 'emilyspass',
            expiresInMins: 30
        }

        const loginResp = await request.post("https://dummyjson.com/auth/login", 
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: loginPayLoadData
            }
        )
    
        expect(loginResp.status()).toBe(200)
        const loginRespJson = await loginResp.json()
        //console.log(loginRespJson)
        const token = loginRespJson.accessToken
        expect(token).toBeTruthy()

        let currentUserResp = await request.get("https://dummyjson.com/auth/me", 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        expect(currentUserResp.status()).toBe(200)

        const currentUserRespJson = await currentUserResp.json()

        console.log("Current User Response: ", currentUserRespJson)

        expect(currentUserRespJson).toBeTruthy()
        expect(currentUserRespJson).toHaveProperty("username", loginPayLoadData.username)
        expect(currentUserRespJson).toHaveProperty("password", loginPayLoadData.password)

    
})