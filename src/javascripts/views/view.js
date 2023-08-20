import LoginView from "./loginView";
import LanguageView from "./languageView";
import CardView from "./cardView";
import ModalLanguageView from "./modalLanguageView";
import ModalConfirmView from "./modalConfirmView";
import ModalCardView from "./modalCardView";
import ModalDetailView from "./modalDetailView";
import ToastView from "./toastView";

class View {
  constructor() {
    this.loginView = new LoginView();
    this.languageView = new LanguageView();
    this.cardView = new CardView();
    this.modalLanguageView = new ModalLanguageView();
    this.modalDetailView = new ModalDetailView();
    this.modalConfirm = new ModalConfirmView();
    this.modalCardView = new ModalCardView();
    this.toastView = new ToastView();
  }
}

export default View;
