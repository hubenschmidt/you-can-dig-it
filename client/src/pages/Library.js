import ReactDOM from 'react-dom';
import Coverflow from "react-coverflow";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import API from "../utils/API";
import { Img } from "../components/Image";
import AlbumDetails from "../components/AlbumDetails"

import Row from "../components/Row"
import Track from "../components/Track"

class Library extends Component {

  state = {
    records: [],
    activeRecord: ""
  }

  componentDidMount() {
    this.loadLibrary();
  }

  loadLibrary = () => {
    API.getLibrary()
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


        <Coverflow
          // width={100%}
          // height={480}
          displayQuantityOfSide={2}
          navigation={false}
          clickable={true}
          enableHeading={true}
          media={{
            '@media (max-width: 960px)': {
              // width: '600px',
              height: '300px'
            },
            '@media (min-width: 900px)': {
              // width: '960px',
              height: '360px'
            }
          }}
        >
          {Img({ albums: this.state.records, func: this.getAlbumDetails })}
        </Coverflow>

        <AlbumDetails activeRecord={this.state.activeRecord} />
        <Row>
          {this.state.activeRecord && this.state.activeRecord.tracklist && this.state.activeRecord.tracklist.length > 0 ? 
          (
          <Track tracks={this.state.activeRecord.tracklist} />
          ) : (
            <h1>Tracks are not available for this album.</h1>
            )}
        </Row>


      </div>
    );
  }
}

export default Library;