import React, { Component } from 'react';
import './App.css';

import Header from '../Header/Header';
import Book from '../Book/Book';
import { getAll } from '../BooksAPI';

export default class App extends Component {
  state = {
    books: [],
    user: {
      shelves: {
        NONE: [],
        READ: [1],
        CURRENTLY_READING: [2],
        WANT_TO_READ: []
      }
    }
  };

  async componentDidMount() {
    try {
      const books = await getAll();
      this.setState({
        books: books.slice(0, 6)
      });
    } catch (error) {
      // console.log(error);
    }
  }

  onUpdateShelf = (shelf, bookId) => {
    const oldShelf = this.getBookShelf(bookId);
    const index = this.state.user.shelves[oldShelf].indexOf(bookId);

    let shelves = this.state.user.shelves;
    shelves[oldShelf].splice(index, 1);
    shelves[shelf].push(bookId);

    this.setState(prevState => ({
      user: {
        ...prevState.user,
        shelves
      }
    }));
  };

  getBookShelf = bookId => {
    let shelf = 'NONE';
    Object.keys(this.state.user.shelves).forEach(key => {
      var book = this.state.user.shelves[key].filter(item => item === bookId);
      if (book && book.length > 0) {
        shelf = key;
      }
    });

    return shelf;
  };

  render() {
    return (
      <section>
        <Header />
        <div className="container">
          <div className="columns">
            {this.state.books.map(book => (
              <div className="column is-2" key={book.id}>
                <Book book={book} shelf={this.getBookShelf(book.id)} onUpdateShelf={shelf => this.onUpdateShelf(shelf, book.id)} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
