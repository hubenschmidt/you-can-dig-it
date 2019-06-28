import React, { Component } from "react";
import BrandDesc from "../components/BrandDesc"
import "./style.css";

class Home extends Component {


    componentDidMount() {
        document.body.style.backgroundImage = `url(assets/img/landingPageImg.jpg)`;
    }

    componentWillUnmount() {
        document.body.style.backgroundImage = null;
    }

    
    render() {
        const style={
            backgroundImage: `url(assets/img/landingPageImg.jpg)`,
            backgroungSize: "cover",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: "100%",
            height: "100%"
        }
        return (
            <div >
            <BrandDesc />
            </div>
        );
    }
    
}



export default Home;