import { MESSAGE, REGEX } from "../constants/constants";

class ValidationService {
  constructor() {}

  /**
   * Function to check if the object is validated with the corresponding fields
   * @param {Object} fields field validation for object
   * @param {Object} object the validation object
   * @returns {Boolean} is object valid
   */
  validationFields = (fields, object) => {
    const fieldCheck = [];
    for (const field of fields) {
      const value = object[field.name];
      const isValidField = field.regex.test(value);

      // Check if the field value is empty
      if (value.trim() === "") {
        fieldCheck.push({
          field: field.name,
          isValid: false,
          message: field.requiredMessage,
        });
      }
      // Check if the field value matches the regex pattern
      else if (!isValidField) {
        fieldCheck.push({
          field: field.name,
          isValid: false,
          message: field.invalidMessage,
        });
      }
      // If the field is valid, remove any error styling and message
      else {
        fieldCheck.push({
          field: field.name,
          isValid: true,
          message: field.requiredMessage,
        });
      }
    }

    return fieldCheck;
  };

  /**
   * Method to validate form data
   * @param {String} validation  Type validation for which form
   * user, card, language
   * @param {HTMLElement} form
   * user form, card form, language form
   * @returns {Object/Boolean} returns object for deal with errors on UI
   * or returns False if type validation is not defined
   */
  formValidator = (validation, form) => {
    switch (validation) {
      case "card":
        // Get object for validation
        const card = {
          word: form[word],
          type: form[type],
          meaning: form[meaning],
          description: form[description],
          descriptionPhoto: form[descriptionPhoto],
        };

        // Object to store field validation data
        const cardFields = [
          {
            name: "word",
            regex: REGEX.CONTENT,
            requiredMessage: MESSAGE.CONTENT_REQUIRED,
            invalidMessage: MESSAGE.INVALID_CONTENT,
          },
          {
            name: "type",
            regex: REGEX.CONTENT,
            requiredMessage: MESSAGE.CONTENT_REQUIRED,
            invalidMessage: MESSAGE.INVALID_CONTENT,
          },
          {
            name: "meaning",
            regex: REGEX.CONTENT,
            requiredMessage: MESSAGE.CONTENT_REQUIRED,
            invalidMessage: MESSAGE.INVALID_CONTENT,
          },
          {
            name: "description",
            regex: REGEX.CONTENT,
            requiredMessage: MESSAGE.CONTENT_REQUIRED,
            invalidMessage: MESSAGE.INVALID_CONTENT,
          },
          {
            name: "descriptionPhoto",
            regex: REGEX.IMAGE,
            requiredMessage: MESSAGE.CONTENT_REQUIRED,
            invalidMessage: MESSAGE.INVALID_IMAGE,
          },
        ];

        return this.validationFields(form, cardFields, card);
      case "user":
        // Get object for validation
        const user = {
          email: form.email.value,
          password: form.password.value,
        };

        const loginFields = [
          {
            name: "email",
            regex: REGEX.EMAIL,
            requiredMessage: MESSAGE.EMAIL_REQUIRED,
            invalidMessage: MESSAGE.INVALID_EMAIL,
          },
          {
            name: "password",
            regex: REGEX.PASSWORD,
            requiredMessage: MESSAGE.PASSWORD_REQUIRED,
            invalidMessage: MESSAGE.INVALID_PASSWORD,
          },
        ];

        return this.validationFields(loginFields, user);
      default:
        false;
    }
  };
}

export default ValidationService;
