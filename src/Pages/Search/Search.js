import React from 'react';
import queryString from 'query-string';

import { search, userShelves } from '../../Services/Books';

import Book from '../../Components/Book/Book';
import { getUser } from '../../Services/User';

class Search extends React.Component {
  state = {
    books: [],
    loading: false,
    shelves: [],
    user: getUser()
  };

  async componentDidMount() {
    await this.search(this.props.location.search);

    try {
      if (this.state.user.id) {
        const { shelves } = await userShelves(this.state.user.id);
        console.log(shelves);
        this.setState({
          shelves
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async componentWillReceiveProps(nextProps, nextState) {
    await this.search(nextProps.location.search);
  }

  search = async queryParam => {
    try {
      this.setState({
        loading: true
      });

      const query = queryString.parse(queryParam);
      let books = await search(query.q);

      if (books && books.error) {
        books = [];
      }

      this.setState({
        loading: false,
        books
      });
    } catch (error) {
      console.log(error);
    }
  };

  onUpdateShelf = async (shelf, book) => {};

  getBookShelf = bookId => {
    const shelf = this.state.shelves.filter(shelf => shelf.book === bookId);
    return shelf && shelf.length > 0 ? shelf[0].shelf : 'NONE';
  };

  render() {
    return (
      <section>
        <div className="container">
          <div>
            {this.state.loading && <i>Carregando...</i>}
            {!this.state.loading && this.state.books.length === 0 && <i>No book found</i>}
          </div>
          <div className="columns is-multiline">
            {this.state.books.map(book => (
              <div className="column is-2" key={book.id}>
                <Book book={book} shelf={this.getBookShelf(book.id)} onUpdateShelf={shelf => this.onUpdateShelf(shelf, book)} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
