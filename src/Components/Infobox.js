import React from "react";

const Infobox = ({ infobox }) => {
  return (
    <div className="infobox">
      <h4>Event Info</h4>
      <ul >
        <li><label>Category_Id</label>{infobox.category_id}</li>
        <li><label>Event_Id</label> {infobox.id}</li>
        <li><label>Location</label> {infobox.title}</li>
        <li ><label>Category</label> {infobox.category}</li>
        <li style={{"textAlign":"center"}}>
          <a rel="noreferrer" target="_blank" href={infobox.url}>read more</a>
        </li>
      </ul>
    </div>
  );
};

export default Infobox;
