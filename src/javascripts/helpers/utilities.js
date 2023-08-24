import { DATA_SOURCES } from "../constants/constants";

class Utilities {
  constructor() {}
  /**
   * Saves the current category to the class instance.
   * @param {string} categoryCurrent - The category to be saved.
   * @returns {string} The saved category.
   */
  saveCategoryCurrent = (categoryCurrent) => (this.categoryCurrent = categoryCurrent);

  /**
   * Checks if a user is logged in by inspecting the localStorage.
   * @returns {boolean} - True if the user is logged in, false otherwise.
   */
  saveStatusLogin = () => {
    const isUserLogged = localStorage.getItem(DATA_SOURCES.USER);

    return isUserLogged ? true : false;
  };

  /**
   * Delays execution asynchronously for the specified time.
   * @param {number} time - The time to delay in milliseconds.
   * @returns {Promise} A promise that resolves after the specified delay time.
   */
  toastDelay = (time) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(), time);
    });
}

export const utilities = new Utilities();
