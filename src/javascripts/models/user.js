import ApiService from "../services/apiService";
class User {
  constructor() {
    this.service = new ApiService();
    this.userList;
  }

  /**
   * Function to get list of users from service
   * @returns {Object} userList object
   */
  getUserList = async () => {
    this.userList = await this.service.getList("/users");

    return this.userList;
  };

  /**
   * Method to check user current is valid
   * @param {Object} userCurrent
   * @returns {Boolean} is exist user
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
