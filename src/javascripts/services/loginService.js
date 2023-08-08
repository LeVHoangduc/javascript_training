import API_GATEWAY_URL from "../constants/urls";
import ApiRequest from "../helpers/apiRequest";

class LoginService {
  constructor() {
    this.apiRequest = new ApiRequest(API_GATEWAY_URL, "/users");
  }

  /**
   * Get user by Id from database.
   * @returns {Object} User object
   */
  getUsers = async () => {
    const data = await this.apiRequest.get();
    return data;
  };
}

export default LoginService;
