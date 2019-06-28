import React, { Component } from "react";
import io from 'socket.io-client'
import { notify } from 'react-notify-toast'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import api from './utils/API'
import { API_URL } from './utils/config'
import { setToken, getToken, removeToken } from './utils/utils'

import Nav from "./components/Nav"
import SideDrawer from './components/SideDrawer/SideDrawer';
// import Backdrop from './components/Backdrop/Backdrop';

// Login & Register
import Dashboard from "./pages/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Search from "./pages/Search";

//1st page - Landing page
import Home from "./pages/Home";

import Header from './components/Header'
import Loading from './components/Loading'

import OAuth from './components/OAuth'

import PrivateRoute from "./components/private-route/PrivateRoute";

import Library from "./pages/Library";
import NoMatch from "./pages/NoMatch";

import "./App.css";

// const socket = io(API_URL)
// const providers = ['discogs']

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}


export default class App extends Component {

  state = {
    loading: true,
    authData: {},
    sideDrawerOpen: false,
    loggedin: false
  }


  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };


  render = () => {

    return (
      <div className='wrapper'>
        <Provider store={store}>
          <Router>
            <div>
              <Nav drawerClickHandler={this.drawerToggleClickHandler} test={true}/>
              <SideDrawer show={this.state.sideDrawerOpen} login={this.state.authData? true:false} />

              <Header
                email={this.state.authData.email}
                logout={this.logout}
                deleteAccount={this.deleteAccount}
                showLogout={Object.keys(this.state.authData).length}
              />
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/search" component={Search} />
                <PrivateRoute path="/library" component={Library} />
                <Route component={NoMatch} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </div>
    )
  }
}

