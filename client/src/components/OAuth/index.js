import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FontAwesome from 'react-fontawesome'
import { notify } from 'react-notify-toast'
import { launchPopup } from '../../utils/utils'
import { API_URL } from '../../utils/config'
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import store from "../../store";
import api from '../../utils/API'

class OAuth extends Component {
  
  state = {
    user: {},
    disabled: ''
  }  

  componentDidMount = () => {
    const { socket, provider } = this.props

    socket.on(provider, user => {
      this.popup.close()
      this.setState({user})
    })
  }

  // syncUserReleases(){
  //   var state = store.getState();
  //   var userId = state.auth.user.id;
  //   console.log('userId', userId)
  //   api.syncUserReleases(userId).then(data => {
  //     console.log(data);
  //   });
     
  // }


  //   socket.on(provider, ({ providerData, email }) => {  
  //     this.popup.close()
  //     this.props.addProviderData(provider, providerData, email)
  //   })

  //   socket.on(`${provider}-error`, msg => {
  //     this.popup.close()
  //     notify.show(msg)
  //   })
  // }

  checkPopup = () => {
    const check = setInterval(() => {
      const { popup } = this
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check)
        this.setState({ disabled: ''})
      }
    }, 1000)
  }

  openPopup = () => {
    const { provider, socket } = this.props
    const width = 600, height = 600
    const left = (window.innerWidth / 2) - (width / 2)
    const top = (window.innerHeight / 2) - (height / 2)
    const url = `${API_URL}/auth/${provider}?socketId=${socket.id}`

    return window.open(url, '',       
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    )

  }

  startAuth = () => {
    if (!this.state.disabled) {
      // const userId = this.props.auth.user.id;
      this.popup = this.openPopup()  
      this.checkPopup()
      // console.log("popup info", this.popup);
      this.setState({disabled: 'disabled'})
    
    }
  }

  closeCard = () => {
    this.setState({user: {}})
  }
  
  render = () => {
    // console.log(this.state)
    // let name, photo
    const { name, photo } = this.state.user

    // const { authData } = this.props
    // console.log('this props from startAuth',this.props)
    // if (authData) {
    //   name = this.props.authData.name
    //   photo = this.props.authData.photo
    // }

    // console.log("suth Data", authData);
    // console.log("this props", this.props)
    
    const { provider } = this.props
    const { disabled } = this.state
    const atSymbol = provider === 'discogs' ? '@' : ''
    
    return (
      <div>
        {name
          ? <div className='card'> 
              <img src={photo} alt={name} />
              <FontAwesome
                name='times-circle'
                className='close'
                onClick={() => this.closeCard}
              />
              <h4>{`${atSymbol}${name}`}</h4>
            </div>
          : <div className='button-wrapper fadein-fast'>
              <button 
                onClick={this.startAuth} 
                className={`${provider} ${disabled} button`}
              > authorize discogs
                <FontAwesome
                  name={provider}
                />
              </button>
            </div>
        }
      </div>
    )
  }
}

OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(OAuth);