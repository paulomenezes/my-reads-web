import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Book.css';
import UpdateShelf from '../UpdateShelf/UpdateShelf';

import { getUser } from '../../Services/User';

export default class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    onUpdateShelf: PropTypes.func
  };

  state = {
    user: getUser()
  };

  constructor(props) {
    super(props);

    this.coverRef = React.createRef();
  }

  componentDidMount() {
    this.calculateCoverHeight();
    window.addEventListener('resize', this.calculateCoverHeight);
  }

  calculateCoverHeight = () => {
    const cover = this.coverRef.current;
    if (cover) {
      cover.style.height = cover.clientWidth * 1.5 + 'px';
    }
  };

  render() {
    return (
      <div className="book">
        <Link to={`/book/${this.props.book.id}`}>
          <div className="book-cover" ref={this.coverRef}>
            {this.props.book.volumeInfo.imageLinks && this.props.book.volumeInfo.imageLinks.thumbnail ? (
              <img alt={this.props.book.volumeInfo.title} src={this.props.book.volumeInfo.imageLinks.thumbnail} />
            ) : (
              <div className="book-without-cover">No cover</div>
            )}
          </div>
        </Link>
        <div className="book-title">{this.props.book.volumeInfo.title}</div>
        <div className="book-author">{this.props.book.volumeInfo.authors && this.props.book.volumeInfo.authors.join(', ')}</div>
        {this.state.user && <UpdateShelf value={this.props.shelf} book={this.props.book} onUpdateValue={this.props.onUpdateShelf} />}
      </div>
    );
  }
}
