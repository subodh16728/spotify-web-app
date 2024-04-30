const a = "Subodh"

const person = {
    name: "Subodh",
    Subodh: "hi"
}

console.log(person[a])      //this is similar to person.subodh
console.log(person.Subodh)

console.log("Person: ", person.name)
const person2 = {
    "person.name": person.name
}

console.log("Person: ", person2["person.name"])