/* Object example                     */
// Objects are always passed by reference
const moto = {
  color: "blue",
};
const anotherMoto = moto;
anotherMoto.color = "yellow";
moto.color; //'yellow'
/*                                    */

/* Object methods example             */
const car = {
  brand: "Ford",
  model: "Fiesta",
  start: function () {
    console.log("Started");
  },
};

car.start();
/* End Object methods example         */
