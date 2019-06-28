import React, { Component } from "react"
import "./style.css"

class BrandDesc extends Component {

    constructor () {
        super()
        this.state = {
          isHidden: true
        }
      }

      toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden
        })
      }

      render() {
        return (
            <div className="container d-flex justify-content-center" onClick={this.onClick}>
                <div className="brand-card" >
                    <a href="#" className='brand-card-close' ></a>
                        <div className="brand-content">
                        <h1 className="brand-text">connect your discogs account</h1>
                        <h1 className="brand-text">hear your collection</h1>
                        <h1 className="brand-text">ad free</h1>
                        </div>
                    </div>
            </div>
    )}
      }


export default BrandDesc;