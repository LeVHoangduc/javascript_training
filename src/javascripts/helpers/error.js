class Error {
  constructor() {}
  showError(inputEl, errorEl, message) {
    inputEl.classList.add("error");
    errorEl.textContent = message;
    errorEl.classList.add("active");
  }

  clearError(inputEl, errorEl) {
    inputEl.classList.remove("error");
    errorEl.textContent = "";
    errorEl.classList.remove("active");
  }
}

export default Error;
