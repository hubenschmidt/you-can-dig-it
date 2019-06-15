import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import './App.css';

const App = () => 
    <div className="App">
    <BrowserRouter>
          <Navbar />
          <Landing />
        <h1>you-can-dig-it</h1>
        <h2>this is a front end made with React</h2>
        <h3>npm run dev</h3>
        <h4>Client on [http://localhost:3000](http://localhost:3000)</h4>
        <h4>Server on [http://localhost:5000](http://localhost:5000)</h4>
    </BrowserRouter>
      </div>


export default App;
