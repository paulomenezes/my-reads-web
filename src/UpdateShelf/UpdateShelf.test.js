import React from 'react';
import { shallow, mount } from 'enzyme';

import UpdateShelf from './UpdateShelf';
import { BOOK_SHELF_OPTIONS } from '../constants';

let wrapper, value, onUpdateValueFn;

beforeEach(() => {
  value = 'READ';

  onUpdateValueFn = jest.fn();

  wrapper = shallow(<UpdateShelf value={value} onUpdateValue={onUpdateValueFn} />);
});

afterEach(() => {
  onUpdateValueFn.mockReset();
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
    var mounted = mount(<UpdateShelf value={value} onUpdateValue={() => {}} />);

    const dropDown = mounted.find('div.dropdown button');
    dropDown.simulate('click');

    let dropDownMenu = mounted.find('div.dropdown-menu');
    expect(dropDownMenu.length).toEqual(1);

    document.body.click();

    setTimeout(() => {
      dropDownMenu = mounted.find('div.dropdown-menu');
      expect(dropDownMenu.length).toEqual(0);
    }, 100);
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

  it('should be able to change the option', () => {
    let element = wrapper.find('div.dropdown');
    expect(
      element
        .find('button span')
        .first()
        .text()
    ).toEqual(BOOK_SHELF_OPTIONS[value]);

    const dropDown = wrapper.find('div.dropdown button');
    dropDown.simulate('click');

    const option = wrapper.find('div.dropdown-menu .dropdown-content a');
    option.first().simulate('click');

    let dropDownMenu = wrapper.find('div.dropdown-menu');

    expect(dropDownMenu.length).toEqual(0);
    expect(onUpdateValueFn.mock.calls.length).toEqual(1);
    expect(onUpdateValueFn.mock.calls[0][0]).toEqual('NONE');
  });

  it('should unmount correctly', () => {
    const wrapper = mount(<UpdateShelf value={value} onUpdateValue={() => {}} />);
    wrapper.unmount();
  });
});
