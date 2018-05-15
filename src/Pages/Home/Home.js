import React, { Component } from 'react';

import './Home.css';

import BookShelf from '../../Components/BookShelf/BookShelf';
import { getUser } from '../../Services/User';
import { userBooks } from '../../Services/Books';

export default class App extends Component {
  state = {
    user: getUser(),
    books: [],
    shelves: [],
    shelvesNames: ['currently reading', 'want to read', 'read']
  };

  async componentDidMount() {
    if (this.state.user) {
      try {
        const { books } = await userBooks(this.state.user.id);
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
            <div className="column">
              {this.state.shelvesNames.map(shelf => (
                <BookShelf key={shelf} onUpdateShelf={this.props.onUpdateShelf} shelves={this.props.shelves} books={this.state.books} title={shelf} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
