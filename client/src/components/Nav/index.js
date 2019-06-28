import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import store from "../../../src/store.js"

///Users/oldnewyorker/Desktop/you-can-dig-it/client/src/components/Nav/index.js
///Users/oldnewyorker/Desktop/you-can-dig-it/client/src/store.js


import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './style.css';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    const state = store.getState();
    return (
      <header className="toolbar navbar">
        <nav className="toolbar_navigation">
          <div>
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </div>
          <div className="toolbar_logo"><a href="/">THE LOGO</a></div>
          <div className="spacer" />
          <div className="toolbar_navigation-items ">
            {
              !state.auth.isAuthenticated ?

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
                : null}
          </div>
        </nav>
      </header>
    );



  }
}


// function Nav() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       <a className="navbar-brand" href="/">
//         App Brand
//       </a>
//       <ul className="nav nav-tabs">
//         <li className="nav-item">
//           <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
//             Home
//         </Link>
//         </li>
//         <li className="nav-item">
//           <Link
//             to="/library"
//             className={window.location.pathname === "/library" ? "nav-link active" : "nav-link"}
//           >
//             Library
//         </Link>
//         </li>
//       </ul>
//       <Link
//         to="/register"
//         style={{
//           width: "140px",

//         }}
//         className="btn btn-large"
//       >
//         Register
//               </Link>

//       <Link
//         to="/login"
//         style={{
//           width: "140px",
//         }}
//         className="btn btn-large"
//       >
//         Log In
//               </Link>

//     </nav>
//   );
// }

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps
)(Nav);