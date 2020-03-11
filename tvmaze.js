/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */

// Searches show by name TVMaze API and returns array of curated objects.
// each obj contains show ID, name, summary, and image link (default img applied if none available)

async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  let showByNameUrl = "http://api.tvmaze.com/search/shows";
  let returnedShows = await axios.get(showByNameUrl, { params: { q: query }});
  let showSearchResults = [];
  for ( let i = 0; i < returnedShows.data.length; i++ ) {
    let showObj = {};
    showObj.id = returnedShows.data[i].show.id;
    showObj.name = returnedShows.data[i].show.name;
    showObj.summary = returnedShows.data[i].show.summary;
    if ( !returnedShows.data[i].show.image ) {
      showObj.image = 'https://thoughtcatalog.files.wordpress.com/2013/01/tv.jpg';
    } else {
      showObj.image = returnedShows.data[i].show.image.medium;
    }
    showSearchResults.push(showObj);
  }
  return showSearchResults;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <img class="card-img-top" src="${show.image}">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  let episodeSearchUrl = `http://api.tvmaze.com/shows/${id}/episodes`;
  let returnedEpisodes = await axios.get(episodeSearchUrl);
  return returnedEpisodes;
  // TODO: return array-of-episode-info, as described in docstring above
}
