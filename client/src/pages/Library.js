import ReactDOM from 'react-dom';
import Coverflow from "react-coverflow";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import API from "../utils/API";
import { Img } from "../components/Image";

class Library extends Component {

  state = {
    records: []
  }

  // {
  //   src: "",
  //   title: 'pussy1'
  // },
  // {
  //   src: "http://www.petmd.com/sites/default/files/what-does-it-mean-when-cat-wags-tail.jpg",
  //   title: 'pussy2'
  // },
  // {
  //   src: "http://www.petmd.com/sites/default/files/what-does-it-mean-when-cat-wags-tail.jpg",
  //   title: "pussy3"
  // }

  componentDidMount() { 
    this.loadLibrary();
   }

  loadLibrary = () => {
    API.getLibrary()
      .then(res => this.setState({ records: res.data }))
      .catch(err => console.log(err))
  }

  testFunc = (x) => {
    alert(x);
  }

  render() {
    return (
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
            {/* <img src="http://www.petmd.com/sites/default/files/what-does-it-mean-when-cat-wags-tail.jpg" class="coverflow__cover__25-7e" alt="Title"/>
 */}

    {Img({albums: this.state.records, func: this.testFunc})} 

      </Coverflow>

    )
  }
}

export default Library;