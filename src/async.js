/* Async & await example            */

// Use Promise
const getNumber = () => {
  return new Promise.resolve("success");
};

getNumber().then((data) => console.log(data));

// Use async & await
const getNumberTwo = async () => {
  return "success";
};
// Because async() will be put the anything of return to a promise
// So we can use then()
getNumberTwo().then((data) => console.log(data));

const listNumber = async () => {
  const firstNumber = await getNumberTwo();
  return firstNumber;
};

listNumber().then((data) => console.log(data));

/* End async & await example        */
