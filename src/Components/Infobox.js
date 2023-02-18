import React from "react";

const Infobox = ({ infobox }) => {
  return (
    <div className="infobox">
      <h4>Event Info</h4>
      <ul >
        <li  >Id: {infobox.id}</li>
        <li>Title: {infobox.title}</li>
        <li>Category: {infobox.category}</li>
        <li>
          <a rel="noreferrer" target="_blank" href={infobox.url}>read more</a>
        </li>
      </ul>
    </div>
  );
};

export default Infobox;
