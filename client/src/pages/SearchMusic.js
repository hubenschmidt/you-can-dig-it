import React, { Component } from "react";
import API from "../utils/API";
import store from "../store";
import { Container, Row, Col } from "../components/Grid";

import SearchResults from "../components/SearchResults"
import YouTube from 'react-youtube';
import axios from "axios";
import SearchYouTubeVid from "../components/SearchYouTubeVid"
// import VideoFooter from "../components/VideoFooter"
//Page Components
// import SearchBox from "../components/SearchBox"
// import Search from "../containers/Search";

class SearchMusic extends Component {

  state = {
    search_term: "",
    results: [],
    videos: [],
    opts: {
      width: 'auto',
      height: '100%',
      playerVars: {
        autoplay: 0
      }
    },

  }

  componentDidMount() {
    document.body.style.backgroundImage = `url(assets/background.png)`;
  }
  // componentWillMount() {
  //   document.body.style.backgroundImage = `url(assets/img/background.png)`;
  // }

  // componentWillUnmount() {
  //   document.body.style.backgroundImage = null;
  // }

  handleOnChange = e => {
    this.setState({
      search_term: e.target.value
    })
  };

  searchDiscogs = () => {
    let term = this.state.search_term.trim();
    var state = store.getState();
    var userId = state.auth.user.id;
    API.getSearchResults({ userId, q: term })
      .then(res => {
        console.log('YO' + res);
        let temp = [];
        res.data.forEach(element => {
          let object = {
            image: element.release.cover_image,
            title: element.data.title,
            artist: element.data.artists.map(a => a.name).join(', '),
            year: element.data.year,
            country: element.data.country,
            genres: element.data.genres.join(', '),
            id: element.data.id,
            tracklist: element.data.tracklist
          }
          temp.push(object);
        });
        this.setState({
          results: temp,
        })
      })
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
      .then(res => this.setState({ videos: res.data.items }))
      // .then(res => console.log(res))
      .catch(err => console.log(err))

  }

  saveToLibrary = async (release) => {
    console.log(release)
    var state = store.getState();
    var userId = state.auth.user.id;
    var retVal = await API.saveRelease(release, userId);

  }


  render() {
    return (
      <>
      {/* Quick fix re: heroku deployment bug. displayed content is shifted upon render */}
      <br></br>
      <br></br>
      <div>
        <div className="vid-container">
        {this.state.videos.length > 0 ? (
              <SearchYouTubeVid
                videos={this.state.videos}
                opts={this.state.opts}
                
              />
            ) : (
                <div className="p-3">
                  <img src="http://golfleaderboard.co.uk/wp-content/uploads/2018/11/youtube-placeholder.jpg" height="150" width="300" />

                </div>
              )}
        </div>
        <Container>
          <div className="input-group mb-3 search">
            <input onChange={this.handleOnChange} style={{ width: "50px" }} type="text" className="form-control" placeholder="Search for artist, albums and more..." aria-label="Recipient's username" aria-describedby="button-addon2" />
            <div className="input-group-append">
              <button onClick={this.searchDiscogs} className="btn" type="button" id="button-addon2"><i class="fa fa-search"></i></button>
            </div>
          </div>

          <div className="transbox">
          <SearchResults
            results={this.state.results}
            getYouTubeVideos={this.getYouTubeVideos}
            saveToLibrary={this.saveToLibrary}
          />
          </div>


          {/* <Col size="lg-6 md-6 sm-12 xs-12 youtube d-flex justify-content-center">
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


        </Col> */}

        </Container>

      </div>
      </>
    )
  }
}

export default SearchMusic;