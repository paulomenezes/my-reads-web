import React from 'react';
import { DebounceInput } from 'react-debounce-input';

import ImageInput from '../../Components/ImageInput/ImageInput';
import { register, checkUsernameAndEmail } from '../../Services/User';

import './Register.css';

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
    loading: false,
    statusFields: {
      name: 'blank',
      username: 'blank',
      email: 'blank',
      password: 'blank'
    }
  };

  validateEmail = email => /\S+@\S+\.\S+/.test(email);

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

    if (id === 'email' && !this.validateEmail(value)) {
      this.setState(prevState => ({
        statusFields: {
          ...prevState.statusFields,
          [id]: 'error'
        }
      }));

      return;
    }

    if (value && value.length > 0 && (id === 'username' || id === 'email')) {
      this.setState(prevState => ({
        statusFields: {
          ...prevState.statusFields,
          [id]: 'loading'
        }
      }));

      const response = await checkUsernameAndEmail(id, value);

      this.setState(prevState => ({
        statusFields: {
          ...prevState.statusFields,
          [id]: response.status === 400 || response.status === 404 ? 'success' : 'error'
        }
      }));
    }
  };

  enableButton = () => {
    return this.state.loading || Object.keys(this.state.statusFields).filter(key => this.state.statusFields[key] === 'success').length !== 4;
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

      const user = {
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };

      const response = await register(user);
      const { id } = await response.json();

      localStorage.setItem(
        'user',
        JSON.stringify({
          id,
          name: user.name,
          username: user.username,
          email: user.email
        })
      );

      document.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="container">
          <div className="columns">
            <div className="column is-1 is-offset-3">
              <div>
                <ImageInput className="create-contact-avatar-input" name="avatarURL" maxHeight={64} />
              </div>
            </div>
            <div className="column is-5">
              <div className="field">
                <label className="label">Name</label>
                <div className="control has-icons-right">
                  <DebounceInput
                    id="name"
                    debounceTimeout={300}
                    onChange={this.inputOnChange}
                    className={`input ${FIELD_CLASS[this.state.statusFields['name']]}`}
                    type="text"
                    placeholder="Type your name"
                    value={this.state.name}
                  />
                  <span className="icon is-small is-right">
                    <i className={`fas ${FIELD_ICON[this.state.statusFields['name']]}`} />
                  </span>
                </div>
                {this.state.statusFields['name'] === 'error' && <p className="help is-danger">This name is required</p>}
              </div>

              <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                  <DebounceInput
                    id="username"
                    type="text"
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
                {this.state.statusFields['username'] === 'error' && (
                  <div>
                    {this.state.username.length === 0 ? (
                      <p className="help is-danger">This username is required</p>
                    ) : (
                      <p className="help is-danger">This username is unavailable</p>
                    )}
                  </div>
                )}
              </div>

              <div className="field">
                <label className="label">E-mail</label>
                <div className="control has-icons-left has-icons-right">
                  <DebounceInput
                    id="email"
                    type="email"
                    debounceTimeout={300}
                    onChange={this.inputOnChange}
                    className={`input ${FIELD_CLASS[this.state.statusFields['email']]}`}
                    placeholder="Your e-mail"
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
                  <div>
                    {this.state.email.length === 0 ? (
                      <p className="help is-danger">This e-mail is required</p>
                    ) : (
                      <p className="help is-danger">This e-mail is unavailable</p>
                    )}
                  </div>
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
                    Create account
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
