class ModalDetailView {
  constructor() {
    this.modalFormEL = document.querySelector(".modal-detail");
    this.modalConfirmEl = document.querySelector(".modal-confirm");

    this.meaning = document.querySelector(".modal-detail__meaning");
    this.description = document.querySelector(".modal-detail__description");
    this.descriptionPhoto = document.querySelector(".modal-detail__picture");

    this.btnClose = document.querySelector(".modal-detail__close");
    this.btnDelete = document.querySelector(".modal-detail__button__delete");
    this.btnEdit = document.querySelector(".modal-detail__button__edit");
  }

  /**
   * Initialize the ModalDetailView with data.
   * @param {Array} data - The list of card data.
   */
  init = (data) => {
    this.cardEl = document.querySelectorAll(".card");
    this.cardList = data;

    this.openModal();
    this.closeModal();
  };

  openModal = () => {
    this.cardEl.forEach((card) => {
      card.addEventListener("click", () => {
        const cardCurrent = this.cardList.find(
          (cardItem) => cardItem.id === card.getAttribute("data-id")
        );
        this.modalFormEL.setAttribute("data-id", cardCurrent.id);
        this.meaning.textContent = `${cardCurrent.meaning}`;
        this.description.textContent = `${cardCurrent.description}`;
        this.descriptionPhoto.src = `${cardCurrent.descriptionPhoto}`;
        this.modalFormEL.classList.add("open");
      });
    });
  };

  closeModal = () => {
    this.btnClose.addEventListener("click", (e) => {
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
    this.btnDelete.addEventListener("click", (e) => {
      e.preventDefault();
      this.confirmDelete(deleteCard);
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
      let id = this.modalFormEL.getAttribute("data-id");
      if (id) {
        deleteCard(id);
      }
      this.modalConfirmEl.classList.remove("open");
      this.modalFormEL.classList.remove("open");
      this.modalFormEL.removeAttribute("data-id");
    });
    this.modalConfirmEl.cancel.addEventListener("click", () => {
      this.modalConfirmEl.classList.remove("open");
    });
  };
}

export default ModalDetailView;
