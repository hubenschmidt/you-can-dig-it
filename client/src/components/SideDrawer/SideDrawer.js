import React from 'react';
import { Link, Router } from "react-router-dom";


import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses =  'side-drawer open';
    } 
   return (

       <>{props.login? <nav className={drawerClasses}>
       <ul>
      
           <li><Link onClick={this.forceUpdate} to="/">Home</Link></li>
           <li><Link onClick={this.forceUpdate} to="/dashboard">Dashboard</Link></li>
           <li><Link onClick={this.forceUpdate} to="/library">Library</Link></li>
           <li><Link onClick={this.forceUpdate} to="/search">Search</Link></li>
       </ul>
   </nav>:
   <></>}</>
   );
};
export default sideDrawer;