import { MESSAGE, REGEX } from "../constants/constants";
import { helpers } from "../helpers/helpers";
class ValidationService {
  constructor() {}

  /**
   * Method to validate form data
   * @param {String} validation
   * @param {Object} object
   * @returns {Boolean} object is validated
   */
  formValidator = (validation) => (object) => {
    if (validation === "card") {
      const modalForm = document?.querySelector(".modal-add");

      // Object to store field validation data
      const cardFields = [
        { name: "word", regex: REGEX.CONTENT, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_CONTENT },
        { name: "type", regex: REGEX.CONTENT, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_CONTENT },
        { name: "meaning", regex: REGEX.CONTENT, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_CONTENT },
        { name: "typeMeaning", regex: REGEX.CONTENT, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_CONTENT },
        { name: "description", regex: REGEX.CONTENT, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_CONTENT },
        { name: "descriptionPhoto", regex: REGEX.IMAGE, requiredMessage: MESSAGE.CONTENT_REQUIRED, invalidMessage: MESSAGE.INVALID_IMAGE },
      ];

      return this.validationFields(modalForm, cardFields, object);
    }
    if (validation === "user") {
      const loginForm = document?.querySelector(".login-form");

      // Object to store field validation data
      const loginFields = [
        { name: "email", regex: REGEX.EMAIL, requiredMessage: MESSAGE.EMAIL_REQUIRED, invalidMessage: MESSAGE.INVALID_EMAIL },
        { name: "password", regex: REGEX.PASSWORD, requiredMessage: MESSAGE.PASSWORD_REQUIRED, invalidMessage: MESSAGE.INVALID_PASSWORD },
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
      const errorEl = form[field.name].nextElementSibling; // returns p tag here

      // Check if the field value is empty
      if (value.trim() === "") {
        helpers.error.showError(inputEl, errorEl, field.requiredMessage);
        isValid = false;
      }

      // Check if the field value matches the regex pattern
      else if (!isValidField) {
        helpers.error.showError(inputEl, errorEl, field.invalidMessage);
        isValid = false;
      }

      // If the field is valid, remove any error styling and message
      else {
        helpers.error.clearError(inputEl, errorEl);
      }
    }
    return isValid;
  };
}

export default ValidationService;
