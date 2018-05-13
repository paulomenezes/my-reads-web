import { MY_READS_API, GOOGLE_BOOKS } from '../constants';

const myReadsApi = `${MY_READS_API}books/`;

export const search = (query, page = 0, maxResults = 12) =>
  fetch(`${GOOGLE_BOOKS}?q=${query}&maxResults=${maxResults}&startIndex=${page * maxResults}`)
    .then(res => res.json())
    .then(data => data.items);

export const get = bookId => fetch(`${MY_READS_API}books/${bookId}`).then(res => res.json());

export const userShelves = userId => fetch(myReadsApi + userId + '/shelves').then(res => res.json());

export const userBooks = userId => fetch(myReadsApi + userId + '/books').then(res => res.json());

export const updateShelf = (book, shelf, userId) =>
  fetch(myReadsApi, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf, book, user: userId })
  });
