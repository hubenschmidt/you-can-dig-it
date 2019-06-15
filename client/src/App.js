import React from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Library from "./pages/Library";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav"

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/library" component={Library}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;



// import React, {Component} from 'react';
// import './App.css';



// class App extends Component {
//   render(){
//     return (
//       <div className="App">
//         <h1>you-can-dig-it</h1>
//         <h2>this is a front end made with React</h2>
//         <h3>npm run dev</h3>
//         <h4>Client on [http://localhost:3000](http://localhost:3000)</h4>
//         <h4>Server on [http://localhost:5000](http://localhost:5000)</h4>






//       </div>
//     );
//   }
// }
// export default App;
