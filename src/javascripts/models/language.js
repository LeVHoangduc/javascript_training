import ApiService from "../services/apiService";

class Language {
  constructor() {
    this.apiService = new new ApiService("/languages")();
    this.languageList;
  }

  //----- METHOD                   -----//

  /**
   * Method to get list of users from service
   * @returns {Object[]} userList object
   */
  getLanguageList = () => {
    this.languageList = this.apiService.getList();

    return this.languageList;
  };
}

export default Language;
