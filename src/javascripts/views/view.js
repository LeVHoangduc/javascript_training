import LoginView from "./loginView";
import ModalCardView from "./modalCardView";

class View {
  constructor() {
    this.loginView = new LoginView();
    this.modalCardView = new ModalCardView();
  }
}

export default View;
