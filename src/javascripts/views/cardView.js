import Template from "../templates/templates";
import Error from "./errorView";

class CardView {
  constructor() {
    this.error = new Error();

    this.cardListEl = document.querySelector(".card__list");
    this.inputEl = document.querySelector(".header__search__input");
    this.searchEL = document.querySelector(".header__search__icon");
  }

  //----- EVENT LISTENER -----//

  addEventFindCard = (findCard) => {
    this.searchEL.addEventListener("click", () => this.handleFindCard(findCard));
  };

  addEventEnter = (findCard) => {
    this.inputEl.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        this.handleFindCard(findCard);
      }
    });
  };

  //----- RENDERING -----//

  /**
   * Render the list of cards based on data from Models filtered by the specified category.
   * @param {Function} cardList - A function that returns a Promise of card data.
   * @param {String} category - The category of cards to be rendered.
   * @returns {Boolean} - Returns true when rendering is complete.
   */
  renderCardList = async (cardList, category) => {
    // Show empty or loading effect
    const cardListData = await cardList();

    // Clear existing card elements before loading new data
    this.cardListEl.innerHTML = "";

    // Filter and render cards based on the specified category
    const cards = cardListData.filter((card) => card.language === category);

    cards.forEach((card) => {
      this.renderCard(card);
    });

    return true;
  };

  /**
   * Render an individual card using a provided card object.
   * @param {Object} card - The card object containing information to be rendered.
   */
  renderCard = (card) => {
    const cardTemplate = Template.renderCard(card);

    if (this.cardListEl) {
      this.cardListEl.innerHTML += cardTemplate;
    }
  };

  renderFindCard = (cards) => {
    this.cardListEl.innerHTML = "";
    if (cards.length === 0) {
      this.error.showEmpty();
    }
    cards.forEach((card) => {
      this.renderCard(card);
    });
  };

  //----- METHOD -----//

  handleFindCard = async (findCard) => {
    let inputData = this.inputEl.value.toLowerCase();

    const isCard = await findCard(inputData);

    this.renderFindCard(isCard);

    this.inputEl.value = "";
  };
}

export default CardView;
