import React from "react";
import SearchTracks from "../SearchTracks"
import "./style.css"

function SearchResults(props) {
    return (

        <div>

            {props.results.map(res => (
                <div className="row m-4">
                    <div className="col-md-5">
                        <div className="release-image">
                            <img src={res.image} className="img-thumbnail "></img>
                            <i class="fas fa-bookmark fa-3x pl-1" onClick={() => props.saveToLibrary(res)}></i>
                        </div>
                        <div className="release-details">
                            <div>Title: {res.title}</div>
                            <div>Artist(s): {res.artist}</div>
                            <div>Year: {res.year}</div>
                            <div>Country: {res.country}</div>
                            <div>Genres: {res.genres}</div>
                        </div>

                    </div>

                    <div className="col-md-7">
                        <SearchTracks
                            tracks={res.tracklist}
                            artist={res.artist}
                            getYouTubeVideos={props.getYouTubeVideos}
                        />
                    </div>
                </div>
            ))}


        </div>
    )
}

export default SearchResults;