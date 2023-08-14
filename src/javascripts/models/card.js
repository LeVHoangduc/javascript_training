import ApiService from "../services/apiService";

class Card {
  constructor() {
    this.apiService = new ApiService("/cards");
  }

  /**
   * Method to retrieve the list of card from the API.
   * @returns {Promise<Object[]>} A promise that resolves with the list of card.
   */
  getCardList = async () => {
    const data = await this.apiService.getList();

    return data;
  };

  /**
   * MEthod to add a new card to the card list.
   * @param {Object} cardCurrent - The card object to be added.
   * @returns {Promise} A promise that resolves with the result of adding the card.
   */
  addCard = async (cardCurrent) => {
    const addCard = await this.apiService.postItem(cardCurrent);

    return addCard;
  };

  /**
   * Method to delete a card from the card list.
   * @param {string} cardId - The ID of the card to be deleted.
   */
  deleteCard = async (cardId) => {
    await this.apiService.deleteItem(cardId);
  };

  // TODO: editCard
  // TODO: filterCard
}

export default Card;
