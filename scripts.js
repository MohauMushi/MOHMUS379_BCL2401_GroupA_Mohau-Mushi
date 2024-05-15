import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

import { data, searchResultFragment, bookListFragment, genreFragment, authorFragment } from './element.js';


let page = 1;
let matches = books;

// Declared `firstPageResults` variable which will hold the 36 books for the initial page load.

/** `firstPageResults` is a array of the initial 36 `BOOKS_PER_PAGE` from the user's search before they click 'show more'. */
let firstPageResults = [];

/**
 * Extracts the initial results for the first page load.
 *
 * @param {Object[]} object - The array of objects (books) to extract the initial results from.
 * @returns {Object[]} The array of objects (books) for the first page.
 */

const initialResultsExtraction = (object) => {
  // Slicing the object based on the `BOOKS_PER_PAGE` to get the initial 36 results
  firstPageResults = object.slice(0, BOOKS_PER_PAGE);
  return firstPageResults;
};
// Calling `initialResultsExtraction` function for the first page load,
initialResultsExtraction(books);

/**
 * Creates a book preview element.
 *
 * @param {Object} book - The book object containing details for creating the preview.
 * @param {string} book.author - The author ID of the book.
 * @param {string} book.id - The unique ID of the book.
 * @param {string} book.image - The URL of the book's cover image.
 * @param {string} book.title - The title of the book.
 * @returns {HTMLButtonElement} The created book preview element.
 */
const createBook = ({ author, id, image, title }) => {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);

  element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

  return element;
};

/**
 * Renders the book list by appending book preview elements to a container.
 *
 * @param {Object[]} object - The array of objects (books) to render the book list for.
 * @param {DocumentFragment} container - The document fragment to append the book preview elements to.
 */

const renderBookList = (object, container) => {
  /** The below for...of loop loops through the given object and calls the `createBook` function for each book in the object. */
  for (const { author, id, image, title } of object) {
    // The book it's hold the element for the createBook function for each book.
    const book = createBook({
      author,
      image,
      id,
      title,
    });
    container.appendChild(book);

    data.list.items.appendChild(container);
  }
};

renderBookList(firstPageResults, bookListFragment);

/********************************* Genre ******************************************/

// Created the createGenreOption function
/**
 * Creates the 'all genres' option for the genre dropdown list.
 */
const createGenreOption = () => {
  /** `genreOption` it creates and holds a new HTML 'option' element for the
   *  'All Genres' option. This needs to be done separately from the other genres,
   *   because it will have the value of 'any'.
   */
  const genreOption = document.createElement("option");

  genreOption.value = "any";

  genreOption.innerText = "All Genres";

  genreFragment.appendChild(genreOption);
};
// Called the createGenreOption function
createGenreOption();

/**
 * Populates the genre dropdown list with all genres.
 */
const populateGenre = () => {
  for (const [id, name] of Object.entries(genres)) {
    /** `genreElement` creates and holds an HTML 'option' element for our dropdown list
     * that contains the genre id and genre name. */
    const genreElement = document.createElement("option");
    genreElement.value = id;
    genreElement.innerText = name;
    genreFragment.appendChild(genreElement);
  }

  data.search.genres.appendChild(genreFragment);
};

// Called the populateGenre
populateGenre();

/****************************** Author *****************************************/

// Created the createAuthorOption
/**
 * Creates the 'all authors' option for the author dropdown list.
 */

const createAuthorOption = () => {
  /** `authorOption` it creates and holds a new HTML 'option' element for the
   *  'All Author' option. This needs to be done separately from the other authors,
   *   because it will have the value of 'any'.
   */
  const authorOption = document.createElement("option");
  authorOption.value = "any";
  authorOption.innerText = "All Authors";
  authorFragment.appendChild(authorOption);
};

// Calling the createAuthorOption function
createAuthorOption();

// Created the populateAuthorDropdown function ↓
/**
 * Populates the author dropdown list with all of the authors.
 */
const populateAuthorDropdown = () => {
  for (const [id, name] of Object.entries(authors)) {
    /** `authorElement` creates and holds an HTML 'option' element for the dropdown list
     * that contains the author id and author name. */
    const authorElement = document.createElement("option");
    authorElement.value = id;
    authorElement.innerText = name;
    authorFragment.appendChild(authorElement);
  }

  data.search.authors.appendChild(authorFragment);
};

// Called the populateAuthorDropDown
populateAuthorDropdown();

/*******************************************************************************************/

if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  data.settings.theme.value = "night";
  document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
  document.documentElement.style.setProperty("--color-light", "10, 10, 20");
} else {
  data.settings.theme.value = "day";
  document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
  document.documentElement.style.setProperty("--color-light", "255, 255, 255");
}

data.list.button.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
data.list.button.disabled = matches.length - page * BOOKS_PER_PAGE > 0;

