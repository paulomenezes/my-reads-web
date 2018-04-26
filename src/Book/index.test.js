import React from 'react';
import { shallow } from 'enzyme';

import Book from './';

let book, wrapper;

beforeEach(() => {
  book = {
    title: 'Title',
    author: 'Author',
    cover: 'https://images.gr-assets.com/books/1361039191l/1.jpg',
    shelf: 'CURRENTLY_READING'
  };

  wrapper = shallow(<Book title={book.title} author={book.author} cover={book.cover} shelf={book.shelf} />);
});

describe('<Book />', () => {
  it('should render the book`s title', () => {
    const element = wrapper.find('div.book-title');
    expect(element.length).toEqual(1);
    expect(element.text()).toEqual(book.title);
  });

  it('should render the book`s author', () => {
    const element = wrapper.find('div.book-author');
    expect(element.length).toEqual(1);
    expect(element.text()).toEqual(book.author);
  });

  it('should render the book`s cover', () => {
    const element = wrapper.find('div.book-cover');
    expect(element.length).toEqual(1);

    const image = element.find('img');
    expect(image.filterWhere(item => item.prop('src') === book.cover)).toHaveLength(1);
  });
});
