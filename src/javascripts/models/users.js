import LoginService from "../services/loginService";

class Users {
  constructor() {
    this.service = new LoginService();
    this.userList;
  }

  /**
   *
   * @param {*} id
   * @returns {Object} List user object
   */
  getUserList = async (id) => {
    this.userList = await this.service.getUserList(id);
    return this.userList;
  };
}

export default Users;
