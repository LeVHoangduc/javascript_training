/**
 * Message for the form validator.
 */
export const MESSAGE = {
  EMAIL_REQUIRED: "The email is required",
  INVALID_EMAIL: "The email is invalid",

  PASSWORD_REQUIRED: "The password is required",
  INVALID_PASSWORD: "The password is invalid",

  INVALID_CONTENT: "The content is invalid!",
  CONTENT_REQUIRED: "The content is required",

  INVALID_IMAGE: "The image is invalid",

  CARD_CONFIRM_MESSAGE: "Do you want to delete this card",
  LANGUAGE_CONFIRM_MESSAGE: "Do you want to delete this language",

  EXIST_LANGUAGE: "Language is exist",
};

/**
 * Message for alert the error while fetching or rendering.
 */
export const ERROR_MESSAGE = {
  LOGIN_VALIDATION: "Login failed, please check your username or password",
  INVALID_INFORMATION: "Something maybe is wrong in your information!",

  ADD_CARD: "Couldn't add card",
  ADD_LANGUAGE: "Couldn't add language",

  EDIT_CARD: "Couldn't edit card",

  DELETE_CARD: "Couldn't add card ",
  DELETE_LANGUAGE: "Couldn't add language ",

  GET_LANGUAGE_LIST: "Server error! Couldn't load language list",
  GET_CARD_LIST: "Server error! Couldn't load card list",

  SERVER_ERROR: "Server Error! Please try again later",
};

/**
 * Message for alert if the action be done successfully.
 */
export const SUCCESS_MESSAGE = {
  LOGIN_VALIDATION: "Login successfully",
  ADD_CARD: "Add card successfully",
  ADD_LANGUAGE: "Add language successfully",

  EDIT_CARD: "Edit card successfully",

  DELETE_CARD: "Delete card successfully",
  DELETE_LANGUAGE: "Delete language successfully",
};

/**
 * Regex for form validator.
 */
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  LANGUAGE: /^[^\d\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/,
  CONTENT: /^.{1,128}$/,
  IMAGE: /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp)$/,
};

export const REQUEST_STATE = {
  SUCCESS: "success",
  FAILED: "failed",
};

/**
 * Three types of forms in this app
 */
export const DATA_SOURCES = {
  USER: "user",
  CARD: "card",
  LANGUAGE: "language",
};

export const FORM_INPUT = {
  EMAIL: "email",
  PASSWORD: "password",

  LANGUAGE: "language",
  WORD: "word",
  MEANING: "meaning",
  DESCRIPTION: "description",
  CAPTION_PHOTO: "captionPhoto",
};

export const DEFAULT_VALUES = {
  EMPTY_STRING: "",
  EMPTY_ARRAY: [],
};

export const API_REQUEST = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PATCH: "PATCH",
};
