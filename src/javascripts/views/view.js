import LoginView from "./loginView";
import LogoutView from "./logoutView";
import LanguageView from "./languageView";
import CardView from "./cardView";
import ModalLanguageView from "./modalLanguageView";
import ModalConfirmView from "./modalConfirmView";
import ModalCardView from "./modalCardView";
import ModalDetailView from "./modalDetailView";
import ToastView from "./toastView";
import OverlayView from "./overlayView";

class View {
  constructor() {
    this.loginView = new LoginView();
    this.logoutView = new LogoutView();
    this.languageView = new LanguageView();
    this.cardView = new CardView();
    this.modalLanguageView = new ModalLanguageView();
    this.modalDetailView = new ModalDetailView();
    this.modalConfirm = new ModalConfirmView();
    this.modalCardView = new ModalCardView();
    this.toastView = new ToastView();
    this.overlayView = new OverlayView();
  }
}

export default View;
