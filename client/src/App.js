import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import io from "socket.io-client";
import OAuth from "./components/OAuth";
import { API_URL } from "./config";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Loading from "./components/Loading";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Dashboard from "./pages/Dashboard";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav"

import "./App.css";

const socket = io(API_URL);
const providers = ['discogs'];

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
    loading: true
  }

  componentDidMount(){
    fetch(`${API_URL}/wake-up`)
      .then(res => {
        if (res.ok){
          this.setState({ loading: false})
        }
      })
  }

  render() {
  
    const buttons = (providers, socket) =>
    providers.map(provider => 
        <OAuth
          provider={provider}
          key={provider}
          socket={socket}
        />
    )

    return (
      <Provider store={store}>
      <Router>
        <div className="App">
          <Nav /> 
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <div className='discogsAuth'>
          {this.state.loading
            ? <Loading />
            : buttons(providers, socket)
          }
        </div>
            <PrivateRoute path="/library" component={Library} />
            <Route exact path="/" component={Home} />
            <Route component={NoMatch} />
        </Switch>
        </div>
        </Router>
      </Provider>

    )
  }

  
}

// const App = () =>
//       <Provider store={store}>
//         <Router>
//           <div className="App">
//             <Nav /> 
//             <Navbar />
//             <Route exact path="/" component={Landing} />
//             <Route exact path="/register" component={Register} />
//             <Route exact path="/login" component={Login} />
//             <Switch>
//               <OAuth 
//                 provider={'discogs'} 
//                 key={'discogs'} 
//                 socket={process.env.NODE_ENV === 'production'
//                   ? '/'
//                   : 'https://localhost:5000'} 
//               />
//               <PrivateRoute exact path="/dashboard" component={Dashboard} />
//               <PrivateRoute path="/library" component={Library} />
//               <Route exact path="/" component={Home} />
//               <Route component={NoMatch} />
//             </Switch>
//           </div>
//         </Router>
//       </Provider>


// export default App;
