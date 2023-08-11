import { v4 as uuidv4 } from "uuid";

class Controller {
  /**
   * Constructor of Controller object
   * @param {Object} model - The model component responsible for data management.
   * @param {Object} view - The view component responsible for rendering UI elements.
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  /**
   * Initializing the controller
   */
  init = async () => {
    this.initLogin();
    this.initModal();
  };

  //----- LOGIN CONTROLLER          -----//
  /**
   * Initializing the login view
   */
  initLogin = async () => {
    this.view.loginView.addEventLogin(this.isValidUser);
  };

  //----- MODAL CONTROLLER          -----//
  /**
   * Initializing the modal view
   */
  initModal = () => {
    this.view.modalCardView.openModal();
    this.view.modalCardView.addEventSubmission(this.saveCard);
  };

  //----- METHOD                   -----//

  /**
   * Method to validate if the given user is valid by interacting with the model.
   * @param {Object} userCurrent - The user object to be validated.
   * @returns {Promise<boolean>} - A Promise that resolves to true if the user is valid, otherwise false.
   */
  isValidUser = async (userCurrent) => {
    const isUser = await this.model.user.isValidUser(userCurrent);
    return isUser;
  };

  /**
   * Method to save a card by either adding a new card or editing an existing one.
   * @param {Object} cardCurrent - The card object to be saved.
   * @returns {Promise<boolean>} - A Promise that resolves to true if the user is valid, otherwise false.
   */
  saveCard = async (cardCurrent) => {
    let isAddSuccess;
    if (cardCurrent.id) {
      // TODO: Edit Action
    } else {
      const newCard = { id: uuidv4(), ...cardCurrent };
      isAddSuccess = await this.model.card.addCard(newCard);
    }
    return isAddSuccess;
  };
}

export default Controller;
