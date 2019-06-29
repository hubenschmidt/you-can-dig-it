import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions"
import Modal from "../components/Modal";
import Loading from "../components/Loading"
import Search from "../containers/Search"
import OAuth from '../components/OAuth'
import io from 'socket.io-client'
import { API_URL } from '../utils/config'
import api from '../utils/API'
import { setToken, getToken, removeToken } from '../utils/utils'
import store from "../store";
//import StyleRoot from 'radium
import './style.css'
//page components
import { Container, Row, Col } from "../components/Grid"
import API from "../utils/API"
import { Img } from "../components/Image"
import AlbumDetails from "../components/AlbumDetails"
import Track from "../components/Track"
import YouTubeVid from "../components/YouTubeVid"
import YouTube from 'react-youtube';
import axios from 'axios';


const socket = io(API_URL)
const providers = ['discogs']

var Discogs = require('disconnect').Client;
var db = new Discogs().database();



class Dashboard extends Component {

  componentWillMount() {
    document.body.style.backgroundImage = `url(http://99centdreamsrecords.com/assets/img/dc3background.png)`;
}

componentWillUnmount() {
    document.body.style.backgroundImage = null;
}

  state = {
    loading: true,
    search_term:'',
    results: [],
    activeRecord: [],
    opts: {
      width: 'auto',
      height: '100%',
      playerVars: {
        autoplay: 0
      }
    },
    videos: [],

  }

  componentDidMount(){
    fetch(`${API_URL}/wake-up`)
      .then(res => {
        if (res.ok){
          this.setState({ loading: false })
        }
      })
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
    API.getRandomResults()
      .then(res =>{
        console.log(res)
        let array = res.data.results;
        let temp = []
        for (let i = 0; i < array.length; i++) {
          let string = array[i].title.split('-');
          let object = {
            title: array[i].title,
            image: array[i].cover_image,
            labels: array[i].labels,
            year: array[i].year,
            country: array[i].country,
            genres: array[i].genres,
            styles: array[i].styles,
          }
          temp.push(object);

        }
        this.setState({
          results: temp,
        })
      })
      }

      syncUserReleases() {
        var state = store.getState();
        var userId = state.auth.user.id;
        console.log('userId', userId)
        api.syncUserReleases(userId).then(data => {
          console.log(data);
        });
      }

      onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

  render() {
    const buttons = (providers, socket) =>
    providers.map(provider =>
      <OAuth
        provider={provider}
        key={provider}
        socket={socket}
      />
    )
    const { user } = this.props.auth;

    return (
 

  <Container>
  >
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

          <Col size="lg-6 md-6 sm-12 xs-12 youtube d-flex justify-content-center">

            <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
            <div className="landing-copy col s12 center-align">
            <h4>

              <span style={{ fontFamily: "monospace" }}> “In those days it was either live with music, or die with noise, 
              and we chose rather desperately to live.” ― Ralph Ellison, Living with Music: Jazz Writings </span><hr></hr><hr></hr>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">

             {" "}
             </p>
            </h4>
            <Search />
            <div>
              {this.state.loading
                ? <Loading />
                : buttons(providers, socket)
              }
            </div>
            <button 
              onClick={ () => this.syncUserReleases()} >Sync Library with Discogs
            </button>
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
        </div>
      </div>
          </Col>
        </Row>
        </Container>
     
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
