import React, { Component } from "react";
import store from "../store";

//Needed for Carousel 
import Coverflow from "react-coverflow";
// import StyleRoot from "radium"
import "./style.css"

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

var Discogs = require('disconnect').Client;
var db = new Discogs().database();

class Library extends Component {

  state= {
    search_term: "",
    results: [],
    activeRecord: [],
    opts: {
      width: 'auto',
      height: '100%',
      playerVars: {
        autoplay: 0
      }
    },
    videos: []
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

  handleOnClick= () =>{
    let term= this.state.search_term.trim();
    console.log(term);
    API.getSearchResults({q: term})
      .then(res =>{
        console.log(res);
        let array= res.data.results;
        let temp= [];
        for(let i=0;i<array.length;++i){
          let string= array[i].title.split('-');
          let object= {
            full_title: array[i].title,
            image: array[i].cover_image,
            title: string[1],
            artist: string[0], 
            year: array[i].year, 
            country: array[i].country, 
            genres: array[i].genre,
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

    for(let i=0;i<this.state.results.length;++i){
      if(id===this.state.results[i]._id){
       this.setState({ activeRecord: this.state.results[i] });
        db.getRelease(this.state.results[i]._id)
        .then(res =>{
          let temp= this.state.activeRecord;
          temp.tracklist= res.tracklist;
          this.setState({ activeRecord: temp }); 
          console.log(this.state.activeRecord);
        });
      }
    }
    
  };

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
      .then(res => this.setState({ videos: res.data.items }))
      // .then(res => console.log(res))
      .catch(err => console.log(err))

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
        <div className="coverflow-div">
          <Coverflow
            height={300}
            displayQuantityOfSide={3}
            navigation={false}
            clickable={true}
            enableHeading={true}
            currentFigureScale={0.8}
            otherFigureScale={0.6}

          >
            {Img({ albums: this.state.results, func: this.getAlbumDetails })}
          </Coverflow>

        </div>

        <Container>
        <Row>
          <Col size="lg-6 md-6 sm-12 xs-12">

{/* Album Detail */}

            {this.state.activeRecord ?
              (<AlbumDetails
                activeRecord={this.state.activeRecord}
              />
              ) : (

                <h1 className="text-center p-3">Choose an album from your library to view details.</h1>)}

{/* Track */}
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

          <Col size="lg-6 md-6 sm-12 xs-12 youtube d-flex justify-content-center">
            {this.state.videos.length > 0 ? (
              <YouTubeVid
                videos={this.state.videos}
                opts={this.state.opts}
              />
            ) : (
                <div className="d-flex justify-content-center p-3">
                  <img src="http://golfleaderboard.co.uk/wp-content/uploads/2018/11/youtube-placeholder.jpg" height="150" width="300" />

                </div>
              )}


          </Col>



        </Row>
        </Container>
      </div>
      </>
    );
  }
}

export default Library;