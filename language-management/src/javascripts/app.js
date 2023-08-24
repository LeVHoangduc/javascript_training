import View from "./views/view";
import Model from "./models/model";
import Controller from "./controllers/controller";

export class App {
  constructor() {}

  start() {
    const controller = new Controller(new Model(), new View());
    controller.initLogin();
    controller.initHome();
  }
}
