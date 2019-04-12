/* this module handles querying API with the provided keywords */

import { renderSearchResults } from './render-results.js';

//cache DOM, declare variables
const form = document.querySelector('.js-form');
const input = document.querySelector('.js-keyword-input');
const searchResults = document.querySelector('.js-search-results');
let currentStartIndex = 0;
/* ajaxRequestStatus keeps state of ajax call to avoid firing multiple ajax requests 
when the page is scrolled to bottom */
let ajaxRequestStatus = false;

//bind events
form.addEventListener('submit', makeSearch);
window.addEventListener('scroll', getMoreSearchResults);

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

/* load more search results when the page is scrolled to bottom */
function getMoreSearchResults() {
  if (
    searchResults.getBoundingClientRect().bottom <= window.innerHeight * 1.5 
    && !ajaxRequestStatus
  ) {
    ajaxRequestStatus = true;
    currentStartIndex += 10;
    const url = composeUrl();
    sendRequest(url);
  }
}

/* compose URL to query API with provided keywords */
function composeUrl() {
  const keywords = input.value;
  const encodedKeywords = keywords.replace(/_/g, '+');
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedKeywords}&startIndex=${currentStartIndex}`;
  return url;
}

/* call the API */
function sendRequest(url) {
  fetch(url)
    .then(response => response.json())
    .then(searchData => {
      renderSearchResults(searchData);
      ajaxRequestStatus = false;
    })
    .catch(error => console.log(error));
}
