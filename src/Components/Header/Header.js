import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

import './Header.css';

export class Header extends React.Component {
  state = {
    user: null,
    redirect: false,
    query: ''
  };

  componentDidMount() {
    const query = this.props.location.search.substr(3);
    const user = localStorage.getItem('user');

    if (user) {
      this.setState({
        user: JSON.parse(user),
        query: decodeURI(query)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const query = nextProps.location.search.substr(3);
    this.setState({
      query: decodeURI(query)
    });
  }

  onChangeSearch = event => {
    this.props.history.push('/search?q=' + encodeURI(event.target.value));
  };

  logout = () => {
    localStorage.removeItem('user');
    document.location.href = '/';
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
            <div className="column is-1">
              <div className="user-sign">
                <Link to="/search">Search</Link>
              </div>
            </div>
            <div className="column is-6">
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
                <div className="user-sign">
                  {this.state.user.name}{' '}
                  <small>
                    (<a href="" onClick={this.logout}>
                      sair
                    </a>)
                  </small>
                </div>
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
