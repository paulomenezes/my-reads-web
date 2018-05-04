import React from 'react';
import PropTypes from 'prop-types';

import Book from '../Book/Book';

function BookShelf(props) {
  const shelves = props.shelves.filter(shelf => shelf.shelf === props.shelf);

  if (shelves.length === 0) {
    return <i>{props.placeholder}</i>;
  }

  return (
    <div className="columns is-multiline">
      {shelves.map(shelf => (
        <div className="column is-3" key={shelf._id}>
          {props.books
            .filter(book => book.id === shelf.book)
            .map(book => <Book key={book.id} book={book} shelf={shelf.shelf} onUpdateShelf={props.onUpdateShelf} />)}
        </div>
      ))}
    </div>
  );
}

BookShelf.propTypes = {
  shelves: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  shelf: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
};

export default BookShelf;
