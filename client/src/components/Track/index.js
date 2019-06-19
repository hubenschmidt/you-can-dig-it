import React from "react";


function Track(props) {

    return (
        <div>
            <div>Tracks</div>
            <ol>
                {props.tracks.map(track => (
                    <li>
                        <div className="track">{track.title} </div>
                    </li>
                ))}

            </ol>
        </div>

    );
}

export default Track;