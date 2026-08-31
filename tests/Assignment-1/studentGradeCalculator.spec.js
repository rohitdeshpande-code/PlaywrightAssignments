
const{test, expect} = require('@playwright/test')

function calculateGrades(students) {

    students.forEach((studentInfo) => {
        if(studentInfo.marks >= 80) {
            studentInfo.grade = 'A'
        } else if(studentInfo.marks >= 60 && studentInfo.marks <=79) {
            studentInfo.grade = 'B'
        } else if(studentInfo.marks >= 40 && studentInfo.marks <=59) {
            studentInfo.grade = 'C'
        } else if(studentInfo.marks < 40) {
            studentInfo.grade = 'FAIL'
        }
    })

    return students
}

test('Student grade calculator test case', () => {

    const students = [
        {name: 'Rohit', marks: 81},
        {name: 'Raghav', marks: 61},
        {name: 'Ramesh', marks: 41},
        {name: 'Ritesh', marks: 39}
    ]

    const resultOfStudents = calculateGrades(students)

    //console output
    resultOfStudents.forEach((studentInfo) => {
        console.log("Student name: ", studentInfo.name, " " , "Student marks: ", studentInfo.marks , " ", "Student grade: ", studentInfo.grade)
    })

    //Usage of strict equality 
    expect(resultOfStudents[0].grade).toBe('A')
    expect(resultOfStudents[1].grade).toBe('B')
    expect(resultOfStudents[2].grade).toBe('C')
    expect(resultOfStudents[3].grade).toBe('FAIL')
})