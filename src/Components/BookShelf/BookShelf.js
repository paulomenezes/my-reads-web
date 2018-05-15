import React from 'react';
import PropTypes from 'prop-types';

import { titleToConstant } from '../../Utils/utils';

import Book from '../Book/Book';

function BookShelf(props) {
  const shelves = props.shelves.filter(shelf => shelf.shelf === titleToConstant(props.title));

  return (
    <div>
      <div className="category-title">{props.title}</div>
      {shelves.length === 0 ? (
        <i>No {props.title} books</i>
      ) : (
        <div className="columns is-multiline">
          {shelves.map(shelf => (
            <div className="column is-2" key={shelf._id}>
              {props.books
                .filter(book => book.id === shelf.book)
                .map(book => <Book key={book.id} book={book} shelf={shelf.shelf} onUpdateShelf={props.onUpdateShelf} />)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

BookShelf.propTypes = {
  shelves: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  onUpdateShelf: PropTypes.func.isRequired
};

export default BookShelf;
