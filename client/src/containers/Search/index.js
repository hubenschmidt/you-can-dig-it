import React, { Component } from 'react';

import './style.css';
import API from '../../utils/API';
import SearchForm from '../SearchForm';
import Panel from '../Panel';
import { List } from '../List';
import Release from '../Release';


class Search extends Component {
    state = {
        q: '',
        // type: '',
        releases: [],
        message: "discover new music.."
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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
            }),
            )
        .catch(err => console.log(err));
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.getSearchResults();
    };

    handleReleaseSave = id => {
        const release = this.state.releases.find(article => release._id === id);
        API.saveRelease(release).then(res => this.getReleases());
    };

    render() {
        return (
            <div>
            <Panel>
                <SearchForm 
                 handleInputChange={this.handleInputChange}
                 handleFormSubmit={this.handleFormSubmit}
                 q={this.state.q}
                />
            </Panel>
            <Panel title="Results">
            {this.state.releases.length ? (
                <List>
                  {this.state.releases.map(release => (
                    //   console.log('release info on Search component', release)
                    <Release
                      key={release.id}
                      _id={release.id}
                      title={release.title}
                      labels={release.label}
                      year={release.year}
                      country={release.country}
                      genres={release.genres}
                      styles={release.style}
                      url={release.resource_url}
                      user_data={release.user_data}
                      handleClick={this.handleReleaseSave}
                      year={release.year}
                      buttonText="Save to Library"
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Panel>
            </div>
        )
      }
      
}



export default Search