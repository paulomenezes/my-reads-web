import React from 'react';
import { shallow, mount } from 'enzyme';

import Header from './Header';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Header />);
});

it('should render the MyReads logo', () => {
  const element = wrapper.find('div.logo span');
  expect(element.length).toEqual(3);
});

it('should render the Sign in, Sign up and Logo links', () => {
  const links = wrapper.find('Link');
  expect(links.length).toEqual(3);
});
