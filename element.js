// Created an object literal that holds all of our DOM element references
export const data = {
  list: {
    items: document.querySelector("[data-list-items]"),
    button: document.querySelector("[data-list-button]"),
    message: document.querySelector("[data-list-message]"),
    active: document.querySelector("[data-list-active]"),
    close: document.querySelector("[data-list-close]"),
    blur: document.querySelector("[data-list-blur]"),
    image: document.querySelector("[data-list-image]"),
    title: document.querySelector("[data-list-title]"),
    subtitle: document.querySelector("[data-list-subtitle]"),
    description: document.querySelector("[data-list-description]"),
  },
  search: {
    overlay: document.querySelector("[data-search-overlay]"),
    form: document.querySelector("[data-search-form]"),
    cancel: document.querySelector("[data-search-cancel]"),
    title: document.querySelector("[data-search-title]"),
    genres: document.querySelector("[data-search-genres]"),
    authors: document.querySelector("[data-search-authors]"),
  },
  settings: {
    overlay: document.querySelector("[data-settings-overlay]"),
    form: document.querySelector("[data-settings-form]"),
    cancel: document.querySelector("[data-settings-cancel]"),
    theme: document.querySelector("[data-settings-theme]"),
  },
  header: {
    search: document.querySelector("[data-header-search]"),
    settings: document.querySelector("[data-header-settings]"),
    help: document.querySelector("[data-header-help]"),
    add: document.querySelector("[data-header-add]"),
    order: document.querySelector("[data-header-order]"),
    grid: document.querySelector("[data-header-grid]"),
    list: document.querySelector("[data-header-list]"),
    title: document.querySelector("[data-header-title]"),
    subtitle: document.querySelector("[data-header-subtitle]"),
  },
};

//   Created a document fragment, which will be accessible throughout the file
export const searchResultFragment = document.createDocumentFragment();
export const bookListFragment = document.createDocumentFragment();
export const genreFragment = document.createDocumentFragment();
export const authorFragment = document.createDocumentFragment();
