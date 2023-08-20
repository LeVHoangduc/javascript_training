import Error from "./errorView";

class OverlayView {
  constructor() {
    this.error = new Error();

    this.overlayEl = document.querySelector(".overlay");
    this.cardFormEl = document.querySelector(".modal-card");
    this.detailFormEl = document.querySelector(".modal-detail");
    this.formLanguageEL = document.querySelector(".modal-language");
    this.confirmFormEl = document.querySelector(".modal-confirm");
  }

  //----- EVENT HANDLER -----//

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

    this.cardFormEl.word.value = "";
    this.cardFormEl.type.value = "";
    this.cardFormEl.meaning.value = "";
    this.cardFormEl.description.value = "";
    this.cardFormEl.captionPhoto.value = "";
  };
}

export default OverlayView;
