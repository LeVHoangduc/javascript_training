import { MESSAGE, REGEX } from "../constants/constants";

class ValidationService {
  constructor() {}

  /**
   * Function to check if the object is validated with the corresponding fields
   * @param {Object} fields field validation for object
   * @param {Object} object the validation object
   * @returns {Boolean} is object valid
   */
  // validationFields = (fields, object) => {
  //   const fieldCheck = [];
  //   for (const field of fields) {
  //     let value = "";
  //     let valueOptional = "";
  //     let isValidOptional = true;

  //     if (field.name === "captionPhoto") {
  //       valueOptional = object[field.name];
  //       if (valueOptional !== "") isValidOptional = field.regex.test(valueOptional);
  //     }

  //     value = object[field.name];

  //     const isValidField = field.regex.test(value);

  //     // Check to validation the field optional
  //     if (!isValidOptional) {
  //       console.log("vao day");
  //       fieldCheck.push({
  //         field: field.name,
  //         isValid: false,
  //         message: field.invalidMessage,
  //       });
  //     }

  //     if (isValidOptional) {
  //       fieldCheck.push({
  //         field: field.name,
  //         isValid: true,
  //       });
  //     }

  //     // Check to validation the field required
  //     if (value.trim() === "") {
  //       if (field.name !== "captionPhoto") {
  //         fieldCheck.push({
  //           field: field.name,
  //           isValid: false,
  //           message: field.requiredMessage,
  //         });
  //       }
  //     }

  //     // Check if the field value matches the regex pattern
  //     else if (!isValidField) {
  //       fieldCheck.push({
  //         field: field.name,
  //         isValid: false,
  //         message: field.invalidMessage,
  //       });
  //     }
  //     // If the field is valid, remove any error styling and message
  //     else {
  //       fieldCheck.push({
  //         field: field.name,
  //         isValid: true,
  //       });
  //     }
  //   }
  //   return fieldCheck;
  // };

  validationFields = (fields, object) => {
    const fieldCheck = [];

    for (const field of fields) {
      let value = object[field.name];
      let isValidField = field.regex.test(value);

      if (field.name === "captionPhoto") {
        isValidField = value !== "" && field.regex.test(value);
        if (value === "") isValidField = !field.regex.test(value);
      }

      if (value.trim() === "") {
        if (field.name !== "captionPhoto") {
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
      } else if (!isValidField) {
        fieldCheck.push({
          field: field.name,
          isValid: false,
          message: field.invalidMessage,
        });
      } else {
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
      case "card":
        const card = {
          word: form.word.value,
          meaning: form.meaning.value,
          description: form.description.value,
          captionPhoto: form.captionPhoto.value,
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
            name: "captionPhoto",
            regex: REGEX.IMAGE,
            requiredMessage: MESSAGE.CONTENT_REQUIRED,
            invalidMessage: MESSAGE.INVALID_IMAGE,
          },
        ];

        return this.validationFields(cardFields, card);

      case "user":
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

      case "language":
        const language = {
          language: form.language.value,
        };
        const languageFields = [
          {
            name: "language",
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
