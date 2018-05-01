import React from 'react';
import queryString from 'query-string';
import InfiniteScroll from 'react-infinite-scroller';

import { search } from '../../Services/BooksAPI';

import Book from '../../Components/Book/Book';

class Search extends React.Component {
  state = {
    books: [],
    query: '',
    hasMoreItems: true,
    loading: false,
    page: 0,
    maxResults: 36
  };

  async componentDidMount() {
    // await this.search(this.props.location.search, 0);
  }

  async componentWillReceiveProps(nextProps, nextState) {
    // await this.search(nextProps.location.search, 0);
  }

  search = async (queryParam, page) => {
    try {
      this.setState({
        loading: true,
        query: queryParam
      });

      const query = queryString.parse(queryParam);
      let books = await search(query.q, page, this.state.maxResults);

      if (books && books.error) {
        books = [];
      }

      console.log(books, page, page < 2);

      this.setState({
        loading: false,
        books,
        hasMoreItems: page < 2
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <section>
        <div className="container">
          <div>
            {this.state.loading && <i>Carregando...</i>}
            {!this.state.loading && this.state.books.length === 0 && <i>No book found</i>}
          </div>
          <InfiniteScroll
            pageStart={0}
            loadMore={page => this.search(this.state.query, page)}
            hasMore={this.state.hasMoreItems}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
          >
            <div className="columns is-multiline">
              {this.state.books.map(book => (
                <div className="column is-2" key={book.id}>
                  <Book book={book} shelf="NONE" onUpdateShelf={shelf => {}} />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </section>
    );
  }
}

export default Search;
