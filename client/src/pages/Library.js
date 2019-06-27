import React, { Component } from "react";
import store from "../store";

//Needed for Carousel 
import Coverflow from "react-coverflow";
// import StyleRoot from "radium"

//Page components
import { Container, Row, Col } from "../components/Grid";
import API from "../utils/API";
import { Img } from "../components/Image";
import AlbumDetails from "../components/AlbumDetails"
import Search from "../containers/Search"
import Track from "../components/Track"

import YouTube from 'react-youtube';

class Library extends Component {

  state = {
    records: [],
    activeRecord: "",
    opts: {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    }
  }

  componentDidMount() {
    this.loadLibrary();
  }

  loadLibrary = () => {
    var state = store.getState();
    var userId = state.auth.user.id;
    API.getLibrary(userId)
      .then(res => this.setState({ records: res.data }))
      .catch(err => console.log(err))
  }

  getAlbumDetails = (id) => {
    API.findById(id)
      .then(res => this.setState({ activeRecord: res.data }))
      .catch(err => console.log(err))
  }

  


  render() {
    return (
      <div>
        <Search />
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
          {Img({ albums: this.state.records, func: this.getAlbumDetails })}
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
      </div>
    );
  }
}

export default Library;