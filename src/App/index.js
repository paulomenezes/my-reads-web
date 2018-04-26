import React, { Component } from 'react';
import './App.css';

import Book from '../Book';

export default class App extends Component {
  state = {
    books: [
      {
        id: 1,
        title: 'Harry Potter',
        author: 'JK Rowling',
        cover: 'https://images.gr-assets.com/books/1361039191l/1.jpg'
      },
      {
        id: 2,
        title: 'Harry Potter',
        author: 'JK Rowling',
        cover: 'https://images.gr-assets.com/books/1361039191l/1.jpg'
      }
    ],
    user: {
      READ: [1, 2]
    }
  };

  render() {
    return (
      <section>
        {this.state.books.map(book => <Book key={book.id} title={book.title} author={book.author} cover={book.cover} shelf="CURRENTLY_READING" />)}
      </section>
    );
  }
}
