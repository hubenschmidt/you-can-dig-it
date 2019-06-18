import React from "react";
import axios from 'axios';

function Home() {
    // axios.get('/api/random').then(res => console.log(res.data))
    return (

        <div className="App" >
            <h1>you-can-dig-it</h1>
            <h2>this is a front end made with React</h2>
            <h3>npm run dev</h3>
            <h4>Client on [http://localhost:3000](http://localhost:3000)</h4>
            <h4>Server on [http://localhost:5000](http://localhost:5000)</h4>
        </div >

    )
}

export default Home;