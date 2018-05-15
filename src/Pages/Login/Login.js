import React from 'react';
import { Redirect } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';

import { login } from '../../Services/User';

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

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false,
    redirectToHome: false,
    statusFields: {
      email: 'blank',
      password: 'blank'
    }
  };

  inputOnChange = async event => {
    const id = event.target.id;
    const value = event.target.value;

    this.setState(prevState => ({
      [id]: value,
      statusFields: {
        ...prevState.statusFields,
        [id]: value && value.length > 0 ? 'success' : 'error'
      }
    }));
  };

  enableButton = () => {
    return this.state.loading || Object.keys(this.state.statusFields).filter(key => this.state.statusFields[key] === 'success').length !== 2;
  };

  onSubmit = async event => {
    event.preventDefault();

    if (this.enableButton()) {
      return;
    }

    try {
      this.setState({
        loading: true
      });

      let user = {
        user: this.state.email,
        password: this.state.password
      };

      const response = await login(user);
      user = await response.json();

      localStorage.setItem('user', JSON.stringify(user));

      document.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    if (this.state.redirectToHome) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.onSubmit}>
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <div className="field">
                <label className="label">E-mail</label>
                <div className="control has-icons-left has-icons-right">
                  <DebounceInput
                    id="email"
                    type="text"
                    debounceTimeout={300}
                    onChange={this.inputOnChange}
                    className={`input ${FIELD_CLASS[this.state.statusFields['email']]}`}
                    placeholder="Your usernamr or e-mail"
                    value={this.state.email}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope" />
                  </span>
                  <span className="icon is-small is-right">
                    <i className={`fas ${FIELD_ICON[this.state.statusFields['email']]}`} />
                  </span>
                </div>
                {this.state.statusFields['email'] === 'error' && (
                  <div>{this.state.email.length === 0 && <p className="help is-danger">This field is required</p>}</div>
                )}
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left">
                  <DebounceInput
                    id="password"
                    type="password"
                    debounceTimeout={300}
                    onChange={this.inputOnChange}
                    className={`input ${FIELD_CLASS[this.state.statusFields['password']]}`}
                    placeholder="Your secret password"
                    value={this.state.password}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock" />
                  </span>
                </div>
                {this.state.statusFields['password'] === 'error' && <p className="help is-danger">This password is required</p>}
              </div>

              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <button className={`button is-danger is-link ${this.state.loading && 'is-loading'}`} disabled={this.enableButton()}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
