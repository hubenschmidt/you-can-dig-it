import React from "react";
import { ListItem } from "../List";

const Release = ({ 
    id_release, title, labels, year, country, genres, styles, url, thumb, user_data, handleClick, buttonText }) => (
  <ListItem>
    <h3>
      <em>{title}</em>{" "}
      <div>
          <img src={thumb} alt={title} />
      </div>
      <span className="btn-group pull-right">
        <a className="btn btn-default" href={url} rel="noopener noreferrer" target="_blank">
          View Release
        </a>
        <button onClick={() => handleClick(id_release)} className="btn btn-primary">
          {buttonText}
        </button>
      </span>
    </h3>
  </ListItem>
);

export default Release;
