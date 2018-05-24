import React from 'react';
import { withRouter } from 'react-router-dom';

import { search, insertBooks } from '../../Services/Books';

import Book from '../../Components/Book/Book';
import { getUser } from '../../Services/User';
import Loading from '../../Components/Loading/Loading';

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
    if (nextProps.location.search && this.state.query !== nextProps.location.search) {
      await this.search(nextProps.location.search);
    }
  }

  search = async queryParam => {
    try {
      let query = queryParam.substr(3);
      query = decodeURI(query);

      if (query && query.length > 0) {
        this.setState({
          loading: true,
          query: queryParam
        });

        let books = await search(query, 0, this.props.maxItems ? this.props.maxItems : 30);

        if (books && books.error) {
          books = [];
        } else {
          await insertBooks(books);
        }

        this.setState({
          loading: false,
          books
        });
      } else {
        this.setState({
          loading: false,
          books: []
        });
      }
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
            <Loading isLoading={this.state.loading} />
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
