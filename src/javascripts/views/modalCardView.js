import { FORM_TYPES, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../constants/constants";
import ValidationService from "../services/validationService";
import Error from "./errorView";

class ModalCardView {
  constructor() {
    this.validationService = new ValidationService();
    this.error = new Error();

    this.cardFormEl = {
      formEl: document.querySelector(".modal-card"),
      btnAddEl: document.querySelector(".cards_add"),
      btnSave: formEl.btnSave,
      btnCancel: formEl.btnCancel,
    };

    this.openModal();
    this.closeModal();
  }

  //----- EVENT HANDLER -----//

  /**
   * Method to add an event listener for form submission.
   * @param {Promise<Boolean>} saveCard - Promise indicating successful card addition.
   * @param {Callback} loadCards - Renders cards after successful addition.
   */
  addEventSubmission = (saveCard, loadCards) => {
    this.btnSaveEl?.addEventListener("click", async (e) => {
      e.preventDefault();

      const isEdit = this.cardFormEl.getAttribute("data-id");
      // Prepare card data for submission
      const cardData = {
        ...(isEdit ? { id: isEdit } : {}),
        word: this.addFormEl.word.value,
        type: this.addFormEl.type.value,
        meaning: this.addFormEl.meaning.value,
        description: this.addFormEl.description.value,
        descriptionPhoto: this.addFormEl.descriptionPhoto.value,
      };

      // Validate form inputs
      const inputCheck = this.validationService.formValidator(FORM_TYPES.card, this.addFormEl);
      const isValidation = this.isValidation(inputCheck);

      // Handle validation result
      if (isValidation) {
        try {
          const isAddSuccess = await saveCard(cardData);
          if (isAddSuccess) {
            isEdit ? alert(SUCCESS_MESSAGE.ADD_LANGUAGE) : alert(SUCCESS_MESSAGE.ADD_CARD);
            loadCards(cardCurrent.language);
          } else alert(ERROR_MESSAGE.ADD_CARD);
          this.closeModal();
        } catch (error) {
          alert(ERROR_MESSAGE.SERVER_ERROR);
        }
      } else alert(ERROR_MESSAGE.INVALID_INFORMATION);
    });
  };

  //----- METHOD -----//
  openModal = () => {
    this.btnAddEl?.addEventListener("click", () => {
      this.addFormEl.classList.add("open");
    });
  };

  closeModal = () => {
    this.addFormEl.classList.remove("open");
  };

  /**
   * Method to check validation on UI
   * @param {Array} inputs Array of input object lists to show/remove errors on the UI
   * inputs[
   * word: Hello,
   * type: noun,
   * meaning: Xin Chào ,
   * description: Lời chào lịch sự,
   * descriptionPhoto: https://bom.so/hoY25O,
   * ]
   * @returns {Boolean} form is validated
   */
  isValidation = (inputs) => {
    let isValid = true;
    inputs.forEach((input) => {
      const inputEl = this.addFormEl[input.field];
      const errorEl = inputEl.nextElementSibling;
      if (input.isValid) {
        this.error.clearError(inputEl, errorEl);
      } else {
        this.error.showError(inputEl, errorEl, input.message);
        isValid = false;
      }
    });
    return isValid;
  };
}

export default ModalCardView;
