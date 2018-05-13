import React from 'react';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

import { search } from '../../Services/Books';

import Book from '../../Components/Book/Book';
import { getUser } from '../../Services/User';

class Search extends React.Component {
  state = {
    books: [],
    loading: false,
    query: '',
    user: getUser()
  };

  async componentDidMount() {
    await this.search(this.props.search ? '?q=' + this.props.search : this.props.location.search);
  }

  async componentWillReceiveProps(nextProps, nextState) {
    if (this.state.query !== nextProps.location.search) {
      await this.search(nextProps.location.search);
    }
  }

  search = async queryParam => {
    try {
      this.setState({
        loading: true,
        query: queryParam
      });

      const query = queryString.parse(queryParam);
      let books = await search(query.q, 1, this.props.maxItems ? this.props.maxItems : 20);

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

  getBookShelf = bookId => {
    const shelf = this.props.shelves.filter(shelf => shelf.book === bookId);
    return shelf && shelf.length > 0 ? shelf[0].shelf : 'NONE';
  };

  render() {
    return (
      <section>
        <div className={!this.props.column ? 'container' : ''}>
          <div>
            {this.state.loading && <i>Carregando...</i>}
            {!this.state.loading && this.state.books.length === 0 && <i>No book found</i>}
          </div>
          <div className="columns is-multiline">
            {this.state.books.map(book => (
              <div className={`column ${this.props.column ? this.props.column : 'is-2'}`} key={book.id}>
                <Book book={book} shelf={this.getBookShelf(book.id)} onUpdateShelf={this.props.onUpdateShelf} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Search);
