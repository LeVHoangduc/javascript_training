import { ERROR_MESSAGE } from "../constants/constants";
import ValidationService from "../services/validationService.js";

class LoginView {
  constructor() {
    this.service = new ValidationService();
    this.loginForm = document.querySelector(".login-form");
    this.buttonEl = document.querySelector(".login-form__button");
  }

  //----- EVENT HANDLER -----//

  /**
   * Method to login action
   * @param {Callback} isValidUSer User is exist in database
   */
  addEventLogin = (isValidUSer) => {
    this.buttonEl?.addEventListener("click", async (e) => {
      e.preventDefault();
      const userCurrent = {
        email: this.loginForm.email.value,
        password: this.loginForm.password.value,
      };
      if (this.service.formValidator("user")(userCurrent)) {
        const isUSer = await isValidUSer(userCurrent);
        isUSer ? (window.location.href = "home.html") : alert(`${ERROR_MESSAGE.LOGIN_VALIDATION}`);
      } else {
        alert(`${ERROR_MESSAGE.INVALID_INFORMATION}`);
      }
    });
  };
}

export default LoginView;
