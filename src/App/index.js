import React, { Component } from 'react';
import './App.css';

import Book from '../Book';

export default class App extends Component {
  render() {
    return (
      <section>
        <Book title="Harry Potter" author="JK Rowling" cover="https://images.gr-assets.com/books/1361039191l/1.jpg" shelf="CURRENTLY_READING" />
      </section>
    );
  }
}
