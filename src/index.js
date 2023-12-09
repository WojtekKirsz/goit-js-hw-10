import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const loader = document.querySelector('p.loader');
const breedsSelect = document.querySelector('select.breed-select');
const catInfo = document.querySelector('div.cat-info');
const error = document.querySelector('p.error');

loader.classList.remove('hidden');
breedsSelect.classList.add('hidden');
catInfo.classList.add('hidden');

const breeds = document.querySelector('#breeds');

fetchBreeds()
  .then(data => {
    const html = data
      .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
      .join('');
    0;
    breeds.innerHTML = html;
    loader.classList.add('hidden');
    breedsSelect.classList.remove('hidden');
  })
  .catch(() => {
    loader.classList.add('hidden');
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    error.classList.add('show-error');
  });

breeds.addEventListener('change', ev => {
  const breedId = ev.target.value;

  loader.classList.remove('hidden');
  catInfo.classList.add('hidden');
  error.classList.remove('show-error');

  fetchCatByBreed(breedId)
    .then(cats => {
      const array = cats.map(
        cat =>
          `<h2>Cat Name: ${cat.breeds[0].name}</h2>
          <h2>${cat.breeds[0].description}</h2>
          <h2>${cat.breeds[0].temperament}</h2>
          <img width="800" height="600" src="${cat.url}"/>`
      );
      effect.innerHTML = array.join('');
      loader.classList.add('hidden');
      catInfo.classList.remove('hidden');
    })
    .catch(() => {
      loader.classList.add('hidden');
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      error.classList.add('show-error');
    });
});
