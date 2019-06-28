import React from 'react';
import { Link } from "react-router-dom";
import store from "../../../src/store";
import { connect } from "react-redux";


import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
        drawerClasses =  'side-drawer open';
    } 
    const state = store.getState();
   return (

       <>{state.auth.isAuthenticated? <nav className={drawerClasses}>
       <ul>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/dashboard">Dashboard</Link></li>
           <li><Link to="/library">Library</Link></li>
           <li><Link to="/search">Search</Link></li>

       </ul>
   </nav>:
   <></>}</>
        

//         <nav className={drawerClasses}>
//         <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/dashboard">Dashboard</Link></li>
//             <li><Link to="/library">Library</Link></li>
           
//         </ul>
//     </nav>
// >>>>>>> master
   );
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps
  )(sideDrawer);
