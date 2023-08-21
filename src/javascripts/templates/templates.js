class Template {
  constructor() {}

  /**
   * HTML template for rendering Language information.
   * @param {Object} language - The language object to be rendered.
   * @returns {HTMLElement} HTML element for displaying Language in a list.
   */
  static renderLanguage = (language) =>
    `
      <li class="language__item" data-id="${language.id}" type="language">
          <p class="text text--xl text--capitalize">${language.language} </p>
        <img src="${require("../../assets/icons/delete.svg")}" alt="icon-delete" class="language__delete" />
      </li>`;

  /**
   * HTML template for rendering a Card.
   * @param {Object} card - The card object to be rendered.
   * @returns {HTMLElement} HTML element representing a Card.
   */
  static renderCard = (card) =>
    `
      <div class="card" data-id="${card.id}" type="card">
        <img class="card__picture" src="${
          card.captionPhoto ? card.captionPhoto : require("../../assets/images/flash-card.png")
        }" alt="picture" />
        <p class="text text--lg card__term">${card.word}</p>
        <p class="text text--blue text--lg card__type">${card.type}</p>
      </div>`;

  /**
   * HTML Template for the language list in a modal.
   * @param {Object} language - The language object to be rendered as a select option.
   * @returns {HTMLElement} HTML element for displaying a language in a select dropdown.
   */
  static renderSelectLanguage = (language) => `
    <option value="${language.language}" class="text text--capitalize">${language.language}</option>
  `;

  static renderEmpty = () => `<div class="card__list__empty">
    <img src="${require("../../assets/images/empty.png")}" alt="empty" />
    <p class="text text--md text--extrabold">Vocabulary not found</p>
    <p class="text text--md">Expand your search or add new vocabulary</p>
  </div>`;
}

export default Template;
