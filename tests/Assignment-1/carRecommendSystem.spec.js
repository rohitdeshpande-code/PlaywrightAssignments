
const {test, expect} = require('@playwright/test')

function recommendedCar(familySize, plannedDistanceToDrive) {

    if(familySize<=4 && plannedDistanceToDrive<200) {
        return `Recommended car for familySize: ${familySize} and distance: ${plannedDistanceToDrive} is: TESLA`
    } else if(familySize<=4 && plannedDistanceToDrive>=200) {
        return `Recommended car for familySize: ${familySize} and distance: ${plannedDistanceToDrive} is: TOYOTA CAMRY`
    } else if(familySize > 4) {
        return `Recommended car for familySize: ${familySize} is: MINIVAN`
    }
}

test('Car Recommendation System for family test case', () => {

    expect(recommendedCar(4,199)).toBe('Recommended car for familySize: 4 and distance: 199 is: TESLA')
    expect(recommendedCar(4,201)).toBe('Recommended car for familySize: 4 and distance: 201 is: TOYOTA CAMRY')
    expect(recommendedCar(5)).toBe('Recommended car for familySize: 5 is: MINIVAN')

})