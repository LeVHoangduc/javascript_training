import API_BASE_URL from "../constants/urls";
import { API_REQUEST } from "../constants/constants";

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
   * @returns {Array}
   */
  getList = () => this.sendRequest(null, API_REQUEST.GET);

  /**
   * Method to fetch details of an item from the API.
   * @param {String} id - The ID of the item to retrieve.
   * @return {Promise<Object>} A promise that resolves to the retrieved data.
   */

  getDetail = (id) => this.sendRequest(id, API_REQUEST.GET);

  /**
   * Send POST HTTP request.
   * @param {Object} data
   * @returns {Promise<Object>} response from server.
   */
  postItem = (data) => this.sendRequest(null, API_REQUEST.POST, data);

  /**
   * Send DELETE HTTP request.
   * @param {String} id
   * @returns {Promise<Object>} response from server.
   */
  deleteItem = (id) => this.sendRequest(id, API_REQUEST.DELETE);

  /**
   * Send PATCH HTTP request.
   * @param {String} id - The ID of the item to be updated.
   * @param {Object} data - The data to update the item with.
   * @returns {Promise<Object>} - The response from the server.
   */
  updateItem = (id, data) => this.sendRequest(id, API_REQUEST.PATCH, data);

  /**
   * MEthod to send an HTTP request to the API endpoint.
   * @param {String} path - The endpoint path for the request.
   * @param {String} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
   * @param {Object} body - The request body (optional).
   * @return {Promise} A promise that resolves to the server response data.
   * @throws {Error} If the request was not successful.
   */
  sendRequest = async (id, method, body) => {
    const url = `${this.baseUrl}${this.path}${id ? `/${id}` : ""}`;
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
