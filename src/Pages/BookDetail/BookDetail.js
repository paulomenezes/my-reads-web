import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import ReactStars from 'react-stars';

import './BookDetail.css';

import { get } from '../../Services/Books';
import UpdateShelf from '../../Components/UpdateShelf/UpdateShelf';
import Search from '../../Pages/Search/Search';
import { getUser } from '../../Services/User';
import { insertReview } from '../../Services/BookReview';

class BookDetail extends React.Component {
  state = {
    loading: true,
    book: undefined,
    shelf: undefined,
    user: getUser(),
    review: '',
    rating: 0
  };

  async componentDidMount() {
    this.loadBook(this.props);
  }

  async componentWillReceiveProps(nextProps, nextState) {
    this.loadBook(nextProps);
  }

  loadBook = async props => {
    try {
      if (!this.state.book || this.state.book.id !== props.match.params.id) {
        this.setState({
          loading: true
        });
      }

      const { book, shelf, reviews, rating } = await get(props.match.params.id);
      this.setState({
        book,
        reviews,
        bookRating: rating,
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

  updateReview = event => {
    this.setState({
      review: event.target.value
    });
  };

  submitReview = async () => {
    try {
      const review = {
        user: this.state.user.id,
        book: this.state.book.id,
        rating: this.state.rating,
        text: this.state.review
      };
      const id = await insertReview(review);

      review._id = id;
      review.user = this.state.user;

      const reviews = [review, ...this.state.reviews];

      let bookRating = reviews.map(review => review.rating).reduce((prev, cur) => (prev += cur));
      bookRating /= reviews.length;

      this.setState({
        reviews,
        rating: 0,
        review: '',
        bookRating
      });
    } catch (error) {
      console.log(error);
    }
  };

  ratingChanged = rating => {
    this.setState({ rating });
  };

  render() {
    const { book, shelf } = this.state;

    if (this.state.loading) {
      return <div className="container">Loading...</div>;
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
              {this.state.user && <UpdateShelf book={book} value={shelf.shelf} onUpdateValue={this.onUpdateValue} />}
            </div>
            <div className="column is-9">
              <div className="book-title">{book.volumeInfo.title}</div>
              <div className="book-author">{book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}</div>
              <ReactStars count={5} value={this.state.bookRating} size={25} color1={'#CCCCCC'} color2={'#FAAA38'} edit={false} />
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
              {this.state.user && (
                <div>
                  <div className="category-title">WRITE REVIEW</div>
                  <article className="media">
                    <div className="media-content">
                      <div className="field">
                        <p className="control">
                          <textarea
                            className="input"
                            placeholder="Type here"
                            style={{ height: 70 }}
                            value={this.state.review}
                            onChange={this.updateReview}
                          />
                        </p>
                      </div>
                      <nav className="level">
                        <div className="level-left">
                          <div className="level-item">
                            <ReactStars
                              count={5}
                              value={this.state.rating}
                              onChange={this.ratingChanged}
                              size={20}
                              color1={'#CCCCCC'}
                              color2={'#FAAA38'}
                            />
                          </div>
                        </div>
                        <div className="level-right">
                          <div className="level-item">
                            <button className="button" onClick={this.submitReview}>
                              SUBMIT
                            </button>
                          </div>
                        </div>
                      </nav>
                    </div>
                  </article>
                </div>
              )}

              <br />

              <div className="category-title">REVIEWS</div>
              {this.state.reviews.length === 0 && <i>No review for this book</i>}
              {this.state.reviews.map((review, index) => (
                <article className="media" key={index}>
                  <figure className="media-left">
                    <p className="image is-64x64">
                      <img alt={review.user.name} src="https://bulma.io/images/placeholders/128x128.png" />
                    </p>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ marginRight: 10 }}>{review.user.name}</strong> <small>{review.user.username}</small>
                        <ReactStars count={5} value={review.rating} size={20} color1={'#CCCCCC'} color2={'#FAAA38'} edit={false} />
                      </div>
                      <p>{review.text}</p>
                    </div>
                  </div>
                  <div className="media-right">{moment(review.date).fromNow()}</div>
                </article>
              ))}
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
