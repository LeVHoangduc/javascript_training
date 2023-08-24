import Template from "../templates/templates";
import { DEFAULT_VALUES } from "../constants/constants";

class Error {
  constructor() {
    this.cardListEl = document.querySelector(".card__list");
  }

  /**
   * Method to show an error message for a specific input element.
   * @param {HTMLElement} inputEl - The input element linked to the error.
   * @param {HTMLElement} errorEl - The element to show the error message.
   * @param {String} message - The error message to be shown.
   */
  showError(inputEl, errorEl, message) {
    inputEl.classList.add("error");
    errorEl.textContent = message;
    errorEl.classList.add("active");
  }

  /**
   * Method to clear the error message and reset the UI of the input element.
   * @param {HTMLElement} inputEl - The input element linked to the error.
   * @param {HTMLElement} errorEl - The element is showing the error message.
   */
  clearError(inputEl, errorEl) {
    inputEl.classList.remove("error");
    errorEl.classList.remove("active");
  }

  showEmpty() {
    this.cardListEl.innerHTML = DEFAULT_VALUES.EMPTY_STRING;
    this.cardListEl.innerHTML += Template.renderEmpty();
  }
}

export default Error;
