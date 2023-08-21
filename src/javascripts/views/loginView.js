import { FORM_TYPES } from "../constants/constants";
import ValidationService from "../services/validationService.js";
import Error from "./errorView";

class LoginView {
  constructor() {
    this.service = new ValidationService();
    this.error = new Error();
    this.loginForm = document.querySelector(".login-form");
    this.buttonEl = document.querySelector(".login-form__button");

    this.loadingEl = document.querySelector(".loading");
  }

  //----- EVENT HANDLER -----//

  /**
   * Method to login action when the login button is clicked
   * @param {Callback} isValidUSer Check if User exists in database
   */
  addEventLogin = (isValidUSer) => {
    this.buttonEl?.addEventListener("click", async (e) => {
      e.preventDefault();

      const userCurrent = {
        email: this.loginForm.email.value,
        password: this.loginForm.password.value,
      };

      const inputCheck = this.service.formValidator(FORM_TYPES.user, this.loginForm);
      const isValidation = this.isValidation(inputCheck);
      if (isValidation) {
        const isUSer = await isValidUSer(userCurrent);

        this.loginForm.classList.add("hide");
        this.loadingEl.classList.add("open");

        if (isUSer) {
          this.resetForm();

          this.loginForm.classList.remove("hide");
          this.loadingEl.classList.remove("open");

          window.location.href = "home.html";
        }
      }
    });
  };

  //----- METHOD -----//

  /**
   * Method to check validation on UI
   * @param {Array} inputs Array of input object lists to show/remove errors on the UI
   * inputs[
   *  {
   *    field: "email",
   *    isValid: false,
   *    message: "The email is required"
   *  },
   *  {
   *    field: "password",
   *    isValid: true,
   *  }
   * ]
   * @returns {Boolean} form is validated
   */
  isValidation = (inputs) => {
    let isValid = true;
    inputs.forEach((input) => {
      const inputEl = this.loginForm[input.field];
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

  resetForm = () => {
    this.loginForm.email.value = "";
    this.loginForm.password.value = "";
  };
}

export default LoginView;
