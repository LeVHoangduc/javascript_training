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

  init = () => {
    this.addOpenModalListener();
    this.addCloseModalListener();
  };

  addOpenModalListener = () => {
    this.cardListEl.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (card) {
        // TODO: get card detail
        this.detailFormEl.setAttribute("data-id", card.getAttribute("data-id"));
        this.meaning.textContent = `${card.meaning}`;
        this.description.textContent = `${card.description}`;
        this.descriptionPhoto.src = `${card.descriptionPhoto}`;
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

  //----- EVENT HANDLER -----//

  /**
   * Method to add an event listener to the delete button.
   * @param {Callback} deleteCard - The deleteCard function to pass for confirming deletion.
   */
  addEventDelete = (deleteCard) => {
    this.detailFormEl.btnDelete.addEventListener("click", (e) => {
      e.preventDefault();

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
      // send id to database
      let id = this.detailFormEl.getAttribute("data-id");
      if (id) {
        deleteCard(id);
      }
      this.modalConfirmEl.classList.remove("open");
      this.detailFormEl.classList.remove("open");
      this.detailFormEl.removeAttribute("data-id");
    });

    this.modalConfirmEl.cancel.addEventListener("click", () => {
      this.modalConfirmEl.classList.remove("open");
    });
  };

  addEventEdit = (getCardDetail) => {
    this.detailFormEl.btnEdit?.addEventListener("click", async (e) => {
      e.preventDefault();
      this.cardFormEl = document.querySelector(".modal-card");
      this.cardFormEl.classList.add("open");
      const cardID = this.detailFormEl.getAttribute("data-id");
      // get card by ID for show data in form edit
      const getCardID = await getCardDetail(cardID);

      // load data current to form
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
