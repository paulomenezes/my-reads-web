import React from 'react';
import { shallow, mount } from 'enzyme';

import Header from './Header';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Header />);
});

it('should render the MyReads logo', () => {
  const element = wrapper.find('div.logo');
  expect(element.length).toEqual(1);
  expect(element.text()).toEqual('MyReads.');
});

it('should render the Sign in and Sign up links', () => {
  const links = wrapper.find('a');
  expect(links.length).toEqual(2);
});
