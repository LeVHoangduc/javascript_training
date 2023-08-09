import { ERROR_MESSAGE } from "../constants/constants";
import { formValidator } from "../helpers/formValidator";

class LoginView {
  constructor() {
    this.buttonEl = document.querySelector(".login-form__button");
    this.loginForm = document.querySelector(".login-form");
  }

  //----- EVENT HANDLER -----//

  /**
   * Add event listener for login action when the login button is clicked.
   * @param {callback} getUser
   */
  addEventLogin = (getUsers) => {
    this.buttonEl?.addEventListener("click", async (e) => {
      e.preventDefault();

      const userCurrent = {
        email: this.loginForm.username.value,
        password: this.loginForm.password.value,
      };

      if (formValidator("user")(userCurrent)) {
        const users = await getUsers();
        let isUser = users.find((user) => {
          return user.username === userCurrent.email && user.password === userCurrent.password;
        });
        isUser ? (window.location.href = "home.html") : alert(`${ERROR_MESSAGE.LOGIN_VALIDATION}`);
      } else {
        alert(`${ERROR_MESSAGE.INVALID_INFORMATION}`);
      }
    });
  };
}

export default LoginView;
