import API_GATEWAY_URL from "../constants/urls";
import ApiRequest from "./apiRequest";

class LoginService {
  constructor() {
    this.apiRequest = new ApiRequest(API_GATEWAY_URL, "/users");
  }

  /**
   * Get user list from database and returns for users model.
   * @returns {Object} User object
   */
  getUserList = async () => {
    const data = await this.apiRequest.get();
    return data;
  };
}

export default LoginService;
