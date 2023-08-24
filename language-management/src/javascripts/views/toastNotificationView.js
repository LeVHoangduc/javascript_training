import { utilities } from "../helpers/utilities";

class ToastNotificationView {
  constructor() {
    this.toastEl = document.querySelector(".toast");
    this.toastIconEl = document.querySelector(".toast__icon");
    this.toastMessageEl = document.querySelector(".toast__message");
  }

  /**
   * Display a toast message with a specific state and message.
   * @param {string} state - The state of the toast ('success', 'error')
   * @param {string} message - The message content to be displayed in the toast
   */
  showToastNotification = async (state, message) => {
    this.toastEl.classList.add(`toast--${state}`);
    this.toastMessageEl.innerText = message;

    await utilities.toastDelay(2000);
    this.toastEl.classList.remove(`toast--${state}`);
  };
}

export default ToastNotificationView;
