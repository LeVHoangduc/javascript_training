import ApiService from "../services/apiService";

class Card {
  constructor() {
    this.service = new ApiService("/cards");
    this.cardList;
  }

  /**
   * Method to retrieve the list of card from the API.
   * @returns {Promise<Object[]>} A promise that resolves with the list of card.
   */
  getCardList = async () => {
    const data = await this.service.getList();

    return data;
  };

  /**
   * MEthod to add a new card to the card list.
   * @param {Object} cardCurrent - The card object to be added.
   * @returns {Promise} A promise that resolves with the result of adding the card.
   */
  addCard = async (cardCurrent) => {
    const addCard = await this.service.postItem(cardCurrent);

    return addCard;
  };

  /**
   * Method to delete a card from the card list.
   * @param {string} cardId - The ID of the card to be deleted.
   */
  deleteCard = async (cardId) => {
    console.log("id of model is:", cardId);
    await this.service.deleteItem(cardId);
  };

  // TODO: editCard
  // TODO: filterCard
}

export default Card;
