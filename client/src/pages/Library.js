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
import YouTubeVid from "../components/YouTubeVid"

import YouTube from 'react-youtube';
import axios from "axios";

class Library extends Component {

  state = {
    records: [],
    activeRecord: "",
    opts: {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0
      }
    },
    videos: []
  }

  componentWillMount() {
    document.body.style = 'background-color: #363636';
  }
  componentDidMount() {
    this.loadLibrary();
  }
  componentWillUnmount() {
    document.body.style = "null";
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

  getYouTubeVideos = (searchTerm) => {
    let url = `https://www.googleapis.com/youtube/v3/search`;
    var params = {
      part: 'snippet',
      maxResults: 5,
      type: 'video',
      key: 'AIzaSyAmS47zq426QhR8nl-O5EvY3b02VqKpClI',
      q: searchTerm
    }
    axios.get(url, {
      params: params, transformRequest: [(data, headers) => {
        delete headers.common.Authorization
        return data
      }]
    })
      .then(res => this.setState({videos: res.data.items}))
      // .then(res => console.log(res))
      .catch(err => console.log(err))

  }




  render() {
    return (
      <div>
        {/* <Search /> */}
        <Coverflow
          // width={100%}
          height={300}
          displayQuantityOfSide={2}
          navigation={false}
          clickable={true}
          enableHeading={true}
          currentFigureScale={0.8}
          otherFigureScale={0.6}

        >
          {Img({ albums: this.state.records, func: this.getAlbumDetails })}
        </Coverflow>
        {/* <Container> */}
        <Row>
          <Col size="md-3 sm-12">
            {this.state.activeRecord ?
              (<AlbumDetails
                activeRecord={this.state.activeRecord}
              />
              ) : (

                <h1 className="text-center p-3">Choose an album from your library to view details.</h1>)}

          </Col>
          <Col size="md-4 sm-12">
            {this.state.activeRecord && this.state.activeRecord.tracklist && this.state.activeRecord.tracklist.length > 0 ?
              (
                <Track
                  artist={this.state.activeRecord.artist}
                  tracks={this.state.activeRecord.tracklist}
                  getYouTubeVideos={this.getYouTubeVideos} />
              ) : (
                <h1>...</h1>
              )}
          </Col>
          <Col size="md-4 sm-12 youtube">
            {this.state.videos.length > 0 ? (
              <YouTubeVid
                videos={this.state.videos}
                opts={this.state.opts}
              />
            ) : (
              <div className="p-5">
                <img src="http://golfleaderboard.co.uk/wp-content/uploads/2018/11/youtube-placeholder.jpg" />

              </div>
              )}


          </Col>



        </Row>
        {/* </Container> */}
      </div>
    );
  }
}

export default Library;