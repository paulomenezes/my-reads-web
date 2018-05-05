import React, { Component } from 'react';

import './Home.css';

import BookShelf from '../../Components/BookShelf/BookShelf';
import { getUser } from '../../Services/User';
import { userShelves } from '../../Services/Books';

export default class App extends Component {
  state = {
    user: getUser(),
    books: [],
    shelves: []
  };

  async componentDidMount() {
    if (this.state.user) {
      try {
        const { books } = await userShelves(this.state.user.id);
        this.setState({
          books
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <section>
        <div className="container">
          <div className="columns">
            <div className="column is-8">
              <div className="book-category-title">CURRENTLY READING</div>
              <BookShelf
                onUpdateShelf={this.props.onUpdateShelf}
                shelves={this.props.shelves}
                books={this.state.books}
                shelf="CURRENTLY_READING"
                placeholder="No currently reading books"
              />
              <div className="book-category-title">WANT TO READ</div>
              <BookShelf
                onUpdateShelf={this.props.onUpdateShelf}
                shelves={this.props.shelves}
                books={this.state.books}
                shelf="WANT_TO_READ"
                placeholder="No want to read books"
              />
              <div className="book-category-title">READ</div>
              <BookShelf
                onUpdateShelf={this.props.onUpdateShelf}
                shelves={this.props.shelves}
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
