import User from "./user";
import Card from "./card";

class Model {
  constructor() {
    this.user = new User();
    this.card = new Card();
  }
}

export default Model;
