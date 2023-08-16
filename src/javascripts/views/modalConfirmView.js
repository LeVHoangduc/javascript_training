import { SUCCESS_MESSAGE } from "../constants/constants";

class ModalConfirm {
  constructor() {
    this.confirmFormEl = document.querySelector(".modal-confirm");
    this.btnCancelEl = this.confirmFormEl?.cancel;
  }

  /**
   * Adds event listeners for the confirmation modal.
   * @param {Function} deleteCard - Function to delete a card.
   * @param {Function} deleteLanguage - Function to delete a language.
   * @param {Function} updateLanguageView - Function to update the language view.
   * @param {Function} updatePage - Function to update the page.
   */
  addEventConfirm = (deleteCard, deleteLanguage, updateLanguageView, updatePage) => {
    this.confirmFormEl.addEventListener("submit", async (e) => {
      e.preventDefault();

      let id = this.confirmFormEl.getAttribute("data-id");
      let type = this.confirmFormEl.getAttribute("type");

      // send id to database
      if (type === "language") {
        await deleteLanguage(id);
        updateLanguageView();
        alert(SUCCESS_MESSAGE.DELETE_LANGUAGE);
      } else {
        await deleteCard(id);
        updatePage();
        alert(SUCCESS_MESSAGE.DELETE_CARD);
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
  };
}

export default ModalConfirm;
