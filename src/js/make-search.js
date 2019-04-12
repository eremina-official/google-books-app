/* this module handles querying API with the provided keywords */

import { renderSearchResults } from './render-results.js';

//cache DOM, declare variables
const form = document.querySelector('.js-form');
const input = document.querySelector('.js-keyword-input');

//bind events
form.addEventListener('submit', makeSearch);

//function declarations
/* prevent default form submission and add custom form handling */
function makeSearch(event) {
  event.preventDefault();

  /* reset variables and clear the page before new search */
  currentStartIndex = 0;
  searchResults.innerHTML = '';

  const url = composeUrl();
  sendRequest(url);
}

/* compose URL to query API with provided keywords */
function composeUrl() {
  const keywords = input.value;
  const encodedKeywords = keywords.replace(/_/g, '%20');
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedKeywords}`;
  return url;
}

/* call the API */
function sendRequest(url) {
  fetch(url)
    .then(response => response.json())
    .then(searchData => {
      renderSearchResults(searchData)
    })
    .catch(error => console.log(error));
}
