/**
 * Message for the form validator.
 */
export const MESSAGE = {
  EMAIL_REQUIRED: "The username is required",
  INVALID_EMAIL: "The username is invalid",

  PASSWORD_REQUIRED: "The password is required",
  INVALID_PASSWORD: "The password is invalid",

  INVALID_CONTENT: "The content is invalid!",
  CONTENT_REQUIRED: "The content is required",

  INVALID_IMAGE: "The image is invalid",

  CARD_CONFIRM_MESSAGE: "Do you want to delete this card",
  LANGUAGE_CONFIRM_MESSAGE: "Do you want to delete this language",
};

/**
 * Message for alert the error while fetching or rendering.
 */
export const ERROR_MESSAGE = {
  LOGIN_VALIDATION: "Login failed, please check your username or password",
  INVALID_INFORMATION: "Something maybe is wrong in your information!",
  ADD_CARD: "Couldn't add card",
  ADD_LANGUAGE: "Couldn't add language",
  SERVER_ERROR: "Server Error! Please try again later",
};

/**
 * Message for alert if the action be done successfully.
 */
export const SUCCESS_MESSAGE = {
  LOGIN_VALIDATION: "Login successfully",
  ADD_CARD: "Add card successfully",
  DELETE_CARD: "Delete card successfully",
  DELETE_LANGUAGE: "Delete language successfully",
};

/**
 * Regex for form validator.
 */
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  LANGUAGE: /^[a-z]+$/,
  CONTENT: /^.{1,128}$/,
  IMAGE: /^https?:\/\/.*\.(jpg|jpeg|png|gif|bmp)$/,
};

/**
 * Three types of forms in this app
 */
export const FORM_TYPES = {
  user: "user",
  card: "card",
  language: "language",
};
