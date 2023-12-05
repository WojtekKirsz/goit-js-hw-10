import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_cpWvh1PdHlSY1GaBwlNkgTcypjBAlPT488yP0A7OpiwD6S6N3UrDFptn9OmKcCN6';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get('/breeds').then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    })
    .catch(() => {
      throw new Error('Failed to fetch cat data');
    });
}
