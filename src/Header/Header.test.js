import React from 'react';
import { shallow, mount } from 'enzyme';

import Header from './Header';

it('should render the MyReads logo', () => {
  const wrapper = shallow(<Header />);
  const element = wrapper.find('div.logo');
  expect(element.length).toEqual(1);
  expect(element.text()).toEqual('MyReads.');
});
