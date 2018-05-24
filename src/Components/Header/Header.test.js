import React from 'react';
import { shallow, mount } from 'enzyme';

import { Header } from './Header';

let wrapper;

beforeEach(() => {
  const search = { search: '?q=ios' };
  wrapper = shallow(<Header location={search} />);
});

it('should render the MyReads logo', () => {
  const element = wrapper.find('div.logo span');
  expect(element.length).toEqual(3);
});

it('should render the Sign in, Sign up, Search and Logo links', () => {
  const links = wrapper.find('Link');
  expect(links.length).toEqual(4);
});
