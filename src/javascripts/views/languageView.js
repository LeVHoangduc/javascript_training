import Template from "../templates/templates";

class LanguageView {
  constructor() {
    this.languageListEl = document.querySelector(".language__list");

    this.cardFormEl = document.querySelector(".modal-card");

    this.confirmFormEl = document.querySelector(".modal-confirm");
    this.confirmMessageEl = document.querySelector(".modal-confirm__message");

    this.overlayEl = document.querySelector(".overlay");
  }

  //----- EVENT LISTENER -----//

  /**
   * Method to add an event listener to language items to show the modal card.
   * @param {Function} loadCards - Function to load cards.
   * @returns {string} - Current selected category.
   */
  addEventShowCard = (loadCards) => {
    let categoryCurrent;

    this.languageListEl.addEventListener("click", (e) => {
      const languageEl = e.target.closest(".language__item p");

      // Pass the selected category to the loadCards function.
      categoryCurrent = languageEl?.textContent.trim();
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

        this.openConfirmDelete(button);
      });
    });
  };

  //----- RENDERING -----//

  /**
   * Renders the language list based on data from Models.
   * @param {Function} getLanguageList - List of language objects.
   * @param {Function} loadCards  - Promise that resolves language item.
   */
  renderLanguageList = async (getLanguageList, loadCards) => {
    const languageList = await getLanguageList();

    this.languageListEl.innerHTML = " ";
    this.cardFormEl.language.innerHTML = " ";

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

  openConfirmDelete = (button) => {
    const type = button.parentElement.getAttribute("type");

    const languageData = button.parentElement.querySelector("p").textContent;
    const language = languageData.charAt(0).toUpperCase() + languageData.slice(1);

    this.confirmFormEl.classList.add("open");
    this.confirmMessageEl.textContent = `Do you want to delete ${language} ${type}`;

    this.overlayEl.classList.add("open");
  };

  switchLanguage = (languageEl, nameLanguage) => {
    const languageItem = document.querySelector(".language__item.active");

    // Remove active in previous language
    languageItem?.classList.remove("active");

    // Remove active in previous language button
    languageItem?.querySelector(".language__delete").classList.remove("active");

    if (languageEl) {
      // Apply the 'active' class to the language item
      languageEl.parentElement.classList.add("active");

      // Apply the 'active' class to the 'language__delete' button
      languageEl.querySelector(".language__delete")?.classList.add("active");
    }

    // Activate the specified language after it has been added
    if (nameLanguage) {
      const languageItemEL = this.languageListEl.querySelectorAll(".language__item");

      // Find the element that matches the specified language name
      const languageCurrent = Array.from(languageItemEL).find(
        (item) => item.textContent.trim() === nameLanguage
      );

      // Apply the 'active' class to the found language element
      languageCurrent.classList.add("active");
    }
  };
}

export default LanguageView;
