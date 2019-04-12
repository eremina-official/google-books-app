/* this module handles rendering search results to the screen */

import '../css/search-results.css';

//cache DOM, declare variables
const searchResults = document.querySelector('.search-results');

//function declarations
function renderSearchResults(searchData) {
  if (searchData.items) {
    for (const item of searchData.items) {
      const searchResultsItem = document.createElement('div');
      searchResultsItem.setAttribute('class', 'search-results__item');

      const title = document.createElement('a');
      title.setAttribute('href', item.volumeInfo.infoLink);
      const titleContent = (item.volumeInfo.title) 
      ? item.volumeInfo.title 
      : 'No title available';
      title.textContent = titleContent;

      const thumbnail = document.createElement('img');
      const imageSrc = (item.volumeInfo.imageLinks) 
        ? item.volumeInfo.imageLinks.smallThumbnail 
        : '';
      const imageAlt = (item.volumeInfo.imageLinks) 
        ? 'thumbnail' 
        : 'No image available.';
      thumbnail.setAttribute('src', imageSrc);
      thumbnail.setAttribute('alt', imageAlt);
      thumbnail.setAttribute('class', 'thumbnail');

      const description = document.createElement('p');
      const descriptionContent = (item.volumeInfo.description) 
        ? `${item.volumeInfo.description.slice(0, 100)}...` 
        : 'No description available.'
      description.textContent = descriptionContent;
      description.setAttribute('class', 'description');

      searchResultsItem.appendChild(title);
      searchResultsItem.appendChild(thumbnail);
      searchResultsItem.appendChild(description);
      searchResults.appendChild(searchResultsItem);
    } 
  } else {
    searchResults.textContent = 'No results found.'
  }
}

export { renderSearchResults };