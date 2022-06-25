'use strict';
const gElResults = document.querySelector('.top-results');
const VID_URL = 'https://www.youtube.com/embed/';
const gElFrame = document.querySelector('iframe');
const gElWiki = document.querySelector('.wiki-results');
function onSetSearchTo(ev, elForm) {
  ev.preventDefault();
  const elInput = elForm.querySelector('input');
  if (elInput.value.length < 3) return (elInput.value = '');
  getSearchResults(elInput.value).then(renderVids);
  getWikiResults(elInput.value).then(renderInfo);

  elInput.value = '';
}

function onInit() {
  getSearchResults('beatles').then(renderVids);
  getWikiResults('beatles').then(renderInfo);
}

function renderVids(vids) {
  let html = '';
  vids.forEach(
    vid =>
      (html += ` <article class="flex align-center " onclick="showSelcetedVid('${vid.id}')" class="result">
    <img src="${vid.imgUrl}">
    <p>${vid.title}</p>
  </article>`)
  );
  showSelcetedVid(vids[0].id);
  gElResults.innerHTML = html;
}

function renderInfo(data) {
  console.log(data);
  let html = '';
  data.forEach(
    data =>
      (html += `<div class="wiki-desc">
    <a href="http://en.wikipedia.org/?curid=${data.pageId}" target="_blank">
    <h2>${data.title}
    </h2>
    <p>${data.snippet}</p>
    </a>
    </div>`)
  );
  gElWiki.innerHTML = html;
}

function showSelcetedVid(id) {
  gElFrame.src = VID_URL + id;
}
