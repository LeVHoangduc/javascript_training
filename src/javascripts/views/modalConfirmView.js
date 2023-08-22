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
   * @param {Function} updateLanguageView - Function to update the language view.
   * @param {Function} updatePage - Function to update the page.
   */
  addEventConfirm = (deleteCard, deleteLanguage, updateLanguageView, updatePage) => {
    this.confirmFormEl.addEventListener("submit", async (e) => {
      e.preventDefault();

      let id = this.confirmFormEl.getAttribute("data-id");
      let type = this.confirmFormEl.getAttribute("type");

      // Send id to database
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
