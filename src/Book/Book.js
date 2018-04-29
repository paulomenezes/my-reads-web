import React from 'react';
import PropTypes from 'prop-types';

import './Book.css';
import UpdateShelf from '../UpdateShelf/UpdateShelf';

export default class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    onUpdateValue: PropTypes.func.isRequired
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
        <div className="book-cover" ref={this.coverRef}>
          <img alt={this.props.book.title} src={this.props.book.imageLinks.thumbnail} />
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-author">{this.props.book.authors[0]}</div>
        <UpdateShelf value={this.props.shelf} onUpdateValue={shelf => this.props.onUpdateValue(shelf, this.props.book.id)} />
      </div>
    );
  }
}
