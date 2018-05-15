import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import { getUser } from '../Services/User';
import { userShelves } from '../Services/Books';

import Home from '../Pages/Home/Home';
import Search from '../Pages/Search/Search';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import BookDetail from '../Pages/BookDetail/BookDetail';

import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

export default class App extends Component {
  state = {
    user: getUser(),
    shelves: []
  };

  onUpdateShelf = async () => {
    if (this.state.user) {
      try {
        const { shelves } = await userShelves(this.state.user.id);
        this.setState({
          shelves
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  async componentDidMount() {
    this.onUpdateShelf();
  }

  render() {
    return (
      <BrowserRouter>
        <section>
          <Header />
          <Route exact path="/" render={() => <Home shelves={this.state.shelves} onUpdateShelf={this.onUpdateShelf} />} />
          <Route exact path="/search" render={() => <Search shelves={this.state.shelves} onUpdateShelf={this.onUpdateShelf} />} />
          <Route exact path="/signin" component={Login} />
          <Route exact path="/signup" component={Register} />
          <Route exact path="/book/:id" render={() => <BookDetail shelves={this.state.shelves} onUpdateShelf={this.onUpdateShelf} />} />
          <Footer />
        </section>
      </BrowserRouter>
    );
  }
}
