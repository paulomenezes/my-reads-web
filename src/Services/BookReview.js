import { MY_READS_API } from '../constants';

const myReadsApi = `${MY_READS_API}reviews/`;

export const insertReview = review =>
  fetch(myReadsApi, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  });
