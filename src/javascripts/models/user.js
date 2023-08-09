import LoginService from "../services/loginService";

class Users {
  constructor() {
    this.service = new LoginService();
    this.userList;
  }

  /**
   * Method to get list of users from service
   * @returns {Object} userList object
   */
  getUserList = async () => {
    this.userList = await this.service.getUserList();
    return this.userList;
  };
}

export default Users;
