import { SUCCESS_MESSAGE } from "../constants/constants";

class ModalConfirm {
  constructor() {
    this.confirmFormEl = document.querySelector(".modal-confirm");
    this.btnCancelEl = this.confirmFormEl?.cancel;

    this.overlayEl = document.querySelector(".overlay");
  }

  /**
   * Adds event listeners for the confirmation modal.
   * @param {Function} deleteCard - Function to delete a card.
   * @param {Function} deleteLanguage - Function to delete a language.
   * @param {Function} updateLanguageView - Function to update the language view.
   * @param {Function} updatePage - Function to update the page.
   */
  addEventConfirm = (deleteCard, deleteLanguage, updateLanguageView, updatePage, toast) => {
    this.confirmFormEl.addEventListener("submit", async (e) => {
      e.preventDefault();

      let id = this.confirmFormEl.getAttribute("data-id");
      let type = this.confirmFormEl.getAttribute("type");

      // send id to database
      if (type === "language") {
        await deleteLanguage(id);

        updateLanguageView();
      } else {
        await deleteCard(id);

        updatePage();
      }

      this.closeForm();
    });

    this.btnCancelEl.addEventListener("click", () => {
      this.closeForm();
    });
  };

  // ---- METHOD ---- //

  closeForm = () => {
    this.confirmFormEl.classList.remove("open");
    this.confirmFormEl.removeAttribute("data-id");
    this.confirmFormEl.removeAttribute("type");

    this.overlayEl.classList.remove("open");
  };
}

export default ModalConfirm;
