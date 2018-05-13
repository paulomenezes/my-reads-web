import React from 'react';
import PropTypes from 'prop-types';

import './UpdateShelf.css';
import { BOOK_SHELF_OPTIONS, BOOK_SHELF_ICONS } from '../../constants';

import { getUser } from '../../Services/User';
import { updateShelf } from '../../Services/Books';

export default class UpdateShelf extends React.Component {
  state = {
    opened: false,
    user: getUser()
  };

  static propTypes = {
    value: PropTypes.oneOf(Object.keys(BOOK_SHELF_OPTIONS)).isRequired,
    book: PropTypes.object.isRequired,
    onUpdateValue: PropTypes.func
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

  onUpdateValue = async item => {
    this.setState({
      opened: false
    });

    try {
      await updateShelf(this.props.book, item, this.state.user.id);
    } catch (error) {}

    this.props.onUpdateValue(item);
  };

  render() {
    return (
      <div ref={this.dropdownRef} className="dropdown is-active">
        <div className="dropdown-trigger">
          <button className={`button ${this.props.value}`} aria-haspopup="true" aria-controls="dropdown-menu" onClick={this.toggleDropDown}>
            <i className={`icon-shelf icon-${this.props.value}`}>
              <i className={`fas ${BOOK_SHELF_ICONS[this.props.value]}`} />
            </i>
            <span>{BOOK_SHELF_OPTIONS[this.props.value]}</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true" />
            </span>
          </button>
        </div>
        {this.state.opened && (
          <div className={`dropdown-menu menu-${this.props.value}`} id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {Object.keys(BOOK_SHELF_OPTIONS).map(key => (
                <a key={key} onClick={() => this.onUpdateValue(key)} className={`dropdown-item ${key === this.props.value && 'is-active'}`}>
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
