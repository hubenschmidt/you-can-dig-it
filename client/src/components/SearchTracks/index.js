import React from "react";

function SearchTracks(props){
    return(
        <div>
            {props.tracks.map(track => (
                <div>
                    {track.title}
                    {track.duration}
                    <td><i className="fa fa-youtube-play play-icon" onClick={()=> props.getYouTubeVideos(`${props.artist} ${track.title}`)}></i></td>                    </div>
            ))}
        </div>
    )
}

export default SearchTracks;