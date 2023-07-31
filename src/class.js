/* Class example           */
class Person {
  constructor(name) {
    this.name = name;
  }

  hello() {
    return "Hello, I am " + this.name + ".";
  }
}

const flavio = new Person("flavio");
flavio.name;
flavio.hello();
/* End class example       */
