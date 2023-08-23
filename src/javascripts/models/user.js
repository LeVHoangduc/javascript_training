import { helpers } from "../helpers/helpers";
import { DATA_SOURCES } from "../constants/constants";
import ApiService from "../services/apiService";

class User {
  constructor() {
    this.service = new ApiService("/users");
  }

  /**
   * Method to get a list of users from the service.
   * @returns {Promise} A promise that resolves to the retrieved data.
   */
  getUserList = () => {
    const data = this.service.getList();

    return data;
  };

  /**
   * Method to check if the provided user credentials are valid.
   * @param {Object} - An object containing user credentials (email and password).
   * @returns {Boolean} True if the user is valid, otherwise false.
   */
  isValidUser = async ({ email, password }) => {
    const userList = await this.getUserList();

    const validUSer = userList.find((user) =>
      user.email === email && user.password === password ? true : false
    );

    if (validUSer) {
      const email = validUSer.email;

      helpers.saveLocalStorage(DATA_SOURCES.USER, email);
    }

    return validUSer;
  };
}

export default User;
