import React, { Component } from 'react';

import './Home.css';

import Book from '../../Components/Book/Book';
import { getAll } from '../../Services/BooksAPI';

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
    // try {
    //   const books = await getAll();
    //   this.setState({
    //     books: books.slice(0, 3)
    //   });
    // } catch (error) {
    //   // console.log(error);
    // }
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
        <div className="container">
          <div className="columns">
            <div className="column is-6">
              <div className="book-category-title">CURRENTLY READING</div>
              <i>No currently reading books</i>
              {/* <div className="columns">
                {this.state.books.map(book => (
                  <div className="column is-4" key={book.id}>
                    <Book book={book} shelf={this.getBookShelf(book.id)} onUpdateShelf={shelf => this.onUpdateShelf(shelf, book.id)} />
                  </div>
                ))}
              </div> */}
              <div className="book-category-title">WANT TO READ</div>
              <i>No want to read books</i>
              <div className="book-category-title">READ</div>
              <i>No read books</i>
            </div>
            <div className="column is-6">
              <div className="book-category-title">UPDATES</div>
              <i>No updates</i>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
