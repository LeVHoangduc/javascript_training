import Error from "./errorView";

class ModalDetailView {
  constructor() {
    this.error = new Error();

    this.detailFormEl = document.querySelector(".modal-detail");
    this.btnFormDetailEl = {
      close: document.querySelector(".modal-detail__close"),
      delete: this.detailFormEl?.delete,
      edit: this.detailFormEl?.edit,
    };

    this.confirmFormEl = document.querySelector(".modal-confirm");

    this.meaning = document.querySelector(".modal-detail__meaning");
    this.description = document.querySelector(".modal-detail__description");
    this.descriptionPhoto = document.querySelector(".modal-detail__picture");

    this.cardListEl = document.querySelector(".card__list");

    this.overlayEl = document.querySelector(".overlay");
  }

  //----- EVENT HANDLER -----//

  /**
   * Method to add an event listener for opening the modal when a card is clicked.
   * @param {Promise<Object>} getCardDetail - Function to fetch card details.
   */
  addOpenDetailListener = (getCardDetail) => {
    this.cardListEl.addEventListener("click", async (e) => {
      const cardEl = e.target.closest(".card");
      if (cardEl) {
        // Get card data and populate the detail form.
        const cardData = await getCardDetail(cardEl.getAttribute("data-id"));

        this.confirmFormEl.setAttribute("data-id", cardData.id);

        // Populate data for form edit
        this.detailFormEl.setAttribute("data-id", cardData.id);
        this.meaning.textContent = `${cardData.meaning}`;
        this.description.textContent = `${cardData.description}`;
        this.descriptionPhoto.src = `${cardData.descriptionPhoto}`;
        this.detailFormEl.classList.add("open");

        this.overlayEl.classList.add("open");
      }
    });
  };

  addCloseDetailListener = () => {
    this.btnFormDetailEl.close.addEventListener("click", (e) => {
      e.preventDefault();
      this.detailFormEl.classList.remove("open");

      this.overlayEl.classList.remove("open");
      // this.detailFormEl.removeAttribute("data-id");
    });
  };

  /**
   * Method to add an event listener to the delete button.
   * @param {Callback} deleteCard - The deleteCard function to pass for confirming deletion.
   */
  addEventDeleteListener = (deleteCard) => {
    this.btnFormDetailEl.delete.addEventListener("click", (e) => {
      e.preventDefault();

      this.openConfirmDelete(deleteCard);
    });
  };

  /**
   * Method to add an event listener for the edit button.
   * @param {Promise<Object>} getCardDetail - Function to fetch card details.
   */
  addEventEditListener = (getCardDetail) => {
    this.btnFormDetailEl.edit?.addEventListener("click", async (e) => {
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

  //----- METHOD   -----//

  openConfirmDelete = () => {
    this.confirmFormEl.classList.add("open");
    this.detailFormEl.classList.remove("open");

    this.overlayEl.classList.remove("open");
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
    this.cardFormEl.captionPhoto.value = card.captionPhoto;
  };
}

export default ModalDetailView;
