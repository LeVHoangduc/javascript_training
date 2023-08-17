import Template from "../templates/templates";

class LanguageView {
  constructor() {
    this.languageListEl = document.querySelector(".language__list");

    this.cardFormEl = document.querySelector(".modal-card");

    this.confirmFormEl = document.querySelector(".modal-confirm");
  }

  //----- EVENT HANDLER -----//

  /**
   * Method to add an event listener to language items to show the modal card.
   * @param {Callback} loadCards - Function to load cards.
   * @returns {string} - Current selected category.
   */
  addEventShowCard = (loadCards) => {
    console.log("addEventShowCard");
    let categoryCurrent;

    this.languageListEl.addEventListener("click", (e) => {
      const languageEl = e.target.closest(".language__item");

      // Pass the selected category to the loadCards function.
      categoryCurrent = languageEl.textContent.trim();
      loadCards(categoryCurrent);

      this.switchLanguage(languageEl);
    });

    return categoryCurrent;
  };

  addEventDeleteLanguage = () => {
    // Must load full language and then query btnDelete
    this.btnDelete = document.querySelectorAll(".language__delete");

    this.btnDelete.forEach((button) => {
      button.addEventListener("click", () => {
        this.confirmFormEl.setAttribute("data-id", button.parentElement.getAttribute("data-id"));
        this.confirmFormEl.setAttribute("type", button.parentElement.getAttribute("type"));
        this.openConfirmDelete();
      });
    });
  };

  /**
   * Renders the language list based on data from Models.
   * @param {Promise<object>} getLanguageList - List of language objects.
   * @param {Promise<object>} loadCards  - Promise that resolves language item.
   */
  renderLanguageList = async (getLanguageList, loadCards) => {
    const languageList = await getLanguageList();

    this.languageListEl.innerHTML = " ";
    languageList.forEach((language) => {
      this.renderLanguage(language);
    });

    this.addEventShowCard(loadCards);
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
    if (this.cardFormEl) {
      this.cardFormEl.language.innerHTML += languageSelectTemplate;
    }
  };

  //----- METHOD -----//

  openConfirmDelete = () => {
    this.confirmFormEl.classList.add("open");
  };

  switchLanguage = (languageEl) => {
    const languageItem = document.querySelector(".language__item.active");

    // remove active in language outdated
    languageItem?.classList.remove("active");

    // language current is active
    languageEl.classList.add("active");
  };
}

export default LanguageView;
