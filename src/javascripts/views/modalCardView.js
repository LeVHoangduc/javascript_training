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
      btnSaveEl: formEl.btnSave,
      btnCancelEl: formEl.btnCancel,
    };
  }

  //----- EVENT HANDLER -----//
  /**
   * Method to add an event listener for form submission.
   * @param {Promise<Boolean>} saveCard - Promise indicating successful card addition.
   * @param {Callback} loadCards - Renders cards after successful addition.
   */
  addEventSubmission = (saveCard, loadCards) => {
    this.cardFormEl.formEl?.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Prepare card data for submission
      const cardData = {
        id: this.cardFormEl.formEl.getAttribute("data-id"),
        language: this.cardFormEl.formEl.language.value,
        word: this.cardFormEl.formEl.word.value,
        type: this.cardFormEl.formEl.type.value,
        meaning: this.cardFormEl.formEl.meaning.value,
        description: this.cardFormEl.formEl.description.value,
        descriptionPhoto: this.cardFormEl.formEl.descriptionPhoto.value,
      };

      // Validate form inputs
      const inputCheck = this.validationService.formValidator(
        FORM_TYPES.card,
        this.cardFormEl.formEl
      );
      const isValidation = this.isValidation(inputCheck);

      if (isValidation) {
        const isSaveSuccess = await saveCard(cardData);

        if (isSaveSuccess) loadCards(cardData.language);
        this.closeForm();
      }
    });
  };

  addEventOpenFormListener = () => {
    this.cardFormEl.btnAddEl?.addEventListener("click", () => {
      this.cardFormEl.formEl.classList.add("open");
    });
  };

  addEventCloseFormListener = () => {
    this.cardFormEl.btnCancelEl?.addEventListener("click", () => {
      this.cardFormEl.formEl.classList.remove("open");
    });
  };

  //----- METHOD -----//

  closeForm = () => {
    this.cardFormEl.formEl.classList.remove("open");
  };

  /**
   * Method to check validation on UI
   * @param {Array} inputs Array of input object lists to show/remove errors on the UI
   * input[{
   * field: 'word',
   * isValid: false,
   * message: 'The content is required' ,
   * },]
   * @returns {Boolean} form is validated
   */
  isValidation = (inputs) => {
    let isValid = true;
    inputs.forEach((input) => {
      const inputEl = this.cardFormEl.formEl[input.field];
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
