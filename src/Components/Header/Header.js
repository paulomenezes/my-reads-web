import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import queryString from 'query-string';

import './Header.css';

class Header extends React.Component {
  state = {
    user: null,
    redirect: false,
    query: ''
  };

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const user = localStorage.getItem('user');

    if (user) {
      this.setState({
        user: JSON.parse(user),
        query: query && query.q ? query.q : ''
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const query = queryString.parse(nextProps.location.search);
    this.setState({
      query: query && query.q ? query.q : ''
    });
  }

  onChangeSearch = event => {
    if (event.target.value.length === 0) {
      this.props.history.push('/');
    } else {
      this.props.history.push('/search?q=' + encodeURI(event.target.value));
    }
  };

  render() {
    return (
      <div className="header">
        <div className="container">
          <div className="columns">
            <div className="column is-2">
              <div className="logo">
                <Link to="/">
                  <span className="logo-my">My</span>
                  <span className="logo-reads">Reads</span>
                  <span className="logo-dot">.</span>
                </Link>
              </div>
            </div>
            <div className="column is-6 is-offset-1">
              <div className="search-area">
                <DebounceInput
                  className="input"
                  placeholder="Search your book..."
                  debounceTimeout={300}
                  onChange={this.onChangeSearch}
                  value={this.state.query}
                />
              </div>
            </div>
            <div className="column is-2 is-offset-1">
              {this.state.user ? (
                <div className="user-sign">{this.state.user.name}</div>
              ) : (
                <div className="user-sign">
                  <Link to="/signin">Sign in</Link>
                  <i>or</i>
                  <Link to="/signup">Sign up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
