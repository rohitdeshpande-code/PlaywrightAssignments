

const {test} = require('@playwright/test')

let total = 0
let discount = 0
function calculateCartTotal(cartItems) {

    cartItems.forEach((cart) => {
        total = total + cart.price * cart.quantity
    })

    if(total > 3000) {
        discount = total * 10/100
    } else if(total > 5000) {
        discount = total * 20/100
    }

    const finalAmount = total - discount

    //return cartItems
    return `Total price of item is ${total} and discount is ${discount} and Final Amount to be paid is ${finalAmount}`
}

test('Shopping Cart Calculator test case', () => {

    const cartItems = [
        {itemName: "iPhone", price: 2000, quantity: 2},
        {itemName: "OnePlus", price: 1000, quantity: 1}
    ]

    const cartItemsDesc = calculateCartTotal(cartItems)

    console.log(cartItemsDesc)

})