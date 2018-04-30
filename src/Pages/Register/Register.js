import React from 'react';
import { DebounceInput } from 'react-debounce-input';

// import PropTypes from 'prop-types';

const FIELD_CLASS = {
  blank: '',
  loading: '',
  error: 'is-danger',
  success: 'is-success'
};

const FIELD_ICON = {
  blank: '',
  loading: 'fa-spinner',
  error: 'fa-exclamation-triangle',
  success: 'fa-check'
};

export default class Register extends React.Component {
  state = {
    name: '',
    username: '',
    email: '',
    password: '',
    statusFields: {
      name: 'blank',
      username: 'blank',
      email: 'blank',
      password: 'blank'
    }
  };

  inputOnChange = async event => {
    this.setState({
      [event.target.id]: event.target.value
    });

    if (event.target.id === 'username' || event.target.id === 'email') {
      const id = event.target.id;
      const value = event.target.value;

      this.setState(prevState => ({
        statusFields: {
          ...prevState.statusFields,
          [id]: 'loading'
        }
      }));

      const response = await fetch('http://localhost:8080/users/check', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          field: id,
          value: value
        })
      });

      this.setState(prevState => ({
        statusFields: {
          ...prevState.statusFields,
          [id]: response.status === 400 || response.status === 404 ? 'success' : 'error'
        }
      }));
    }
  };

  render() {
    return (
      <div className="container">
        <div className="column is-6 is-offset-3">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Type your name" value={this.state.name} />
            </div>
          </div>

          <div className="field">
            <label className="label">Username</label>
            <div className="control has-icons-left has-icons-right">
              <DebounceInput
                id="username"
                type="text"
                minLength={2}
                debounceTimeout={300}
                onChange={this.inputOnChange}
                className={`input ${FIELD_CLASS[this.state.statusFields['username']]}`}
                placeholder="Type some unique username"
                value={this.state.username}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
              <span className="icon is-small is-right">
                <i className={`fas ${FIELD_ICON[this.state.statusFields['username']]}`} />
              </span>
            </div>
            {this.state.statusFields['username'] === 'error' && <p className="help is-danger">This username is unavailable</p>}
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-danger" type="email" placeholder="Your e-mail" value={this.state.email} />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle" />
              </span>
            </div>
            <p className="help is-danger">This email is invalid</p>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <p className="control has-icons-left">
              <input className="input" type="password" placeholder="Your secret password" value={this.state.password} />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>

          <div className="field is-grouped is-grouped-right">
            <div className="control">
              <button className="button is-text">Back</button>
            </div>
            <div className="control">
              <button className="button is-link">Create account</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
