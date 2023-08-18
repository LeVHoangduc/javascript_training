import { FORM_TYPES, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../constants/constants";
import ValidationService from "../services/validationService";
import Error from "./errorView";

class ModalCardView {
  constructor() {
    this.validationService = new ValidationService();
    this.error = new Error();

    this.cardFormEl = document.querySelector(".modal-card");
    this.btnAddEl = document.querySelector(".cards__add");
    this.btnCancelEl = document.querySelector(".modal-card__cancel");
  }

  //----- EVENT HANDLER -----//
  /**
   * Method to add an event listener for form submission.
   * @param {Promise<Boolean>} saveCard - Promise indicating successful card addition.
   * @param {Callback} loadCards - Renders cards after successful addition.
   */
  addEventSubmission = (saveCard, loadCards) => {
    this.cardFormEl?.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Prepare card data for submission
      const cardData = {
        id: this.cardFormEl.getAttribute("data-id"),
        language: this.cardFormEl.language.value,
        word: this.cardFormEl.word.value,
        type: this.cardFormEl.type.value,
        meaning: this.cardFormEl.meaning.value,
        description: this.cardFormEl.description.value,
        descriptionPhoto: this.cardFormEl.descriptionPhoto.value,
      };

      // Validate form inputs
      const inputCheck = this.validationService.formValidator(FORM_TYPES.card, this.cardFormEl);

      const isValidation = this.isValidation(inputCheck);

      if (isValidation) {
        const isSaveSuccess = await saveCard(cardData);

        if (isSaveSuccess) {
          loadCards(cardData.language);
          alert(SUCCESS_MESSAGE.ADD_CARD);
        }
        this.closeForm();
      }
    });
  };

  addEventOpenFormListener = () => {
    this.btnAddEl.addEventListener("click", () => {
      this.cardFormEl.classList.add("open");
    });
  };

  addEventCloseFormListener = () => {
    this.btnCancelEl?.addEventListener("click", () => {
      this.closeForm();
    });
  };

  //----- METHOD -----//

  closeForm = () => {
    this.cardFormEl.classList.remove("open");
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
      const inputEl = this.cardFormEl[input.field];
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
