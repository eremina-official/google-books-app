/* this module handles rendering search results to the screen */

//cache DOM, declare variables
const searchResults = document.querySelector('.search-results');

//function declarations
function renderSearchResults(searchData) {
  //console.log(searchData.items[0]);

  if (searchData.items) {
    for (const item of searchData.items) {
      const searchResultsItem = document.createElement('div');
      searchResultsItem.setAttribute('class', 'search-results__item');

      const title = document.createElement('a');
      title.setAttribute('href', item.volumeInfo.infoLink);
      title.textContent = item.volumeInfo.title;

      const thumbnail = document.createElement('img');
      const imageSrc = (item.volumeInfo.imageLinks) 
        ? item.volumeInfo.imageLinks.smallThumbnail 
        : '';
      thumbnail.setAttribute('src', imageSrc);
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