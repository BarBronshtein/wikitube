'use strict';

const YT_KEY = 'AIzaSyAC6UbsLvhWzk9vWqc9EJBZ4lXWcgUuOqA';
const URL_YT = `https://www.googleapis.com/youtube/v3/search?part=snippet
&videoEmbeddable=true&type=video&key=${YT_KEY}&q=`; //${value};
const STORAGE_KEY_YT = 'ytDB';
const STORAGE_KEY_WIKI = 'wikiDB';

const URL_WIKI =
  'https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=$';

function getSearchResults(value) {
  let casheYT = loadFromStorage(STORAGE_KEY_YT) || {};
  if (casheYT[value]) return Promise.resolve(casheYT[value]);
  return fetch(URL_YT + value)
    .then(res => res.json())
    .then(res => {
      const newRes = res.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.default.url,
      }));
      casheYT[value] = newRes;
      saveToStorage(STORAGE_KEY_YT, casheYT);
      return casheYT[value];
    });
}

function getWikiResults(value) {
  let casheWiki = loadFromStorage(STORAGE_KEY_WIKI) || {};
  if (casheWiki[value]) return Promise.resolve(casheWiki[value]);
  return fetch(URL_WIKI + value + '&format=json')
    .then(res => res.json())
    .then(res => {
      const newRes = res.query.search.map(res => ({
        title: res.title,
        snippet: res.snippet,
        pageId: res.pageid,
      }));
      casheWiki[value] = newRes.slice(0, 2);
      saveToStorage(STORAGE_KEY_WIKI, casheWiki);
      return casheWiki[value];
    });
}
