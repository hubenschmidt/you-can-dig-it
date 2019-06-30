import React from "react";
import "./style.css"

function SearchTracks(props) {
    return (
        <div className="">
            <table class="table tb-format table-hover">
                <thead>
                    <tr>
                        <th scope="col track-title" style={{ color: "#79dfd5"}}>Title</th>
                        <th scope="col track-title" style={{ color: "#79dfd5"}}>Time</th>
                        <th scope="col track-title"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.tracks.map(track => (
                        <tr>
                            {track.title.length > 0 ? (<td className="track">{track.title} </td>) : (<td className="track">Not Available</td>)}
                            {track.duration.length > 0 ? (<td className="track">{track.duration} </td>) : (<td className="track">Not Available</td>)}
                            <td><i className="fa fa-youtube-play play-icon" onClick={() => props.getYouTubeVideos(`${props.artist} ${track.title}`)}></i></td>
                        </tr>
                    ))}


                </tbody>
            </table>

        </div>
    )
}

export default SearchTracks;