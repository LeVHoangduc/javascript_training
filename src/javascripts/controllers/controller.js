import { v4 as uuidv4 } from "uuid";
import { helpers } from "../helpers/helpers";
import { CARD_ACTIONS } from "../constants/constants";

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

    this.initModalConfirm();
    this.initModalCard();
    this.initModalDetail();
    this.initModalLanguageView();
    this.initCardView();
  };

  //----- LOGIN CONTROLLER          -----//

  initLogin = () => {
    this.view.loginView.addEventLogin(this.isValidUser);
  };

  //----- LANGUAGE CONTROLLER          -----//

  initLanguageView = async () => {
    await this.view.languageView.renderLanguageList(this.getLanguageList, this.loadCards);
    this.view.languageView.addEventDeleteLanguage();
  };

  initCardView = () => {
    this.view.cardView.addEventFindCard(this.findCard);
  };
  //----- MODAL CONTROLLER          -----//

  initModalConfirm = () => {
    this.view.modalConfirm.addEventConfirm(
      this.deleteCard,
      this.deleteLanguage,
      this.updateLanguageView,
      this.updatePage
    );
  };

  initModalCard = () => {
    this.view.modalCardView.addEventOpenFormListener();
    this.view.modalCardView.addEventCloseFormListener();
    this.view.modalCardView.addEventSubmission(this.saveCard, this.loadCards);
  };

  initModalDetail = () => {
    this.view.modalDetailView.addOpenDetailListener(this.getCardDetail);
    this.view.modalDetailView.addCloseDetailListener();
    this.view.modalDetailView.addEventDeleteListener(this.deleteCard);
    this.view.modalDetailView.addEventEditListener(this.getCardDetail);
  };

  initModalLanguageView = () => {
    this.view.modalLanguageView.addEventOpenFormListener();
    this.view.modalLanguageView.addEventAddLanguage(this.saveLanguage, this.updateLanguageView);
  };

  //----- METHOD                   -----//

  /**
   * Method to validate if the given user is valid by interacting with the model.
   * @param {Object} userCurrent - The user object to be validated.
   * @returns {Promise<boolean>} - A Promise that resolves to true if the user is valid, otherwise false.
   */
  isValidUser = async (userCurrent) => {
    try {
      console.log(userCurrent);
      const isUser = await this.model.user.isValidUser(userCurrent);

      return isUser;
    } catch (error) {
      return false;
    }
  };

  getCardList = () => {
    try {
      const data = this.model.card.getCardList();

      return data;
    } catch (error) {
      return false;
    }
  };

  getCardDetail = async (id) => {
    try {
      const data = await this.model.card.getCardDetail(id);

      return data;
    } catch (error) {
      return false;
    }
  };

  deleteCard = async (id) => {
    try {
      await this.model.card.deleteCard(id);

      return true;
    } catch (error) {
      return false;
    }
  };

  // click category from languageView
  loadCards = async (category) => {
    try {
      // view receive category and render as follow category
      const isLoadCards = await this.view.cardView.renderCardList(this.getCardList, category);

      if (isLoadCards) {
        this.updateModalDetail();

        helpers.saveCategoryCurrent(category);
      }
    } catch (error) {
      return false;
    }
  };

  /**
   * Method to save a card by either adding a new card or editing an existing one.
   * @param {Object} cardCurrent - The card object to be saved.
   * @returns {Promise<boolean>} - A Promise that resolves to true if add success, otherwise false.
   */
  saveCard = async (cardCurrent) => {
    let methodCard = {
      isSuccess: false,
      type: "",
    };

    if (!cardCurrent.id) {
      const newCard = { id: uuidv4(), ...cardCurrent };

      try {
        await this.model.card.addCard(newCard);

        methodCard = {
          isSuccess: true,
          type: CARD_ACTIONS.add,
        };

        return methodCard;
      } catch (error) {
        return false;
      }
    }

    try {
      await this.model.card.editCard(cardCurrent);

      methodCard = {
        isSuccess: true,
        type: CARD_ACTIONS.edit,
      };

      return methodCard;
    } catch (error) {
      return false;
    }
  };

  findCard = async (searchData) => {
    try {
      return await this.model.card.findCard(searchData);
    } catch (error) {
      return false;
    }
  };

  getLanguageList = async () => {
    try {
      const languageList = await this.model.language.getLanguageList(); // get data possible because data is available when init() languages

      return languageList;
    } catch (error) {
      return false;
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
      return false;
    }
  };

  deleteLanguage = async (id) => {
    try {
      await this.model.language.deleteLanguage(id);

      return true;
    } catch (error) {
      return false;
    }
  };

  updatePage = async () => {
    this.updateModalDetail();

    this.loadCards(helpers.categoryCurrent);
  };

  updateLanguageView = async () => {
    try {
      await this.initLanguageView();
    } catch (error) {
      return false;
    }
  };

  updateModalDetail = async () => {
    try {
      const data = await this.getCardList();

      this.view.modalDetailView.init(data);
    } catch (error) {
      return false;
    }
  };
}

export default Controller;
