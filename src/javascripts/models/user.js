class User {
  /**
   * Constructor of User object
   * @param {Object} data
   */
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
  }
}

export default User;
