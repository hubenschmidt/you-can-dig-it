import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import API from "../utils/API";
import store from "../store";

//Needed for Carousel 
import Coverflow from "react-coverflow";
// import StyleRoot from "radium"

//Page components
import { Container, Row, Col } from "../components/Grid";
import { Img } from "../components/Image";
import AlbumDetails from "../components/AlbumDetails"
import Search from "../containers/Search"
import Track from "../components/Track"

import YouTube from 'react-youtube';

// "../../actions/authActions";

class Dashboard extends Component {

  state= {
    search_term: "",
    results: [],
    activeRecord: "",
    opts: {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    }
  }

  handleOnChange= e => {
    this.setState({
      search_term: e.target.value
    })
    console.log(this.state.search_term);
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleOnClick= e =>{
    let term= this.state.search_term.trim();
    console.log(term);
    API.getSearchResults({query: term})
      .then(res =>{
        console.log(res);
        let array= res.data.results;
        let temp= [];
        for(let i=0;i<array.length;++i){
          let object= {
            image: array[i].cover_image,
            title: array[i].title,
            _id: array[i].id,
          }
          temp.push(object);
        }
        this.setState({
          results: temp,
        })
      })
  };

  getAlbumDetails = (id) => {
    this.setState({ activeRecord: this.state.results[id] });
  }

  render() {
    return (
      <>
      <div className="input-group mb-3 search">
                <input onChange={this.handleOnChange} type="text" className="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <div className="input-group-append">
                    <button onClick={this.handleOnClick} className="btn" type="button" id="button-addon2">Search</button>
                </div>
        </div>
        <div>
        <Coverflow
        // width={100%}
        height={400}
        displayQuantityOfSide={2}
        navigation={false}
        clickable={true}
        enableHeading={true}
        currentFigureScale={1.1}
        otherFigureScale={0.8}

      >
        {Img({ albums: this.state.results, func: this.getAlbumDetails })}
      </Coverflow>
      {/* <Container> */}
      <Row>
        <Col size="md-3 sm-12">
          {this.state.activeRecord ?
            (<AlbumDetails activeRecord={this.state.activeRecord} />
            ) : (

              <h1 className="text-center">Choose an album from your library to view details.</h1>)}

        </Col>
        <Col size="md-4 sm-12">
          {this.state.activeRecord && this.state.activeRecord.tracklist && this.state.activeRecord.tracklist.length > 0 ?
            (
              <Track tracks={this.state.activeRecord.tracklist} />
            ) : (
              <h1>...</h1>
            )}
        </Col>
        <Col size="md-4 sm-12 youtube">
          <YouTube
            videoId="2g811Eo7K8U"
            opts={this.state.opts}
            onReady={this._onReady}
          />
        </Col>
      </Row>
      <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
    </div>
    </>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
