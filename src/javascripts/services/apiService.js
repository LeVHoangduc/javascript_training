import API_BASE_URL from "../constants/urls";

class ApiService {
  /**
   * Constructor function for ApiService object.
   * @param {String} path
   */
  constructor(path) {
    this.baseUrl = API_BASE_URL;
    this.path = path;
  }

  /**
   * Method to return an array of object list
   * @param {String} url
   * @returns {Array}
   */
  getList = async (url) => {
    const data = await this.sendRequest(url, "GET");
    return data;
  };

  /**
   * Send the HTTP request to the API_BASE_URL endpoint.
   * @param {String} method
   * @param {Object} body
   * @return {Object|Array} response from server.
   */
  sendRequest = async (path, method, body) => {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error while sending request");
    }
  };
}

export default ApiService;
