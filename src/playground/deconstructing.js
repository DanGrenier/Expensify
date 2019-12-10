// const person = {
//     name: "Daniel",
//     age: 42,
//     location: {
//         city: "Athens",
//         temp: 88
//     }
// };

// const {name,age} = person;

// console.log(`${name} is ${age}`);

// const {city,temp} = person.location;

// if (city && temp) {
//     console.log(`It's ${temp} in ${city}`);
// }

// const book = {
//     title: 'Ego is the enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const{name:publisherName = "self-published"} = book.publisher;


// console.log(publisherName);  //should be penguin, otherwise self-published

const address = ['1234 some street', 'Athens', 'Georgia','30606'];
const [street,city,state,zip] = address;

console.log(`You are in ${city} ${state}`)

const item = ["Coffee (hot)", "$2.00" , "$2.50", "$2.75"];

const [description, ,medium] = item;

console.log(`A medium ${description} costs ${medium}`);

