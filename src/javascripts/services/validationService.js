import { MESSAGE, REGEX, DATA_SOURCES, FORM_INPUT, DEFAULT_VALUES } from "../constants/constants";

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
      let value = object[field.name];
      let isValidField = field.regex.test(value);

      // Check if the optional field is typed
      if (field.name === FORM_INPUT.CAPTION_PHOTO) {
        isValidField = value !== DEFAULT_VALUES.EMPTY_STRING && field.regex.test(value);
        if (value === DEFAULT_VALUES.EMPTY_STRING) isValidField = !field.regex.test(value);
      }

      // Check if the value is empty
      if (value.trim() === DEFAULT_VALUES.EMPTY_STRING) {
        if (field.name !== FORM_INPUT.CAPTION_PHOTO) {
          fieldCheck.push({
            field: field.name,
            isValid: false,
            message: field.requiredMessage,
          });
        } else {
          fieldCheck.push({
            field: field.name,
            isValid: true,
          });
        }
      }

      // Check value with regex
      else if (!isValidField) {
        fieldCheck.push({
          field: field.name,
          isValid: false,
          message: field.invalidMessage,
        });
      }

      // Push the result of the test to the array
      else {
        fieldCheck.push({
          field: field.name,
          isValid: true,
        });
      }
    }

    return fieldCheck;
  };

  /**
   * Method to validate form data
   * @param {String} validation Type validation for which form
   * user, card, language
   * @param {HTMLElement} form
   * user form, card form, language form
   * @param {Oject} Object
   * user = {
   *  email : "Admin@gmail.com",
   *  password: "Taikhoan@46"
   * }
   * [
   * {
   *  field: "email",
   *  value: "Taikhoan@46"
   * },
   * {
   *  field: "password",
   *  value: "Taikhoan@46"
   * }
   * ]
   *
   * @returns {Object} returns object for deal with errors on UI
   * or returns False if type validation is not defined
   */
  formValidator = (validation, form) => {
    switch (validation) {
      case DATA_SOURCES.CARD:
        const card = {
          word: form.word.value,
          meaning: form.meaning.value,
          description: form.description.value,
          captionPhoto: form.captionPhoto.value,
        };

        // Object to store field validation data
        const cardFields = [
          {
            name: FORM_INPUT.WORD,
            regex: REGEX.CONTENT,
            requiredMessage: MESSAGE.CONTENT_REQUIRED,
            invalidMessage: MESSAGE.INVALID_CONTENT,
          },
          {
            name: FORM_INPUT.MEANING,
            regex: REGEX.CONTENT,
            requiredMessage: MESSAGE.CONTENT_REQUIRED,
            invalidMessage: MESSAGE.INVALID_CONTENT,
          },
          {
            name: FORM_INPUT.DESCRIPTION,
            regex: REGEX.CONTENT,
            requiredMessage: MESSAGE.CONTENT_REQUIRED,
            invalidMessage: MESSAGE.INVALID_CONTENT,
          },
          {
            name: FORM_INPUT.CAPTION_PHOTO,
            regex: REGEX.IMAGE,
            requiredMessage: MESSAGE.CONTENT_REQUIRED,
            invalidMessage: MESSAGE.INVALID_IMAGE,
          },
        ];

        return this.validationFields(cardFields, card);

      case DATA_SOURCES.USER:
        const user = {
          email: form.email.value,
          password: form.password.value,
        };

        const loginFields = [
          {
            name: FORM_INPUT.EMAIL,
            regex: REGEX.EMAIL,
            requiredMessage: MESSAGE.EMAIL_REQUIRED,
            invalidMessage: MESSAGE.INVALID_EMAIL,
          },
          {
            name: FORM_INPUT.PASSWORD,
            regex: REGEX.PASSWORD,
            requiredMessage: MESSAGE.PASSWORD_REQUIRED,
            invalidMessage: MESSAGE.INVALID_PASSWORD,
          },
        ];

        return this.validationFields(loginFields, user);

      case DATA_SOURCES.LANGUAGE:
        const language = {
          language: form.language.value,
        };

        const languageFields = [
          {
            name: FORM_INPUT.LANGUAGE,
            regex: REGEX.LANGUAGE,
            requiredMessage: MESSAGE.CONTENT_REQUIRED,
            invalidMessage: MESSAGE.INVALID_CONTENT,
          },
        ];

        return this.validationFields(languageFields, language);
      default:
        false;
    }
  };
}

export default ValidationService;
