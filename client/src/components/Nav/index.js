import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        App Brand
      </a>
      <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          to="/library"
          className={window.location.pathname === "/library" ? "nav-link active" : "nav-link"}
        >
          Library
        </Link>
      </li>
      </ul>
    </nav>
  );
}

export default Nav;