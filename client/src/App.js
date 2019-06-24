import React, { Component } from "react";
import io from 'socket.io-client'
import jwtDecode from 'jwt-decode'
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

import OAuth from './components/OAuth'
import Header from './components/Header'
import Loading from './components/Loading'
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./pages/Home";
import Library from "./pages/Library";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav"

import "./App.css";

const socket = io(API_URL)
const providers = ['discogs']

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
    authData: {}
  }

  componentDidMount() {
    socket.on('connect', () => {
      api.wakeUp(socket.id)
        .then(() => {
          this.setState({ loading: false })  
          const authToken = getToken()
          
          if (authToken) {
            this.refreshToken(authToken)
          }
        })
    })
  }

  render = () => {
    const buttons = (providers, socket) => 
      providers.map(provider => 
        <OAuth 
          provider={provider}
          key={provider}
          socket={socket}
          authData={this.state.authData[provider]}
          addProviderData={this.addProviderData}
          closeCard={this.closeCard}
        />
      )
      
    return (


    
      <div className='wrapper'>

        <Provider store={store}>
                <Router>
                  <div className="App">
                    <Nav /> 
                    <Navbar />
                    <Header 
                    email={this.state.authData.email} 
                    logout={this.logout}
                    deleteAccount={this.deleteAccount}
                    showLogout={Object.keys(this.state.authData).length} 
                  />
                    <div className='container'>
                      {this.state.loading
                        ? <Loading />
                        : buttons(providers, socket)
                      }
                    </div>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Switch>
                      <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute path="/library" component={Library} />
                        <Route exact path="/" component={Home}/>
                        <Route component={NoMatch}/>
                    </Switch>

               
                  </div>
                </Router>
              </Provider>


 
      </div>
    )
  }
}

