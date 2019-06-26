import React, { Component } from 'react'
// import axios from 'axios'
import Suggestions from '../../components/Suggestions'
import './style.css'

const Discogs = require('disconnect').Client

//hard coded for dev use. get current user logged in from mongodb
const accessDataObj = {
    method: 'oauth',
    level: 2,
    consumerKey: 'ucyQbMxfuVNEigpgyQrp',
    consumerSecret: 'hJkdzVOPODpOErIWzhkKgUeBJDQlqAEt',
    token: 'HbfWYiIndiXviDFOCAQdaGZJfCCXTMMUobCjkKVI',
    tokenSecret: 'ZEnTKLhXQlLIYFeRVnPkdkiFAqpxfqybUzXYsBrI',
    authorizeUrl: 'https://www.discogs.com/oauth/authorize?oauth_token=HbfWYiIndiXviDFOCAQdaGZJfCCXTMMUobCjkKVI'
}
const db = new Discogs(accessDataObj).database()

class Search extends Component {
    state = {
        query: '',
        results: []
    }

    // db.search(req || 'The Beatles the Rolling Stones', {page:1, per_page:1}, function(err, result, rateLimit){
    //     if (err){
    //         console.log(err)
    //     }
    //     console.log(result)

    // })


    getInfo = () => {
        // console.log(`${this.state.query}`)
        db.search(`${this.state.query}&page=1&per_page=1`)
            .then(({ results }) => {
                this.setState({
                    results: results
                })
            })
        }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
                this.getInfo()
            }
            } 
        })
    }



    render() {
        return (
            <form>
            <div class="search-container h-100">
                <div class="d-flex justify-content-center h-100">
                    <div class="searchbar">
                 
                    <input
                        class="search_input"
                        placeholder="Search for..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    />
                     <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
                    <p>{this.state.query}</p>
                    <Suggestions results={this.state.results} />
                 
                    </div>
                </div>
              </div>
              </form>
              
        )
      }
}

export default Search