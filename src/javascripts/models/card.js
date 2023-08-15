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
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating success.
   */
  addCard = async (cardCurrent) => {
    try {
      await this.apiService.postItem(cardCurrent);

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Method to delete a card from the card list.
   * @param {string} cardId - The ID of the card to be deleted.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating success.
   */
  deleteCard = async (cardId) => {
    try {
      await this.apiService.deleteItem(cardId);

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Method to edit an existing card in the card list.
   * @param {Object} cardCurrent - The updated card object.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating success.
   */
  editCard = async (cardCurrent) => {
    try {
      await this.apiService.updateItem(cardCurrent.id, cardCurrent);

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: filterCard
}

export default Card;
