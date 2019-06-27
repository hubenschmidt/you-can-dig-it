import React from "react";

import YouTube from 'react-youtube';
function YouTubeVid(props) {

    return (
        <div className="p-3">
 
                {props.videos.map(vid => (
                                  <YouTube
                                  containerClassName={"d-flex justify-content-center p-3"}
                                  className={""}
                                  videoId={vid.id.videoId}
                                  opts={props.opts}
                                //   onReady={this._onReady}
                                />

                ))}



        </div>

    );
}

export default YouTubeVid;