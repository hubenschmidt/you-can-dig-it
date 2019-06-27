import React from "react";
import "./style.css"


function Track(props) {

    return (
        <div className="p-3">
            <h3 className="tracks-heading pt-4">Tracks</h3>


            <table class="table tb-format table-hover">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Time</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                {props.tracks.map(track => (
                    <tr>
                        {track.title.length>0 ? (<td className="track">{track.title} </td>):(<td className="track">Not Available</td>)}
                        {track.duration.length>0 ? (<td className="">{track.duration} </td>):(<td className="track">Not Available</td>)}
                        <td><i className="fa fa-youtube-play play-icon" onClick={()=> props.getYouTubeVideos(`${props.artist} ${track.title}`)}></i></td>
                    </tr>
                ))}


                </tbody>
            </table>
            {/* <ol>
                {props.tracks.map(track => (
                    <li>
                        <div className="track">{track.title} </div>
                    </li>
                ))}

            </ol> */}
        </div>

    );
}

export default Track;