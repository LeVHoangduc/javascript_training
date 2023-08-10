import Error from "./error";

class Helpers {
  constructor() {
    this.error = new Error();
  }
}

export const helpers = new Helpers();
