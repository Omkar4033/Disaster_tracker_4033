import React, { useState,useEffect } from 'react'
import "mapbox-gl/dist/mapbox-gl.css";
import { WiVolcano } from 'react-icons/wi';
import Infobox from './Components/Infobox';
import Map, {Marker} from 'react-map-gl';
import Loader from './Components/Loader';
const App = () => {

  const [data,setData]=useState([]);
  const [infobox, setinfobox] = useState(null);
  const [loader,setloader]=useState(false);

  useEffect(() => {

    const getValue=async()=>{
        setloader(true);
        const res= await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/categories/12")
        const resdata= await res.json();
      setData(resdata.events);
        console.table(data);
        setloader(false);
      }
      
    getValue();
    // eslint-disable-next-line
  }, [])
  


  return (
    <div>
    {loader ? <Loader/> :

    <div>
    <div className="navbar">
      Volcano Tracker
    </div>

    <Map
    initialViewState={{
      longitude: -100,
      latitude: 40,
      zoom: 5
    }}
    style={{width: '100vw', height: '100vh',position:"relative"}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken="pk.eyJ1Ijoib21rYXI0MDMzIiwiYSI6ImNsZTE3aDVqNjBlMG0zcW12MzZlMm9hcDUifQ.5PArT3vGqGuNpM0_yQay1w"
  >
  {data.map((d)=>(
    <Marker key={d.id} longitude={d.geometries[0].coordinates[0]} latitude={d.geometries[0].coordinates[1]} anchor="bottom" >
      <WiVolcano  onClick={()=>setinfobox({id: d.id ,title: d.title })} style={{ fontSize:"25px", color: "red"}} />
    </Marker>
  ))}
    
    </Map>
      {infobox  && 
          <Infobox infobox={infobox} /> 
      }

    <div className="footer">
      Copyright@Omkar Raghu
    </div>

    </div> }
    </div>
  )
}

export default App