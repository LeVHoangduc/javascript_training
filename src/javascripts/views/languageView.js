import Template from "../templates/templates";

class LanguageView {
  constructor() {
    this.languageListEl = document.querySelector(".language__list");
    this.modalCardEl = document.querySelector(".modal-card");
  }

  /**
   * Initializes the LanguageView with language data.
   * @param {Array} languageList - List of languages.
   */
  init = (languageList) => {
    // Render the language list.
    this.renderLanguageList(languageList);

    // Retrieve language item elements after data is available.
    this.languageItemEl = document.querySelectorAll(".language__item");
  };

  //----- EVENT HANDLER -----//

  /**
   * Method to add an event listener to language items to show the modal card.
   * @param {Callback} loadCards - Function to load cards.
   * @returns {string} - Current selected category.
   */
  addEventShowCard = (loadCards) => {
    let categoryCurrent;
    this.languageItemEl.forEach((item) => {
      item.addEventListener("click", () => {
        // Pass the selected category to the loadCards function.
        loadCards(item.textContent.trim());
        categoryCurrent = item.textContent.trim();
      });
    });
    return categoryCurrent;
  };

  //----- RENDERING -----//

  /**
   * Renders the language list based on data from Models.
   * @param {Object[]} languageList - List of language objects.
   */
  renderLanguageList = (languageList) => {
    languageList.forEach((language) => {
      this.renderLanguage(language);
    });
  };

  /**
   * Renders a language element.
   * @param {Object} language - Language object to render.
   */
  renderLanguage = (language) => {
    const languageTemplate = Template.renderLanguage(language);
    const languageSelectTemplate = Template.renderSelectLanguage(language);

    // Append languageTemplate to the language list element.
    if (this.languageListEl) {
      this.languageListEl.innerHTML += languageTemplate;
    }

    // Append languageSelectTemplate to the modal card element.
    if (this.modalCardEl) {
      this.modalCardEl.language.innerHTML += languageSelectTemplate;
    }
  };
}

export default LanguageView;
