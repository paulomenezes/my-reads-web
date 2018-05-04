import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Home from '../Pages/Home/Home';
import Search from '../Pages/Search/Search';
import Register from '../Pages/Register/Register';

import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <section>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/signup" component={Register} />
          <Footer />
        </section>
      </BrowserRouter>
    );
  }
}
