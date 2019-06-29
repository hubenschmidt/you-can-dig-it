import React from "react";
import SearchTracks from "../SearchTracks"

function SearchResults(props) {
    return (

        <div>
            {props.results.map(res => (
                <div>
                    <div>
                        <img src={res.image}></img>
                        <i class="fas fa-bookmark" onClick={() => props.saveToLibrary(res)}></i>
                    </div>

                    <div>{res.title}</div>
                    <div>{res.artist}</div>
                    <div>{res.year}</div>
                    <div>{res.country}</div>
                    <div>{res.genres}</div>
                    <SearchTracks 
                    tracks = {res.tracklist}
                    artist = {res.artist}
                    getYouTubeVideos={props.getYouTubeVideos}
                    />
                </div>
            ))}


        </div>
    )
}

export default SearchResults;