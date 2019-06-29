import React from "react";
import "./style.css"


function Track(props) {

    return (
        <div className="p-3">
            <h3 className="tracks-heading pt-4">Tracks</h3>


            <table class="table tb-format table-hover">
                <thead>
                    <tr className="lib-table-tr">
                        <th scope="col lib-table-th">Title</th>
                        <th scope="col lib-table-th">Time</th>
                        <th scope="col lib-table-th"></th>
                    </tr>
                </thead>
                <tbody>
                {props.tracks.map(track => (
                    <tr>
                        {track.title.length>0 ? (<td className="lib-table-td">{track.title} </td>):(<td className="lib-table-td">Not Available</td>)}
                        {track.duration.length>0 ? (<td className="lib-table-td">{track.duration} </td>):(<td className="lib-table-td">Not Available</td>)}
                        <td><i className="fa fa-youtube-play play-icon" onClick={()=> props.getYouTubeVideos(`${props.artist} ${track.title}`)}></i></td>
                    </tr>
                ))}


                </tbody>
            </table>
        </div>

    );
}

export default Track;