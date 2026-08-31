

const {test, expect} = require('@playwright/test')

class User {

    constructor(username, password) {
        this.username = username
        this.password = password
    }

    login(username, password) {
        if(this.username === username && this.password === password) {
            console.log('Login Successful')
        } else {
            console.log('Invalid Credentials')
        }
    }
}

test('Login Credential Test Case', () => {

    const users = [
        new User('admin', 'test123'),
        new User('scott', 'test@123'),
        new User('rode', 'num123')
    ]

    for(let i=0; i<users.length; ++i) {
        users[i].login('scott', 'test@123')
    }
        
    
})