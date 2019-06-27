import React from "react";
import { ListItem } from "../List";

const Release = ({ 
    _id, title, labels, year, country, genres, styles, url, user_data, handleClick, buttonText }) => (
  <ListItem>
    <h3>
      <em>{title}</em>{" "}
      <span className="btn-group pull-right">
        <a className="btn btn-default" href={url} rel="noopener noreferrer" target="_blank">
          View Release
        </a>
        <button onClick={() => handleClick(_id)} className="btn btn-primary">
          {buttonText}
        </button>
      </span>
    </h3>
  </ListItem>
);

export default Release;
