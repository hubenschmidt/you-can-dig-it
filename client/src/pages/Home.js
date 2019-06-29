import React, { Component } from "react";
import BrandDesc from "../components/BrandDesc"
import { Container, Row, Col } from "../components/Grid";

class Home extends Component {

    componentWillMount() {
        document.body.style.backgroundImage = `url(http://99centdreamsrecords.com/assets/img/dc3background.png)`;
    }

    componentWillUnmount() {
        document.body.style.backgroundImage = null;
    }

    
    render() {

        return (
            <Container>
            {/* <BrandDesc /> */}
            </Container>
        );
    }
    
}



export default Home;