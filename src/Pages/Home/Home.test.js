import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';

it('renders without crashing', () => {
  const wrapper = shallow(<Home />);
});
