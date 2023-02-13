import React from 'react'

const Infobox = ({infobox}) => {
  return (
    <div className="infobox">
        <h2>Event Location Info</h2>
        <ul>
            <li>ID: {infobox.id}</li>
            <li>Title: {infobox.title}</li>
        </ul>
    </div>
  )
}

export default Infobox