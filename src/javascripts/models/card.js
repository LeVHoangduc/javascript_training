import ApiService from "../services/apiService";

class Card {
  constructor() {
    this.apiService = new ApiService("/cards");
  }

  /**
   * Method to retrieve the list of card from the API.
   * @returns {Promise<Object[]>} A promise that resolves with the list of card.
   */
  getCardList = () => this.apiService.getList();

  /**
   * Method to retrieve detailed information for a specific card from the API.
   * @param {string} id - The ID of the card to retrieve details for.
   * @returns {Promise<Object>} A promise that resolves with the detailed card object.
   */
  getCardDetail = (id) => this.apiService.getDetail(id);

  /**
   * Method to add a new card to the card list.
   * @param {Object} cardCurrent - The card object to be added.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating success.
   */
  addCard = async (cardCurrent) => await this.apiService.postItem(cardCurrent);

  /**
   * Method to delete a card from the card list.
   * @param {string} cardId - The ID of the card to be deleted.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating success.
   */
  deleteCard = async (cardId) => await this.apiService.deleteItem(cardId);

  /**
   * Method to edit an existing card in the card list.
   * @param {Object} cardCurrent - The updated card object.
   * @returns {Promise<boolean>} A promise that resolves with a boolean indicating success.
   */
  editCard = async (cardCurrent) => await this.apiService.updateItem(cardCurrent.id, cardCurrent);
}

export default Card;
