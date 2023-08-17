class Template {
  constructor() {}

  /**
   * HTML template for rendering Language information.
   * @param {Object} language - The language object to be rendered.
   * @returns {HTMLElement} HTML element for displaying Language in a list.
   */
  static renderLanguage = (language) =>
    `
      <li class="text text--xl text--capitalize language__item" data-id="${language.id}" type="language">
        ${language.language}
        <img src="/delete.e0c1e186.svg" alt="icon-delete" class="language__delete" />
      </li>`;

  /**
   * HTML template for rendering a Card.
   * @param {Object} card - The card object to be rendered.
   * @returns {HTMLElement} HTML element representing a Card.
   */
  static renderCard = (card) =>
    `
      <div class="card" data-id="${card.id}">
        <img class="card__picture" src="${card.descriptionPhoto}" alt="picture" type="card"/>
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
}

export default Template;
