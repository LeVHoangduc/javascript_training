/* Declare an array example           */
const array = [1, 2, 3];
const a = Array.of(1, 2, 3);
/* End declaring an array example     */

/* Array method example               */

// find()
const users = [
  { id: 1, name: "Alice", age: 32 },
  { id: 2, name: "Bob", age: 35 },
  { id: 3, name: "Charlie", age: 28 },
  { id: 4, name: "David", age: 25 },
];

// Find all users with age between 25 and 30 and return their names and IDs
// user: The current user object being processed in the array.
// index: The index of the current user in the array.
// array: The original array
const results = users.find((user, index, array) => {
  console.log(`Checking user at index ${index}:`, user);
  //   console.log(array);
  return user.age >= 25 && user.age <= 30;
});

console.log("Results:", results);

// includes()

// array.includes(value)
// array.includes(value,position)

const arrayB = [1, 2, 3];

console.log(arrayB.includes(2));
// it returns true
console.log(arrayB.includes(2, 0));
// it returns false
console.log(arrayB.includes(2, 1));
// it returns true

// findIndex()
const index = arrayB.findIndex(2);

// filter()
const filter = arrayB.filter((element) => {
  return element >= 2;
});

// forEach()
arrayB.forEach((element, index, arr) => {
  arr[index] = element + 2;
});

// map()
const map = arrayB.map((element, index, arr) => {
  return (arr[index] = element + 2);
});

/* End array method example           */
