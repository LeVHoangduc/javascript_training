/**
 * Message for the form validator.
 */
export const MESSAGE = {
  USERNAME_REQUIRED: "The username is required",
  INVALID_USERNAME: "The username is invalid",
  PASSWORD_REQUIRED: "The password is required",
  INVALID_PASSWORD: "The password is invalid",
  INVALID_CONTENT: "The content is invalid!",
  CONTENT_REQUIRED: "The content is required",
  INVALID_IMAGE: "The image is invalid",
};

/**
 * Message for alert the error while fetching or rendering.
 */
export const ERROR_MESSAGE = {
  LOGIN_VALIDATION: "Login failed, please check your username or password",
  ADD_CARD: "Couldn't add card",
  SERVER_ERROR: "Server Error! Please try again later",
};

/**
 * Message for alert if the action be done successfully.
 */
export const SUCCESS_MESSAGE = {
  LOGIN_VALIDATION: "Login successfully",
  ADD_CARD: "Add card successfully",
};

/**
 * Regex for form validator.
 */
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
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
