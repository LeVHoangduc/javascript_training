import { v4 as uuidv4 } from "uuid";
import { helpers } from "../helpers/helpers";

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

    await this.initLanguageView();
    await this.initModalConfirm();
    await this.initModalCard();
    await this.initModalDetail();

    this.initModalLanguageView();
  };

  //----- LOGIN CONTROLLER          -----//

  initLogin = async () => {
    this.view.loginView.addEventLogin(this.isValidUser);
  };

  //----- MODAL CONTROLLER          -----//

  initModalLanguageView = () => {
    this.view.modalLanguageView.addEventOpenFormListener();
    this.view.modalLanguageView.addEventAddLanguage(this.saveLanguage, this.updateLanguageView);
  };

  initModalDetail = () => {
    this.view.modalDetailView.addOpenDetailListener(this.getCardDetail);
    this.view.modalDetailView.addCloseDetailListener();
    this.view.modalDetailView.addEventDeleteListener(this.deleteCard);
    this.view.modalDetailView.addEventEditListener(this.getCardDetail);
  };

  initModalCard = () => {
    this.view.modalCardView.addEventOpenFormListener();
    this.view.modalCardView.addEventCloseFormListener();
    this.view.modalCardView.addEventSubmission(this.saveCard, this.loadCards);
  };

  initModalConfirm = async () => {
    await this.view.modalConfirm.addEventConfirm(
      this.deleteCard,
      this.deleteLanguage,
      this.updateLanguageView,
      this.updatePage
    );
  };

  //----- LANGUAGE CONTROLLER          -----//
  /**
   * Initializing the language view
   */
  initLanguageView = async () => {
    // await this.view.languageView.init(
    //   this.getLanguageList,
    //   this.loadCards,
    //   this.deleteLanguage,
    //   this.updateLanguageList
    // );

    await this.view.languageView.renderLanguageList(this.getLanguageList, this.loadCards);
    this.view.languageView.addEventDeleteLanguage();
  };

  //----- METHOD                   -----//

  /**
   * Method to validate if the given user is valid by interacting with the model.
   * @param {Object} userCurrent - The user object to be validated.
   * @returns {Promise<boolean>} - A Promise that resolves to true if the user is valid, otherwise false.
   */
  isValidUser = async (userCurrent) => {
    try {
      const isUser = await this.model.user.isValidUser(userCurrent);

      return isUser;
    } catch (error) {
      // TODO: this.view.popup("error",message)
    }
  };

  getCardList = () => {
    try {
      const data = this.model.card.getCardList();

      return data;
    } catch (error) {
      // TODO: this.view.popup("error",message)
    }
  };

  getCardDetail = async (id) => {
    try {
      const data = await this.model.card.getCardDetail(id);

      return data;
    } catch (error) {
      // TODO: this.view.popup("error",message)
    }
  };

  deleteCard = async (id) => {
    try {
      await this.model.card.deleteCard(id);

      return true;
    } catch (error) {
      // TODO: this.view.popup("error",message)
    }
  };

  // click category from languageView
  loadCards = async (category) => {
    try {
      // view receive category and render as follow category
      const isLoadCards = await this.view.cardView.renderCardList(this.getCardList, category);
      if (isLoadCards) {
        console.log("load cards to modal detail");
        // need to update after add
        this.updateModalDetail();
        // this.saveCategoryCurrent(category);
        helpers.saveCategoryCurrent(category);
      }
    } catch (error) {
      // TODO: this.view.popup("error",message)
    }
  };

  /**
   * Method to save a card by either adding a new card or editing an existing one.
   * @param {Object} cardCurrent - The card object to be saved.
   * @returns {Promise<boolean>} - A Promise that resolves to true if add success, otherwise false.
   */
  saveCard = async (cardCurrent) => {
    if (!cardCurrent.id) {
      const newCard = { id: uuidv4(), ...cardCurrent };
      try {
        await this.model.card.addCard(newCard);

        return true;
      } catch (error) {
        //TODO: this.view.popup.display("error",message)
      }
    }

    try {
      await this.model.card.editCard(cardCurrent);

      return true;
    } catch (error) {
      //TODO: this.view.popup.display("error",message)
    }
    return false;
  };

  getLanguageList = async () => {
    try {
      const languageList = await this.model.language.getLanguageList(); // get data possible because data is available when init() languages

      return languageList;
    } catch (error) {
      //TODO: this.view.popup.display("error",message)
    }
  };

  /**
   * Method to save a card by either adding a new card or editing an existing one.
   * @param {Object} languageData - The language object to be saved.
   * @returns {Promise<boolean>} - A Promise that resolves to true if add success, otherwise false.
   */
  saveLanguage = async (languageData) => {
    const newLanguage = {
      id: uuidv4(),
      ...languageData,
    };
    try {
      await this.model.language.addLanguage(newLanguage);

      return true;
    } catch (error) {
      //TODO:  this.view.popup.display("error",message)
    }
  };

  deleteLanguage = async (id) => {
    try {
      await this.model.language.deleteLanguage(id);

      return true;
    } catch (error) {
      // TODO: this.view.popup("error",message)
    }
  };

  updatePage = async () => {
    console.log("update to modal detail");
    this.updateModalDetail();

    this.loadCards(helpers.categoryCurrent);
  };

  updateLanguageView = async () => {
    console.log("run update");
    // this.initLanguageList();
    // await this.view.languageView.init(
    //   this.getLanguageList,
    //   this.loadCards,
    //   this.deleteLanguage,
    //   this.updateLanguageList
    // );
    try {
      await this.initLanguageView();
    } catch (error) {
      // TODO: this.view.popup("error",message)
    }
  };

  updateModalDetail = async () => {
    try {
      const data = await this.getCardList();

      this.view.modalDetailView.init(data);
    } catch (error) {
      // TODO: this.view.popup("error",message)
    }
  };
}

export default Controller;
