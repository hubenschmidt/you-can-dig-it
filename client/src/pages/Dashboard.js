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


const socket = io(API_URL)
const providers = ['discogs']

class Dashboard extends Component {

  state = {
    loading: true
  }

  componentDidMount(){
    fetch(`${API_URL}/wake-up`)
      .then(res => {
        if (res.ok){
          this.setState({ loading: false })
        }
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
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are now logged into the final project!{" "}
                <span style={{ fontFamily: "monospace" }}>you-can-dig-it</span> app 👏
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
