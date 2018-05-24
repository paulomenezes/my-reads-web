import React from 'react';
import { shallow, mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import Book from './Book';

let book, wrapper;

beforeEach(() => {
  book = {
    id: 1,
    volumeInfo: {
      title: 'Title',
      authors: ['Author'],
      imageLinks: {
        thumbnail: 'https://images.gr-assets.com/books/1361039191l/1.jpg'
      }
    },
    shelf: 'CURRENTLY_READING'
  };

  const context = {};
  wrapper = mount(
    <StaticRouter context={context}>
      <Book book={book} shelf={book.shelf} onUpdateShelf={() => {}} />
    </StaticRouter>
  );
});

describe('<Book />', () => {
  it('should render the book`s title', () => {
    const element = wrapper.find('div.book-title');
    expect(element.length).toEqual(1);
    expect(element.text()).toEqual(book.volumeInfo.title);
  });

  it('should render the book`s author', () => {
    const element = wrapper.find('div.book-author');
    expect(element.length).toEqual(1);
    expect(element.text()).toEqual(book.volumeInfo.authors[0]);
  });

  it('should render the book`s cover', () => {
    const element = wrapper.find('div.book-cover');
    expect(element.length).toEqual(1);

    const image = element.find('img');
    expect(image.filterWhere(item => item.prop('src') === book.volumeInfo.imageLinks.thumbnail)).toHaveLength(1);
  });
});
