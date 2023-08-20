import { helpers } from "../helpers/helpers";

class LogoutView {
  constructor() {
    this.buttonEl = document.querySelector(".header__logout");
  }

  addEventLogOut = () => {
    this.buttonEl?.addEventListener("click", () => {
      helpers.removeLocalStorage("user");

      window.location.href = "index.html";
    });
  };
}

export default LogoutView;
