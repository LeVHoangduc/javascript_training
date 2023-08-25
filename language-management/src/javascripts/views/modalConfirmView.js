import { DATA_SOURCES } from "../constants/constants";

class ModalConfirm {
  constructor() {
    this.confirmFormEl = document.querySelector(".modal-confirm");
    this.confirmMessageEl = document.querySelector(".modal-confirm__message");

    this.btnCancelEl = this.confirmFormEl?.cancel;

    this.overlayEl = document.querySelector(".overlay");
  }

  //----- EVENT LISTENER -----//

  /**
   * Adds event listeners for the confirmation modal.
   * @param {Function} deleteCard - Function to delete a card.
   * @param {Function} deleteLanguage - Function to delete a language.
   * @param {Function} loadLanguages - Function to update the language view.
   * @param {Function} loadCards - Function to update the card.
   */
  addEventConfirm = (deleteCard, deleteLanguage, loadLanguages, loadCards) => {
    this.confirmFormEl.addEventListener("submit", async (e) => {
      e.preventDefault();

      let id = this.confirmFormEl.getAttribute("data-id");
      let type = this.confirmFormEl.getAttribute("type");

      // Send id to database
      if (type === DATA_SOURCES.LANGUAGE) {
        await deleteLanguage(id);

        loadLanguages();
      } else {
        await deleteCard(id);

        loadCards();
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
