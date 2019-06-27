import React, { Component } from 'react'

import './style.css'
import API from '../../utils/API';
import SearchForm from '../SearchForm';
import Panel from '../Panel';
import { List } from '../List'


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
            console.log(res.data.pagination)
 
            // this.setState({
            //     results: res.data,
            //     message: !res.data.length
            //     ? "No results"
            //     : ""
            // }),
            
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
                      console.log('release info on Search component', release)
                      
                    // <Release
                    //   key={release._id}
                    //   _id={release._id}
                    // //   title={release.headline.main}
                    //   url={article.web_url}
                    //   date={article.pub_date}
                    //   handleClick={this.handleReleaseSave}
                    //   buttonText="Save Release"
                    // />
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