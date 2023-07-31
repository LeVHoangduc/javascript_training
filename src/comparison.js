/* == and !== example          */

0 == false; // true (because both are coerced to numbers, and 0 is considered falsy)
null == undefined; // true (both are considered equal in loose equality)
"" == false; // true (empty string is considered falsy)
1 == true; // true (true is coerced to 1)

/* End == and !== example      */

/* === and !=== example        */

// The operator checks for both value and type equality

0 === false; // false (because the value is different)
null === undefined; // false (similiar)
"" === false; // false (similiar)
1 === true; // false (similiar)

/* === and !=== example        */
