import ApiService from "../services/apiService";
class User {
  constructor() {
    this.service = new ApiService("/users");
    this.userList;
  }

  /**
   * Method to get a list of users from the service.
   * @returns {Object[]} An array of user objects.
   */
  getUserList = () => {
    this.userList = this.service.getList();

    return this.userList;
  };

  /**
   * Method to check if the provided user credentials are valid.
   * @param {Object} - An object containing user credentials (email and password).
   * @returns {Boolean} True if the user is valid, otherwise false.
   */
  isValidUser = async ({ email, password }) => {
    const userList = await this.getUserList();
    const isValidUSer = userList.find((user) =>
      user.email === email && user.password === password ? true : false
    );

    return isValidUSer;
  };
}

export default User;
