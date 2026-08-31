
const {test, expect} = require('@playwright/test')

function recommendTransport(budget, distanceToTravel) {
    if(budget<1000) {
        return `Recommended travel transport mode for Budget: ${budget} is : BUS`
    } else if(budget>=1000 && distanceToTravel<200) {
        return `Recommended travel transport mode for Budget: ${budget} and Distance: ${distanceToTravel} is : BIKE`
    } else if(budget>=1000 && distanceToTravel>=200) {
        return `Recommended travel transport mode for Budget: ${budget} and Distance: ${distanceToTravel} is : CAR`
    } else if(budget>10000) {
        return `Recommended travel transport mode for Budget: ${budget} is : FLIGHT`
    }

}

test('Check Budget Travel Distance Test case', () => {

    expect(recommendTransport(500)).toBe('Recommended travel transport mode for Budget: 500 is : BUS')
    expect(recommendTransport(1000,199)).toBe('Recommended travel transport mode for Budget: 1000 and Distance: 199 is : BIKE')
    expect(recommendTransport(1000,200)).toBe('Recommended travel transport mode for Budget: 1000 and Distance: 200 is : CAR')
    expect(recommendTransport(11000)).toBe('Recommended travel transport mode for Budget: 11000 is : FLIGHT')

})