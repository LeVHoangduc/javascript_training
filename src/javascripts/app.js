import View from "./views/view";
import Model from "./models/model";
import Controller from "./controllers/controller";

export class App {
  constructor() {}

  /**
   * Starts the app by initializing and triggering the controller's setup.
   */
  start() {
    const controller = new Controller(new Model(), new View());
    controller.init();
  }
}
