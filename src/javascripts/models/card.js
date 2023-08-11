import ApiService from "../services/apiService";

class Card {
  constructor() {
    this.service = new ApiService("/cards");
    this.cardList;
  }

  /**
   * MEthod to add a new card to the card list.
   * @param {Object} cardCurrent - The card object to be added.
   * @returns {Promise} A promise that resolves with the result of adding the card.
   */
  addCard = async (cardCurrent) => {
    const addCard = await this.service.postItem(cardCurrent);

    return addCard;
  };

  // TODO: editCard
  // TODO: deleteCard
  // TODO: getCardList
  // TODO: getCardDetail
  // TODO: filterCard
}

export default Card;
