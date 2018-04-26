import React from 'react';
import PropTypes from 'prop-types';

import UpdateShelf from '../UpdateShelf';

function Book(props) {
  return (
    <div>
      <div className="book-cover">
        <img alt={props.title} src={props.cover} />
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-author">{props.author}</div>
      <UpdateShelf value={props.shelf} />
    </div>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired
};

export default Book;
