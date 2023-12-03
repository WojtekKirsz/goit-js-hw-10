import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_cpWvh1PdHlSY1GaBwlNkgTcypjBAlPT488yP0A7OpiwD6S6N3UrDFptn9OmKcCN6';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

function fetchCatByBreed(breedId) {
  return axios.get(`/images/search?breed_ids=${breedId}`).then(response => {
    return response.data;
  });
}

const effect = document.querySelector('#effect');

/** @type {HTMLSelectElement | null} */
const breeds = document.querySelector('#breeds');

fetchBreeds().then(data => {
  // effect.insertAdjacentHTML('afterbegin', JSON.stringify(data));
  const html = data.map(
    breed => `<option value="${breed.id}">${breed.name}</option>`
  );
  breeds.innerHTML = html;
});

breeds.addEventListener('change', ev => {
  const breedId = ev.target.value;
  fetchCatByBreed(breedId).then(cats => {
    const array = cats.map(
      cat =>
        `<h2>Cat ID: ${cat.id}</h2><img width="800" height="600" src="${cat.url}"/>`
    );
    effect.innerHTML = array.join('');
  });
});
