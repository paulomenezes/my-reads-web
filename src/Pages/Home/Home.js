import React, { Component } from 'react';

import './Home.css';

import Book from '../../Components/Book/Book';
import BookShelf from '../../Components/BookShelf/BookShelf';
import { getUser } from '../../Services/User';
import { getAll, userShelves } from '../../Services/Books';

export default class App extends Component {
  state = {
    user: getUser(),
    books: [],
    shelves: []
  };

  async componentDidMount() {
    if (this.state.user) {
      try {
        const { books, shelves } = await userShelves(this.state.user.id);
        this.setState({
          books,
          shelves
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  onUpdateShelf = (shelf, bookId) => {
    this.setState(prevState => ({
      shelves: prevState.shelves.map(s => ({ ...s, shelf: s.book === bookId ? shelf : s.shelf }))
    }));
  };

  render() {
    return (
      <section>
        <div className="container">
          <div className="columns">
            <div className="column is-8">
              <div className="book-category-title">CURRENTLY READING</div>
              <BookShelf
                onUpdateShelf={this.onUpdateShelf}
                shelves={this.state.shelves}
                books={this.state.books}
                shelf="CURRENTLY_READING"
                placeholder="No currently reading books"
              />
              <div className="book-category-title">WANT TO READ</div>
              <BookShelf
                onUpdateShelf={this.onUpdateShelf}
                shelves={this.state.shelves}
                books={this.state.books}
                shelf="WANT_TO_READ"
                placeholder="No want to read books"
              />
              <div className="book-category-title">READ</div>
              <BookShelf
                onUpdateShelf={this.onUpdateShelf}
                shelves={this.state.shelves}
                books={this.state.books}
                shelf="READ"
                placeholder="No read books"
              />
            </div>
            <div className="column is-4">
              <div className="book-category-title">UPDATES</div>
              <i>No updates</i>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
