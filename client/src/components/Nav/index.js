import React from "react";
import { Link } from "react-router-dom";
import logo from './dc3logosmall.jpg'

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './style.css';

const Nav = props => (
  <header className="toolbar navbar">
    <nav className="toolbar_navigation">
      <div>
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      {/* <div className="toolbar_logo"><a href="/">THE LOGO</a></div> */}
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
    </nav>
  </header>
);


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

export default Nav;