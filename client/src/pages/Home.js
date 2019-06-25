import React, { Component } from "react";
import BrandDesc from "../components/BrandDesc"

class Home extends Component {

    componentWillMount() {
        document.body.style.backgroundImage = `url(assets/img/landingPageImg.jpg)`;
    }

    componentWillUnmount() {
        document.body.style.backgroundImage = null;
    }

    
    render() {

        return (
            <BrandDesc />
 
        );
    }
}

export default Home;