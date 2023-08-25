import { DATA_SOURCES, DEFAULT_VALUES } from "../constants/constants";
import ValidationForm from "../validation/validationForm";
import Error from "./errorView";

class ModalLanguageView {
  constructor() {
    this.validationForm = new ValidationForm();
    this.error = new Error();

    this.btnAddLanguage = document.querySelector(".language__add");
    this.formLanguageEL = document.querySelector(".modal-language");

    this.overlayEl = document.querySelector(".overlay");
  }

  // ---- EVENT LISTENER ---- //

  addEventOpenFormListener = () => {
    this.btnAddLanguage.addEventListener("click", (e) => {
      e.preventDefault();
      this.formLanguageEL.classList.add("open");
      this.overlayEl.classList.add("open");
    });
  };

  /**
   * Method to add an event listeners for saving and canceling the language form.
   * @param {Function} saveLanguage - The function to save the language data.
   * @param {Function} loadLanguages - The function to update the language view.
   */
  addEventAddLanguage = (saveLanguage, loadLanguages) => {
    const btnSave = this.formLanguageEL.btnSave;
    const btnCancel = this.formLanguageEL.btnCancel;

    btnSave.addEventListener("click", async (e) => {
      e.preventDefault();

      const languageData = {
        language: this.formLanguageEL.language.value.toLowerCase(),
      };

      // Return a field result of check with regex
      const inputCheck = this.validationForm.formValidator(
        DATA_SOURCES.LANGUAGE,
        this.formLanguageEL
      );

      // Show error or pass in UI and performs save()
      const isValidation = this.isValidation(inputCheck);

      if (isValidation) {
        await saveLanguage(languageData);

        this.resetForm();
        this.closeForm();

        loadLanguages();
      }
    });

    btnCancel.addEventListener("click", () => {
      this.resetForm();
      this.closeForm();
    });
  };

  // ---- METHOD ----- //

  resetForm = () => {
    const inputLanguageEl = this.formLanguageEL.language;
    const errorLanguageEl = inputLanguageEl.nextElementSibling;

    this.error.clearError(inputLanguageEl, errorLanguageEl);
    this.formLanguageEL.language.value = DEFAULT_VALUES.EMPTY_STRING;
  };

  closeForm = () => {
    this.formLanguageEL.classList.remove("open");
    this.overlayEl.classList.remove("open");
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

      if (input.isValid) this.error.clearError(inputEl, errorEl);
      else {
        this.error.showError(inputEl, errorEl, input.message);
        isValid = false;
      }
    });

    return isValid;
  };
}

export default ModalLanguageView;
