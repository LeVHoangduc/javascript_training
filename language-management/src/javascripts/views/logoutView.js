import { localStorageHelper } from "../helpers/localStorageHelper";
import { DATA_SOURCES, PATHS } from "../constants/constants";
class LogoutView {
  constructor() {
    this.buttonEl = document.querySelector(".header__logout");
  }

  //----- EVENT LISTENER -----//

  addEventLogOut = () => {
    this.buttonEl?.addEventListener("click", () => {
      localStorageHelper.removeLocalStorage(DATA_SOURCES.USER);

      window.location.href = PATHS.LOGIN;
    });
  };
}

export default LogoutView;
