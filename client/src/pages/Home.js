import React, { Component } from "react";
import BrandDesc from "../components/BrandDesc"
import { Container, Row, Col } from "../components/Grid";

class Home extends Component {

    componentDidMount() {
        document.body.style.backgroundImage = `url(assets/background.png)`;
      }


    render() {

        return (
            <Container>
            <BrandDesc />
            </Container>
        );
    }

}



export default Home;