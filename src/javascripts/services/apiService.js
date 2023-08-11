import API_BASE_URL from "../constants/urls";

class ApiService {
  /**
   * Constructor function for ApiService object.
   * @param {String} path - The endpoint path for the API.
   */
  constructor(path) {
    this.baseUrl = API_BASE_URL;
    this.path = path;
  }

  /**
   * Method to fetch a list of items from the API.
   * @return {Promise} A promise that resolves to the retrieved data.
   */
  getList = async () => {
    const data = await this.sendRequest(this.path, "GET");

    return data;
  };

  /**
   * Method to fetch details of an item from the API with the specified ID.
   * @param {String} id - The ID of the item to retrieve.
   * @return {Promise} A promise that resolves to the retrieved data.
   */
  getDetail = async (id) => {
    const data = await this.sendRequest(`${this.path}/${id}`, "GET");

    return data;
  };

  /**
   * MEthod to send an HTTP request to the API endpoint.
   * @param {String} path - The endpoint path for the request.
   * @param {String} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
   * @param {Object} body - The request body (optional).
   * @return {Promise} A promise that resolves to the server response data.
   * @throws {Error} If the request was not successful.
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
