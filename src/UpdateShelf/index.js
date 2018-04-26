import React from 'react';
import PropTypes from 'prop-types';

import { BOOK_SHELF_OPTIONS } from '../constants';

export default class UpdateShelf extends React.Component {
  state = {
    opened: false
  };

  static propTypes = {
    value: PropTypes.oneOf(Object.keys(BOOK_SHELF_OPTIONS)).isRequired
  };

  constructor(props) {
    super(props);

    this.dropdownRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick, false);
  }

  onWindowClick = e => {
    if (this.state.opened && !this.dropdownRef.current.contains(e.target)) {
      this.setState({
        opened: false
      });
    }
  };

  toggleDropDown = () => {
    this.setState(prevState => ({
      opened: !prevState.opened
    }));
  };

  render() {
    return (
      <div ref={this.dropdownRef} className="dropdown is-active">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.toggleDropDown}>
            <span>{BOOK_SHELF_OPTIONS[this.props.value]}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        {this.state.opened && (
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {Object.keys(BOOK_SHELF_OPTIONS).map(key => (
                <a key={key} className={`dropdown-item ${key === this.props.value && 'is-active'}`}>
                  {BOOK_SHELF_OPTIONS[key]}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}
