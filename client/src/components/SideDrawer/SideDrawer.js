import React from 'react';
import { Link } from "react-router-dom";


import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses =  'side-drawer open';
    }
   return (
        <nav className={drawerClasses}>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/library">Library</Link></li>

        </ul>
    </nav>
   );
};

export default sideDrawer;