data.list.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})</span>
`;

/**
 * Sets up event listeners for various UI elements.
 */
function setupEventListeners() {
  /**
   * An Event listener for the search cancel button.
   *
   * When the search cancel button is clicked, it closes the search overlay.
   */
  data.search.cancel.addEventListener("click", () => {
    data.search.overlay.open = false;
  });

  /**
   * An Event listener for the settings cancel button.
   *
   * When the settings cancel button is clicked, it closes the settings overlay.
   */
  data.settings.cancel.addEventListener("click", () => {
    data.settings.overlay.open = false;
  });

  /**
   * An Event listener for the header search button.
   *
   * When the header search button is clicked, it opens the search overlay
   * and focuses the search title input field.
   */
  data.header.search.addEventListener("click", () => {
    data.search.overlay.open = true;
    data.search.title.focus();
  });

  /**
   * An Event listener for the header settings button.
   *
   * When the header settings button is clicked, it opens the settings overlay.
   */
  data.header.settings.addEventListener("click", () => {
    data.settings.overlay.open = true;
  });

  /**
   * An Event listener for the close button in the active book details section.
   *
   * When the close button is clicked, it closes the active book details section.
   */
  data.list.close.addEventListener("click", () => {
    data.list.active.open = false;
  });
}

/**
 * Updates the theme settings based on the selected option.
 *
 * @param {string} theme - The theme option ('night' or 'day').
 */
function updateThemeSettings(theme) {
  if (theme === "night") {
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }
}

/**
 * Handles the form submission event for the settings form.
 *
 * @param {Event} event - The form submission event.
 */
function handleSettingsFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);
  updateThemeSettings(theme);
  data.settings.overlay.open = false;
}

// Event listener for settings form submission
data.settings.form.addEventListener("submit", handleSettingsFormSubmit);

/**
 * Renders an HTML button element representing a book preview.
 *
 * @param {Object} book - The book object containing book details.
 * @param {string} book.id - The unique identifier of the book.
 * @param {string} book.image - The URL of the book's cover image.
 * @param {string} book.title - The title of the book.
 * @param {string} book.author - The identifier of the book's author.
 * @returns {HTMLButtonElement} The created button element representing the book preview.
 */
function renderBookPreview(book) {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", book.id);
  element.innerHTML = `
      <img class="preview__image" src="${book.image}" />
      <div class="preview__info">
        <h3 class="preview__title">${book.title}</h3>
        <div class="preview__author">${authors[book.author]}</div>
      </div>
    `;
  return element;
}

/**
 * Renders the book list by creating book preview elements.
 *
 * @param {Object[]} books - An array of book objects.
 */
function renderBooksList(books) {
  const newItems = document.createDocumentFragment();
  for (const book of books) {
    const bookPreviewElement = renderBookPreview(book);
    newItems.appendChild(bookPreviewElement);
  }
  data.list.items.innerHTML = "";
  data.list.items.appendChild(newItems);
}

// Function to update the "Show more" button
/**
 * Updates the "Show more" button's content and disabled state.
 */
function updateShowMoreButton() {
  data.list.button.disabled = matches.length - page * BOOKS_PER_PAGE < 1;
  data.list.button.innerHTML = `
      <span>Show more</span>
      <span class="list__remaining">
        (${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})
      </span>
    `;
}

/**
 * Handles the form submission event.
 *
 * @param {Event} event - The form submission event.
 */
function handleFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = filterBooks(books, filters);
  matches = result;

  if (result.length < 1) {
    data.list.message.classList.add("list__message_show");
  } else {
    data.list.message.classList.remove("list__message_show");
  }

  page = 1;
  renderBooksList(result.slice(0, BOOKS_PER_PAGE));
  updateShowMoreButton();
  window.scrollTo({ top: 0, behavior: "smooth" });
  data.search.overlay.open = false;
}

/**
 * Filters the books based on the provided filters.
 *
 * @param {Object[]} books - An array of book objects.
 * @param {Object} filters - An object containing the filter values.
 * @param {string} filters.genre - The genre filter value.
 * @param {string} filters.title - The title filter value.
 * @param {string} filters.author - The author filter value.
 * @returns {Object[]} An array of filtered book objects.
 */
function filterBooks(books, filters) {
  const result = [];
  for (const book of books) {
    let genreMatch = filters.genre === "any";
    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }
    if (
      (filters.title.trim() === "" ||
        book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === "any" || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }
  return result;
}

/**
 * Function it Renders additional book previews on the page.
 *
 * This function is responsible for appending new book preview elements to the page
 * based on the current page number and the matches array.
 */
function renderAdditionalBookPreviews() {
  const fragment = document.createDocumentFragment();
  for (const book of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    const bookPreviewElement = renderBookPreview(book);
    fragment.appendChild(bookPreviewElement);
  }
  data.list.items.appendChild(fragment);
  page += 1;
}

/**
 * Functions it Handles the click event on book previews.
 *
 * @param {Event} event - The click event object.
 */
function handleBookPreviewClick(event) {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;
  for (const node of pathArray) {
    if (active) break;
    if (node?.dataset?.preview) {
      let result = null;
      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }
      active = result;
    }
  }

  if (active) {
    updateActiveBookDetails(active);
  }
}

// Function to update active book details
/**
 * Updates the active book details section with the provided book information.
 *
 * @param {Object} book - The book object containing the details to be displayed.
 * @param {string} book.image - The URL of the book's cover image.
 * @param {string} book.title - The title of the book.
 * @param {string} book.author - The identifier of the book's author.
 * @param {string} book.published - The publication date of the book.
 * @param {string} book.description - The description of the book.
 */
function updateActiveBookDetails(book) {
  data.list.active.open = true;
  data.list.blur.src = book.image;
  data.list.image.src = book.image;
  data.list.title.innerText = book.title;
  data.list.subtitle.innerText = `${authors[book.author]} (${new Date(book.published).getFullYear()})`;
  data.list.description.innerText = book.description;
}

// Event listener for form submission
data.search.form.addEventListener("submit", handleFormSubmit);
data.list.button.addEventListener("click", renderAdditionalBookPreviews);
data.list.items.addEventListener("click", handleBookPreviewClick);

document.addEventListener("DOMContentLoaded", function () {
  init(); // init is called after the DOM is fully loaded
});

function init() {
  setupEventListeners();
}
