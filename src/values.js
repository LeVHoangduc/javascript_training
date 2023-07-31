/* Truthy & Falsy example          */

// [], {}, Infinity, -Infinity is truthy value
if ({}) return "dog";
// null, undefined, false, NaN, 0, -0, 0n, “ ”, document.all is falsy value
0 && "dog";

/* End truthy & Falsy example      */

/* Type coercion example           */

let a = 5;
let b = "Louis";
// If have a string + a number ⇒ The result of type conversion is string
console.log(a + b);

/* End type coercion example       */
