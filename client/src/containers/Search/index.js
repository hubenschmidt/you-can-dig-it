import React, { Component } from 'react';

import './style.css';
import API from '../../utils/API';
import SearchForm from '../SearchForm';
import Panel from '../Panel';
import { List } from '../List';
import Release from '../Release';
import store from '../../store'


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
            })
            )
        .catch(err => console.log(err));
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.getSearchResults();
    };

    handleReleaseSave = id => {
        var state = store.getState();
        console.log(state, 'getstatehere')
        // console.log(id, 'handle release save id')
        // const checkState = this.state.releases;
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
                    <Release
                      key={release.id}
                      id_release={release.id}
                      title={release.title}
                      labels={release.label}
                      year={release.year}
                      country={release.country}
                      genres={release.genres}
                      styles={release.style}
                      thumb={release.thumb}
                      cover_image={release.cover_image}
                      resource_url={release.resource_url}
                      master_url={release.master_url}
                      uri={release.uri}
                      user_data={release.user_data}
                      handleClick={this.handleReleaseSave}
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