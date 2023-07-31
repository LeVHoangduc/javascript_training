/*  Example var and let  */

// Using var
var globalVar = "I am a global variable declared with var";

// Using let
function printVariables() {
  // Inside the function, both variables are accessible.
  console.log(globalVar);
  if (true) {
    let localLet = "I am a local variable declared with let";
    console.log(localLet);
  }
}

// Calling the function to print the variables
printVariables();

// Attempting to access the variables outside the function
console.log(globalVar); // This will work, as globalVar is attached to the global object (window in the browser).
console.log(localLet); // This will result in an error, as localLet is not attached to the global object.

/* End example var and let */

/* Example const           */

const a = 1;

// Get an error: TypeError: Assignment to constant variable.
a = 2;

// But if you point to an objet or array, you will be change the value as example below
const array = [1, 2, 3, 4];

// Get an error, because you are reassigning the address of array
array = [4, 3, 2, 1];

console.log("before change value", array);

// Try to reassign a new value
array[0] = 4;

// It will be change value
console.log("After change value", array);

/* End example const       */

/* Note to variables       */

let b = 1;
// get a "duplicate declaration" error
// let b = 2;

/* End note to variables   */
