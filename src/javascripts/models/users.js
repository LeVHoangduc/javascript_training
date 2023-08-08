import LoginService from "../services/loginService";
import User from "./user";

class Users {
  constructor() {
    this.service = new LoginService();
    this.user = new User();
  }

  /**
   *
   * @param {*} id
   * @returns {Object} User object by Id
   */
  getUserById = async (id) => {
    this.user = await this.service.getUserById(id);
    return this.user;
  };
}

export default Users;
