import User from "./user";
import Card from "./card";
import Language from "./language";

class Model {
  constructor() {
    this.user = new User();
    this.language = new Language();
    this.card = new Card();
  }
}

export default Model;
