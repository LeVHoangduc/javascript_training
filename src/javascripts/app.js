import View from "./views/view";
import Model from "./models/model";
import Controller from "./controllers/controller";

export class App {
  /**
   * Constructor off App object
   */
  constructor() {}

  /**
   * Function for starting the App
   */
  start() {
    const controller = new Controller(new Model(), new View());
    controller.init();
  }
}
