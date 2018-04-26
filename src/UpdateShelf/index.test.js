import React from 'react';
import { shallow, mount } from 'enzyme';

import UpdateShelf from './';
import { BOOK_SHELF_OPTIONS } from '../constants';

let wrapper, value;

beforeEach(() => {
  value = 'READ';
  wrapper = shallow(<UpdateShelf value={value} />);
});

describe('<UpdateShelf />', () => {
  it('should render the dropdown', () => {
    const element = wrapper.find('div.dropdown');
    expect(element.length).toEqual(1);
  });

  it('should render the initial value', () => {
    const element = wrapper.find('div.dropdown');
    expect(
      element
        .find('button span')
        .first()
        .text()
    ).toEqual(BOOK_SHELF_OPTIONS[value]);
  });

  it('should start closed', () => {
    const element = wrapper.find('div.dropdown-menu');
    expect(element.length).toEqual(0);
  });

  it('should open when clicked', () => {
    const dropDown = wrapper.find('div.dropdown button');
    let dropDownMenu = wrapper.find('div.dropdown-menu');
    expect(dropDownMenu.length).toEqual(0);

    dropDown.simulate('click');

    dropDownMenu = wrapper.find('div.dropdown-menu');
    expect(dropDownMenu.length).toEqual(1);
  });

  it('should close when click outside', () => {
    var mounted = mount(<UpdateShelf value={value} />);

    const dropDown = mounted.find('div.dropdown button');
    dropDown.simulate('click');

    let dropDownMenu = mounted.find('div.dropdown-menu');
    expect(dropDownMenu.length).toEqual(1);

    document.body.click();

    dropDownMenu = mounted.find('div.dropdown-menu');
    expect(dropDownMenu.length).toEqual(0);
  });

  it('should render all the options in dropdown', () => {
    const dropDown = wrapper.find('div.dropdown button');
    dropDown.simulate('click');

    const BOOK_SHELF_OPTIONS_KEYS = Object.keys(BOOK_SHELF_OPTIONS);
    const element = wrapper.find('div.dropdown-menu .dropdown-content a');
    expect(element.length).toEqual(BOOK_SHELF_OPTIONS_KEYS.length);

    element.forEach((item, index) => {
      expect(item.text()).toEqual(BOOK_SHELF_OPTIONS[BOOK_SHELF_OPTIONS_KEYS[index]]);
    });
  });

  it('should highlight the active item', () => {
    const dropDown = wrapper.find('div.dropdown button');
    dropDown.simulate('click');

    const element = wrapper.find('div.dropdown-menu .dropdown-content a.is-active');
    expect(element.length).toEqual(1);
    expect(element.text()).toEqual(BOOK_SHELF_OPTIONS[value]);
  });
});
