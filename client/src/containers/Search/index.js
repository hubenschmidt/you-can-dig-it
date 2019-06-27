import React, { Component } from 'react';

import './style.css';
import API from '../../utils/API';
// import SearchForm from '../SearchForm';
// import Panel from '../Panel';
// import { List } from '../List';
// import Release from '../Release';


class Search extends Component {
    state = {
        q: '',
        // type: '',
        releases: [],
        message: "discover new music.."
    }


    handleInputChange = e => {
        this.setState({
            search_term: e.target.value
          })
          console.log(this.state.search_term);
    };

    getSearchResults = () => {
        API.getSearchResults({
            q: this.state.q,
            // type: this.state.type
        })
        .then(res =>
            // console.log(res.data.results)
            this.setState({
                releases: res.data.results,
                message: !res.data.length
                ? "No results"
                : ""
            })
            )
        .catch(err => console.log(err));
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.getSearchResults();
    };

    handleReleaseSave = id => {
        // console.log(id, 'handle release save id')
        const checkState = this.state.releases;
        // console.log('state is here',checkState)
        const release = this.state.releases.find(release => release.id === id);
        // console.log(release)
        API.saveRelease(release).then(res => 
            console.log('save release',res),
            this.getSearchResults()
            );
    };

    render() {
        return (
            <div className="input-group mb-3 search">
                <input onChange={this.handleInputChange} type="text" className="form-control" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <div className="input-group-append">
                    <button onClick={this.handleFormSubmit} className="btn" type="button" id="button-addon2">Search</button>
                </div>
        </div>
        )
      }
      
}



export default Search