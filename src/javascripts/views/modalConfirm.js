import { SUCCESS_MESSAGE } from "../constants/constants";

class ModalConfirm {
  constructor() {
    this.confirmFormEl = document.querySelector(".modal-confirm");
    this.btnCancelEl = this.confirmFormEl?.cancel;
  }

  /**
   * Adds event listeners for the confirmation modal.
   * @param {Callback} deleteCard - Function to delete a card.
   * @param {Callback} deleteLanguage - Function to delete a language.
   * @param {Callback} updateLanguageView - Function to update the language view.
   * @param {Callback} updatePage - Function to update the page.
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

      this.confirmFormEl.classList.remove("open");
    });

    this.btnCancelEl.addEventListener("click", () => {
      this.confirmFormEl.classList.remove("open");
    });
  };
}

export default ModalConfirm;
