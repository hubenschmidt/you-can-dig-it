import React from "react";



function AlbumDetails(props) {
  // let genres = props.activeRecord.genres.map(function (item) {return <span>{item}</span>} );
  
  return (
    <div>
      <div className="album-details">
        <div className="album-title">{props.activeRecord.title}</div>
        <div className="artist">By {props.activeRecord.artist}</div>
        <div className="year">Release Year: {props.activeRecord.year}</div>
        <div className="country">Country: {props.activeRecord.country}</div>
        <div className="genres">Genre(s):{props.activeRecord.genres}
        </div>
      </div>
      <div className="tracks">


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