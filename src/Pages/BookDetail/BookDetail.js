import React from 'react';
import { withRouter } from 'react-router-dom';

import './BookDetail.css';

import { get } from '../../Services/Books';
import UpdateShelf from '../../Components/UpdateShelf/UpdateShelf';
import Search from '../../Pages/Search/Search';

class BookDetail extends React.Component {
  state = {
    loading: true,
    book: undefined,
    shelf: undefined
  };

  async componentDidMount() {
    this.loadBook(this.props);
  }

  async componentWillReceiveProps(nextProps, nextState) {
    this.loadBook(nextProps);
  }

  loadBook = async props => {
    try {
      const { book, shelf } = await get(props.match.params.id);
      this.setState({
        book,
        shelf: {
          shelf: shelf ? shelf.shelf : 'NONE'
        },
        loading: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  truncate = text => {
    if (text.length < 500) {
      return text;
    }

    text = text.substr(0, 500);

    return text + '...';
  };

  onUpdateValue = shelf => {
    this.setState(prevState => ({
      shelf: { ...prevState.shelf, shelf }
    }));

    this.props.onUpdateShelf();
  };

  render() {
    const { book, shelf } = this.state;

    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <section className="book-detail">
        <div className="container">
          <div className="columns">
            <div className="column is-3">
              <div className="cover">
                {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail ? (
                  <img alt={book.volumeInfo.title} src={book.volumeInfo.imageLinks.thumbnail} />
                ) : (
                  <div className="book-without-cover">No cover</div>
                )}
              </div>
              <UpdateShelf book={book} value={shelf.shelf} onUpdateValue={this.onUpdateValue} />
            </div>
            <div className="column is-9">
              <div className="book-title">{book.volumeInfo.title}</div>
              <div className="book-author">{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</div>
              <div className="book-description">{book.volumeInfo.description && this.truncate(book.volumeInfo.description)}</div>
              <div className="columns">
                <div className="column is-2 book-label">Publisher:</div>
                <div className="column is-10">{book.volumeInfo.publisher}</div>
              </div>
              <div className="columns">
                <div className="column is-2 book-label">First Publish:</div>
                <div className="column is-10">{book.volumeInfo.publishedDate}</div>
              </div>
              <div className="columns">
                <div className="column is-2 book-label">Categories:</div>
                <div className="column is-10">{book.volumeInfo.categories && book.volumeInfo.categories.join(', ')}</div>
              </div>
              <div className="columns">
                <div className="column is-2 book-label">Pages:</div>
                <div className="column is-10">{book.volumeInfo.pageCount}</div>
              </div>
              {book.volumeInfo.industryIdentifiers && (
                <div className="columns">
                  <div className="column is-2 book-label">ISBN:</div>
                  <div className="column is-10">
                    {book.volumeInfo.industryIdentifiers.map((isbn, index, array) => (
                      <span key={isbn.identifier}>
                        {isbn.identifier}
                        {index < array.length - 1 && `, `}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {book.saleInfo.listPrice && (
                <div className="buy-button">
                  <a href={book.saleInfo.buyLink} target="_blank" type="submit" className="button">
                    <span className="icon">
                      <i className="fas fa-shopping-cart" />
                    </span>
                    <span>BUY R${book.saleInfo.listPrice.amount}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="columns">
            <div className="column is-8 write-review">
              <div className="category-title">WRITE REVIEW</div>
              <textarea className="input" placeholder="Type here" style={{ height: 70 }} />
              <button className="button">SUBMIT</button>

              <div style={{ clear: 'both' }} />

              <div className="category-title">REVIEWS</div>
            </div>
            <div className="column is-4">
              <div className="category-title">RELATED BOOKS</div>
              <Search
                search={book.volumeInfo.authors ? book.volumeInfo.authors[0] : book.volumeInfo.title}
                shelves={this.props.shelves}
                onUpdateShelf={this.props.onUpdateShelf}
                column="is-6"
                maxItems={4}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(BookDetail);
