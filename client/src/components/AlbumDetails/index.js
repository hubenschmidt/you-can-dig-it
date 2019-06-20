import React from "react";
import "./style.css";



function AlbumDetails(props) {
  
  return (
    <div>
      <div className="album-details pt-3">
        <h1 className="album-title">{props.activeRecord.title}</h1>
        <div className="album-sub-details">
        <div className="artist">By {props.activeRecord.artist}</div>
        <div className="year">Release Year: {props.activeRecord.year}</div>
        <div className="country">Country: {props.activeRecord.country}</div>
        <div className="genres">Genre(s):{props.activeRecord.genres}
        </div>
        </div>
      </div>
    </div>


    //album title 
    //artist
    //release year
    //country
    //genre

  );
}

export default AlbumDetails;