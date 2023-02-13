import React, { useState,useEffect } from 'react'
import "mapbox-gl/dist/mapbox-gl.css";
import { WiVolcano } from 'react-icons/wi';

import Map, {Marker} from 'react-map-gl';
const App = () => {

  const [data,setData]=useState([]);

  useEffect(() => {

    const getValue=async()=>{

        const res= await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/categories/12")
        const resdata= await res.json();
      setData(resdata.events);
        console.table(data)
      }
      
    getValue();
    // eslint-disable-next-line
  }, [])
  
  const setInfo=(d)=>{
      return <div className='infobox'>info</div>
  }

  return (
    <div>
   
    <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 5
    }}
    style={{width: '100vw', height: '100vh'}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken="pk.eyJ1Ijoib21rYXI0MDMzIiwiYSI6ImNsZTE3aDVqNjBlMG0zcW12MzZlMm9hcDUifQ.5PArT3vGqGuNpM0_yQay1w"
  >
  {data.map((d)=>(
    <Marker key={d.id} longitude={d.geometries[0].coordinates[0]} latitude={d.geometries[0].coordinates[1]} anchor="bottom" >
      <WiVolcano  onClick={()=>setInfo(d)} style={{ fontSize:"25px", color: "red"}} />
    </Marker>
  ))}

    </Map>
    </div>
  )
}

export default App