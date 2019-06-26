import React, { Component } from 'react'
// import axios from 'axios'

import './style.css'
import API from '../../utils/API';
import Form from '../Form';
import Panel from '../../components/Panel';


class Search extends Component {
    state = {
        q: '',
        // type: '',
        releases: [],
        message: "discover new music.."
    }
    //suggestive search
    // handleInputChange = () => {
    //     this.setState({
    //         query: this.search.value
    //     }, () => {
    //         if (this.state.query && this.state.query.length > 1) {
    //         if (this.state.query.length % 2 === 0) {
    //             this.getInfo()
    //         }
    //         } 
    //     })
    // }

    //suggestive search
        // getInfo = () => {
        //     db.search(`${this.state.query}`)
        //         .then(({ results }) => {
        //             this.setState({
        //                 results: results
        //             })
        //         })
        //     }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    getSearchResults = () => {
        API.getSearchResults({
            query: this.state.query,
            // type: this.state.type
        })
        .then(res =>
            this.setState({
                results: res.data,
                message: !res.data.length
                ? "No results"
                : ""
            }))
        .catch(err => console.log(err));
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.getReleases();
    };

    handleReleaseSave = id => {
        const release = this.state.releases.find(article => release._id === id);
        API.saveRelease(release).then(res => this.getReleases());
    };

    render() {
        return (
            <Form />
        )
      }
}

export default Search