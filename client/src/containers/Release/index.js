import React from "react";
import { ListItem } from "../List";

const Release = ({
    id_release,
    title,
    labels,
    year,
    country,
    genres,
    styles,
    thumb,
    cover_image,
    resource_url,
    master_url,
    uri,
    master_id,
    user_data,
    handleClick,
    buttonText }) => (
  <ListItem>
    <h3>
      <em>{title}</em>{" "}
      <div>
          <img src={cover_image} alt={title} />
      </div>
      <span className="btn-group pull-right">
        <a className="btn btn-default" href={resource_url} rel="noopener noreferrer" target="_blank">
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
