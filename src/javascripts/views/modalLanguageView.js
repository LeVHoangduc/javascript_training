import { FORM_TYPES, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../constants/constants";
import ValidationService from "../services/validationService";
import Error from "./errorView";

class ModalLanguageView {
  constructor() {
    this.validationService = new ValidationService();
    this.error = new Error();

    this.btnAddLanguage = document.querySelector(".language__add");
    // this is modal language for show form language
    this.formLanguageEL = document.querySelector(".modal-language");
  }

  // ---- EVENT LISTENER ---- //

  addEventOpenFormListener = () => {
    this.btnAddLanguage.addEventListener("click", (e) => {
      e.preventDefault();
      this.formLanguageEL.classList.add("open");
    });
  };

  /**
   * Method to add an event listeners for saving and canceling the language form.
   * @param {Function} saveLanguage - The function to save the language data.
   * @param {Function} updateLanguageView - The function to update the language view.
   */
  addEventAddLanguage = (saveLanguage, updateLanguageView) => {
    const btnSave = this.formLanguageEL.btnSave;
    const btnCancel = this.formLanguageEL.btnCancel;
    btnSave.addEventListener("click", async (e) => {
      e.preventDefault();

      const languageData = {
        language: this.formLanguageEL.language.value,
      };

      // Return a field result of check with regex
      const inputCheck = this.validationService.formValidator(
        FORM_TYPES.language,
        this.formLanguageEL
      );

      // Show error or pass in UI and performs save()
      const isValidation = this.isValidation(inputCheck);

      if (isValidation) {
        const isAddSuccess = await saveLanguage(languageData);

        isAddSuccess ? alert(SUCCESS_MESSAGE.ADD_LANGUAGE) : alert(ERROR_MESSAGE.ADD_LANGUAGE);

        this.closeForm();
        updateLanguageView();
      } else alert(ERROR_MESSAGE.INVALID_INFORMATION);
    });

    btnCancel.addEventListener("click", () => {
      this.closeForm();
    });
  };

  // ---- METHOD ----- //

  closeForm = () => {
    this.formLanguageEL.classList.remove("open");
  };

  /**
   * Method to check validation on UI
   * @param {Object} inputs - Input object lists to show/remove errors on the UI
   * input{
   *  field: "language"
   *  isValid: true
   *  success: "Add language successfully"
   * }
   * @returns {Boolean} Whether the form is validated or not.
   */
  isValidation = (inputs) => {
    let isValid = true;

    inputs.forEach((input) => {
      const inputEl = this.formLanguageEL[input.field];
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

export default ModalLanguageView;
