import { v4 as uuidv4 } from "uuid";
import { utilityHelpers } from "../helpers/utilityHelper";
import { localStorageHelper } from "../helpers/localStorageHelper";
import {
  REQUEST_STATE,
  MESSAGE,
  SUCCESS_MESSAGE,
  ERROR_MESSAGE,
  DATA_SOURCES,
  PATHS,
} from "../constants/constants";

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

  //----- LOGIN AND LOGOUT CONTROLLER          -----//

  initLogin = () => {
    const location = window.location.pathname;

    if (location === PATHS.ROOT || location === PATHS.LOGIN) {
      localStorageHelper.removeLocalStorage(DATA_SOURCES.USER);
    }

    this.view.loginView.addEventLogin(this.isValidUser);
  };

  initLogout = () => {
    this.view.logoutView.addEventLogOut();
  };

  //----- HOME CONTROLLER          -----//

  initHome = async () => {
    if (utilityHelpers.saveStatusLogin()) {
      await this.initLanguageView();
      this.initModalConfirm();
      this.initModalCard();
      this.initModalDetail();
      this.initModalLanguageView();
      this.initCardView();
      this.initOverLay();

      this.initLogout();
    }
  };

  //----- LANGUAGE CONTROLLER          -----//

  initLanguageView = async () => {
    await this.view.languageView.renderLanguageList(this.getLanguageList, this.loadCards);
    this.view.languageView.addEventDeleteLanguage();
  };

  //----- CARD CONTROLLER          -----//

  initCardView = () => {
    this.view.cardView.addEventFindCard(this.findCard);
    this.view.cardView.addEventEnter(this.findCard);
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
    this.view.modalCardView.addEventSubmission(
      this.saveCard,
      this.loadCards,
      this.view.languageView
    );
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

  //----- OVERLAY CONTROLLER          -----//

  initOverLay = () => {
    this.view.overlayView.addEventClickOutSide();
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

      if (isUser) return true;
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

  /**
   * Method to delete a card by its ID.
   * @param {string} id - The ID of the card to be deleted.
   */
  deleteCard = async (id) => {
    try {
      await this.model.card.deleteCard(id);

      this.view.toastNotificationView.showToastNotification(
        REQUEST_STATE.SUCCESS,
        SUCCESS_MESSAGE.DELETE_CARD
      );
    } catch (error) {
      this.view.toastNotificationView.showToastNotification(
        REQUEST_STATE.FAILED,
        ERROR_MESSAGE.DELETE_CARD
      );
    }
  };

  /**
   * Method to load cards based on a specific category.
   * @param {string} category - The category for which to load cards.
   * @returns {boolean} - Returns true if cards are successfully loaded, otherwise false.
   */
  loadCards = async (category) => {
    try {
      // view receive category and render as follow category
      const isLoadCards = await this.view.cardView.renderCardList(this.getCardList, category);

      if (isLoadCards) {
        this.updateModalDetail();

        utilityHelpers.saveCategoryCurrent(category);
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
    if (cardCurrent.id) {
      try {
        await this.model.card.editCard(cardCurrent);

        this.view.toastNotificationView.showToastNotification(
          REQUEST_STATE.SUCCESS,
          SUCCESS_MESSAGE.EDIT_CARD
        );
      } catch (error) {
        this.view.toastNotificationView.showToastNotification(
          REQUEST_STATE.FAILED,
          ERROR_MESSAGE.EDIT_CARD
        );
      }
    } else {
      const newCard = { id: uuidv4(), ...cardCurrent };

      try {
        await this.model.card.addCard(newCard);

        this.view.toastNotificationView.showToastNotification(
          REQUEST_STATE.SUCCESS,
          SUCCESS_MESSAGE.ADD_CARD
        );
      } catch (error) {
        this.view.toastNotificationView.showToastNotification(
          REQUEST_STATE.FAILED,
          ERROR_MESSAGE.ADD_CARD
        );
      }
    }
  };

  /**
   * Method to find a card based on the provided search data.
   * @param {Object} searchData - The search criteria for finding the card.
   * @returns {Promise<Object>} - A Promise that resolves to the found card object or false if not found.
   */
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
      this.view.toastNotificationView.showToastNotification(
        REQUEST_STATE.FAILED,
        ERROR_MESSAGE.GET_LANGUAGE_LIST
      );
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
      const isAdd = await this.model.language.addLanguage(newLanguage);

      isAdd
        ? this.view.toastNotificationView.showToastNotification(
            REQUEST_STATE.SUCCESS,
            SUCCESS_MESSAGE.ADD_LANGUAGE
          )
        : this.view.toastNotificationView.showToastNotification(
            REQUEST_STATE.FAILED,
            MESSAGE.EXIST_LANGUAGE
          );
    } catch (error) {
      this.view.toastNotificationView.showToastNotification(
        REQUEST_STATE.FAILED,
        ERROR_MESSAGE.ADD_LANGUAGE
      );
    }
  };

  /**
   * Method to delete a language card by its ID.
   * @param {string} id - The ID of the language card to be deleted.
   */
  deleteLanguage = async (id) => {
    try {
      await this.model.language.deleteLanguage(id);

      this.view.toastNotificationView.showToastNotification(
        REQUEST_STATE.SUCCESS,
        SUCCESS_MESSAGE.DELETE_LANGUAGE
      );
    } catch (error) {
      this.view.toastNotificationView.showToastNotification(
        REQUEST_STATE.FAILED,
        ERROR_MESSAGE.DELETE_LANGUAGE
      );
    }
  };

  updatePage = async () => {
    this.updateModalDetail();

    this.loadCards(utilityHelpers.categoryCurrent);
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
