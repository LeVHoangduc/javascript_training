import { helpers } from "../helpers/helpers";

class ToastView {
  constructor() {
    this.toastEl = document.querySelector(".toast");
    this.toastIconEl = document.querySelector(".toast__icon");
    this.toastMessageEl = document.querySelector(".toast__message");
  }

  showToast = async (state, message) => {
    console.log("goi k");
    this.toastEl.classList.add(`toast--${state}`);
    this.toastMessageEl.innerText = message;

    await helpers.wait(2000);
    this.toastEl.classList.remove(`toast--${state}`);
  };
}

export default ToastView;
