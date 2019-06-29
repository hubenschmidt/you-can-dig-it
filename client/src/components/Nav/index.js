import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions"
import store from "../../../src/store.js"
import logo from './logo.jpg'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './style.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    const style={
      float: "right",
      color: "white"
    }

    const state = store.getState();
    return (
      <header className="toolbar navbar">
        <nav className="toolbar_navigation" style={{width: "100%"}}>
            {
              !state.auth.isAuthenticated ?
              <>
                  <div className="toolbar_logo"><img src={logo}/></div>
                  <div className="spacer" />
                  <div className="toolbar_navigation-items ">
                    <ul className="">
                      <li><Link
                        to="/login"
                        className="btn btn-large"
                      >
                        Log In
                      </Link></li>
                      <li><Link
                        to="/register"
                        className="btn btn-large"
                      >
                        Register
                      </Link></li>
                      
                    </ul>
                  </div>
                </>
                : 
                <>
                <div>
                    <DrawerToggleButton click={this.props.drawerClickHandler} />
                </div>
                <div className="toolbar_logo"><img src={logo}/></div>
                <div className="spacer" />
                <div className="toolbar_navigation-items ">
                </div>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    float: "right",
                    color: "white"
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
                </>}
        </nav>
      </header>
    );



  }
}


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Nav);