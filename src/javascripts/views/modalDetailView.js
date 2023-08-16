import Error from "./errorView";
class ModalDetailView {
  constructor() {
    this.error = new Error();

    this.detailFormEl = document.querySelector(".modal-detail");
    this.modalConfirmEl = document.querySelector(".modal-confirm");

    this.meaning = document.querySelector(".modal-detail__meaning");
    this.description = document.querySelector(".modal-detail__description");
    this.descriptionPhoto = document.querySelector(".modal-detail__picture");

    this.cardListEl = document.querySelector(".card__list");
  }

  //----- EVENT HANDLER -----//
  /**
   * Method
   * @param {Promise<Object>} getCardDetail
   */
  addOpenModalListener = (getCardDetail) => {
    this.cardListEl.addEventListener("click", async (e) => {
      const cardEl = e.target.closest(".card");
      if (cardEl) {
        // get card
        const cardData = await getCardDetail(cardEl.getAttribute("data-id"));
        // set data-id for form confirm delete
        this.confirmFormEl.setAttribute("data-id", cardData.id);
        // set data-id for form edit
        this.detailFormEl.setAttribute("data-id", cardData.id);
        this.meaning.textContent = `${cardData.meaning}`;
        this.description.textContent = `${cardData.description}`;
        this.descriptionPhoto.src = `${cardData.descriptionPhoto}`;
        this.detailFormEl.classList.add("open");
      }
    });
  };

  addCloseModalListener = () => {
    this.detailFormEl.btnClose.addEventListener("click", (e) => {
      e.preventDefault();
      this.modalFormEL.classList.remove("open");
      this.modalFormEL.removeAttribute("data-id");
    });
  };

  /**
   * Method to add an event listener to the delete button.
   * @param {Callback} deleteCard - The deleteCard function to pass for confirming deletion.
   */
  addEventDeleteListener = (deleteCard) => {
    this.detailFormEl.btnDelete.addEventListener("click", (e) => {
      e.preventDefault();

      // Confirm and handle card deletion.
      this.confirmDeleteCard(deleteCard);
    });
  };

  /**
   * Method to display confirmation modal for card deletion.
   * @param {Callback} deleteCard - The deleteCard function to call when confirmed.
   */
  confirmDelete = (deleteCard) => {
    this.modalConfirmEl.classList.add("open");

    this.modalConfirmEl.delete.addEventListener("click", () => {
      let id = this.detailFormEl.getAttribute("data-id");

      // Call the deleteCard function with the card ID.
      if (id) deleteCard(id);

      // Close the confirmation modal and reset detail form state.
      this.modalConfirmEl.classList.remove("open");
      this.detailFormEl.classList.remove("open");
      this.detailFormEl.removeAttribute("data-id");
    });

    // Event listener for canceling the delete action.
    this.modalConfirmEl.cancel.addEventListener("click", () => {
      this.modalConfirmEl.classList.remove("open");
    });
  };

  /**
   * Method to add an event listener for the edit button.
   * @param {Promise<Object>} getCardDetail - Function to fetch card details.
   */
  addEventEditListener = (getCardDetail) => {
    this.detailFormEl.btnEdit?.addEventListener("click", async (e) => {
      e.preventDefault();

      // Show the edit modal.
      this.cardFormEl = document.querySelector(".modal-card");
      this.cardFormEl.classList.add("open");

      const cardID = this.detailFormEl.getAttribute("data-id");

      // Fetch card details for editing.
      const getCardID = await getCardDetail(cardID);

      // Load current data into the edit form.
      this.handleEdit(cardID, getCardID);
      this.detailFormEl.classList.remove("open");
    });
  };

  /**
   * Handle the editing of a card's details.
   * @param {string} cardId - The ID of the card being edited.
   * @param {Object} card - The card object containing details to populate the form with.
   */
  handleEdit = (cardId, card) => {
    // Set data-id attribute to link modal-card with modal-detail
    this.cardFormEl.setAttribute("data-id", cardId);

    // Populate form fields with card details
    this.cardFormEl.language.value = card.language;
    this.cardFormEl.word.value = card.word;
    this.cardFormEl.type.value = card.type;
    this.cardFormEl.meaning.value = card.meaning;
    this.cardFormEl.description.value = card.description;
    this.cardFormEl.descriptionPhoto.value = card.descriptionPhoto;
  };
}

export default ModalDetailView;
