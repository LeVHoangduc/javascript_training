import { MESSAGE, REGEX } from "../constants/constants";

class ValidationService {
  constructor() {}

  /**
   * Method to validate form data
   * @param {String} validation
   * @param {Object} object
   * @returns
   */
  formValidatorCurrying = (validation) => (object) => {
    if (validation === "card") {
      const modalForm = document?.querySelector(".modal-add");
      const wordInput = modalForm.word;
      const wordError = wordInput.nextElementSibling;
      const typeInput = modalForm.type;
      const typeError = typeInput.nextElementSibling;
      const meaningInput = modalForm.meaning;
      const meaningError = meaningInput.nextElementSibling;
      const typeMeaningInput = modalForm.typeMeaning;
      const typeMeaningError = typeMeaningInput.nextElementSibling;
      const descriptionInput = modalForm.description;
      const descriptionError = descriptionInput.nextElementSibling;
      const descriptionPhotoInput = modalForm.descriptionPhoto;
      const descriptionPhotoError = descriptionPhotoInput.nextElementSibling;

      // Object to store field validation data
      const cardFields = [
        { name: "word", regex: REGEX.CONTENT, error: wordError, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_CONTENT },
        { name: "type", regex: REGEX.CONTENT, error: typeError, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_CONTENT },
        { name: "meaning", regex: REGEX.CONTENT, error: meaningError, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_CONTENT },
        { name: "typeMeaning", regex: REGEX.CONTENT, error: typeMeaningError, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_CONTENT },
        { name: "description", regex: REGEX.CONTENT, error: descriptionError, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_CONTENT },
        { name: "descriptionPhoto", regex: REGEX.IMAGE, error: descriptionPhotoError, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_IMAGE },
      ];

      return this.validationFields(modalForm, cardFields, object);
    }
    if (validation === "user") {
      const loginForm = document?.querySelector(".login-form");
      const emailInput = loginForm.email;
      const emailError = emailInput.nextElementSibling;
      const passwordInput = loginForm.password;
      const passwordError = passwordInput.nextElementSibling;

      // Object to store field validation data
      const loginFields = [
        { name: "email", regex: REGEX.EMAIL, error: emailError, requiredMessage: MESSAGE.EMAIL_REQUIRED, invalidMessage: MESSAGE.INVALID_EMAIL },
        { name: "password", regex: REGEX.PASSWORD, error: passwordError, requiredMessage: MESSAGE.PASSWORD_REQUIRED, invalidMessage: MESSAGE.INVALID_PASSWORD },
      ];

      return this.validationFields(loginForm, loginFields, object);
    } else {
      return false;
    }
  };

  /**
   *
   * @param {HTMLElement} form form will be validated
   * @param {Object} fields fields validation for form
   * @param {Object} object object is validated
   * @returns {Boolean} is object valid
   */
  validationFields = (form, fields, object) => {
    let isValid = true;
    for (const field of fields) {
      const value = object[field.name];
      const isValidField = field.regex.test(value);
      const inputEl = form[field.name]; // returns input tag here
      const errorEl = field.error; // returns p tag here

      // Check if the field value is empty
      if (value.trim() === "") {
        inputEl.classList.add("error");
        errorEl.textContent = field.requiredMessage;
        errorEl.classList.add("active");
        isValid = false;
      }

      // Check if the field value matches the regex pattern
      else if (!isValidField) {
        inputEl.classList.add("error");
        errorEl.textContent = field.invalidMessage;
        errorEl.classList.add("active");
        isValid = false;
      }

      // If the field is valid, remove any error styling and message
      else {
        inputEl.classList.remove("error");
        errorEl.textContent = "";
        errorEl.classList.remove("active");
      }
    }
    return isValid;
  };
}

export default ValidationService;
