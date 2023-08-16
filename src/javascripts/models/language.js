import ApiService from "../services/apiService";

class Language {
  constructor() {
    this.apiService = new ApiService("/languages");
  }

  //-----  METHOD   -----//

  /**
   * Method to retrieve list of users from service
   * @returns {Promise<Object[]>} - A promise that resolves with an array of language objects.
   */
  getLanguageList = () => this.apiService.getList();

  /**
   * Method to add a new card to the card list.
   * @param {Object} languageData - The card object to be added.
   * @returns {Promise<Boolean>} A promise that resolves with the result of adding the card.
   */
  addLanguage = (languageData) => this.apiService.postItem(languageData);

  /**
   * Method to delete a language based on its ID.
   * @param {String} languageId - The ID of the language to be deleted.
   * @returns {Promise<Boolean>} - A promise that resolves with the result of the deletion.
   */
  deleteLanguage = (languageId) => this.apiService.deleteItem(languageId);
}

export default Language;
