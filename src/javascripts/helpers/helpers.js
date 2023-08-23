import { DATA_SOURCES } from "../constants/constants";

class Helpers {
  constructor() {}
  /**
   * Saves the current category to the class instance.
   * @param {string} categoryCurrent - The category to be saved.
   * @returns {string} The saved category.
   */
  saveCategoryCurrent = (categoryCurrent) => (this.categoryCurrent = categoryCurrent);

  saveLocalStorage = (key, value) => {
    const data = this.stringifyData(value);

    localStorage.setItem(key, data);
  };

  getLocalStorage = (key) => {
    const data = localStorage.getItem(key);

    const parseData = this.parsedData(data);

    return parseData;
  };

  removeLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  saveStatusLogin = () => {
    const isUserLogged = localStorage.getItem(DATA_SOURCES.USER);

    return isUserLogged ? true : false;
  };

  stringifyData = (data) => JSON.stringify(data);

  parsedData = (data) => JSON.parse(data);

  toastDelay = (time) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(), time);
    });
}

export const helpers = new Helpers();
