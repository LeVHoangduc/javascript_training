import Error from "./errorView";
import { DEFAULT_VALUES } from "../constants/constants";

class OverlayView {
  constructor() {
    this.error = new Error();

    this.overlayEl = document.querySelector(".overlay");
    this.cardFormEl = document.querySelector(".modal-card");
    this.detailFormEl = document.querySelector(".modal-detail");
    this.formLanguageEL = document.querySelector(".modal-language");
    this.confirmFormEl = document.querySelector(".modal-confirm");
  }

  //----- EVENT LISTENER -----//

  addEventClickOutSide = () => {
    this.overlayEl.addEventListener("click", () => {
      this.resetForm();
      this.closeForm();
    });
  };

  //----- METHOD -----//

  closeForm = () => {
    this.cardFormEl.classList.remove("open");
    this.overlayEl.classList.remove("open");
    this.detailFormEl.classList.remove("open");
    this.formLanguageEL.classList.remove("open");
    this.confirmFormEl.classList.remove("open");
  };

  resetForm = () => {
    const inputs = document.querySelectorAll(".modal-card__input");

    inputs.forEach((input) => {
      const errorEl = input.nextElementSibling;

      this.error.clearError(input, errorEl);
    });

    const inputLanguageEl = document.querySelector(".modal-language__input");
    const errorLanguageEl = inputLanguageEl.nextElementSibling;

    this.error.clearError(inputLanguageEl, errorLanguageEl);

    this.cardFormEl.word.value = DEFAULT_VALUES.EMPTY_STRING;
    this.cardFormEl.type.value = DEFAULT_VALUES.EMPTY_STRING;
    this.cardFormEl.meaning.value = DEFAULT_VALUES.EMPTY_STRING;
    this.cardFormEl.description.value = DEFAULT_VALUES.EMPTY_STRING;
    this.cardFormEl.captionPhoto.value = DEFAULT_VALUES.EMPTY_STRING;
  };
}

export default OverlayView;
