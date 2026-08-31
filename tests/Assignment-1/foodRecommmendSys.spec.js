
const {test, expect} = require ('@playwright/test')

function recommendFood(hungerLevel) {

    if(hungerLevel <= 3) {
        return `Recommended food based on ${hungerLevel} is : Snack`
    } else if(hungerLevel >=4 && hungerLevel <=7) {
        return `Recommended food based on ${hungerLevel} is : Burger`
    } else {
        return `Recommended food based on ${hungerLevel} is : Full Meal`
    }

}

test('Check Hunger Level Test case', () => {

    expect(recommendFood(2)).toBe('Recommended food based on 2 is : Snack')
    expect(recommendFood(6)).toBe('Recommended food based on 6 is : Burger')
    expect(recommendFood(9)).toBe('Recommended food based on 9 is : Full Meal')

})