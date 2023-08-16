class Helpers {
  constructor() {}
  /**
   * Saves the current category to the class instance.
   * @param {string} categoryCurrent - The category to be saved.
   * @returns {string} The saved category.
   */
  saveCategoryCurrent = (categoryCurrent) => (this.categoryCurrent = categoryCurrent);
}

export const helpers = new Helpers();
