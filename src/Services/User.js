import { MY_READS_API } from '../constants';

const myReadsApi = `${MY_READS_API}users/`;

export const getUser = () => {
  const user = localStorage.getItem('user');

  if (user) {
    return JSON.parse(user);
  }

  return null;
};

export const login = user =>
  fetch(`${myReadsApi}login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

export const register = user =>
  fetch(myReadsApi, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

export const checkUsernameAndEmail = (field, value) =>
  fetch(`${myReadsApi}check`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      field,
      value
    })
  });
