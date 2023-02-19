import React, { useState, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { WiVolcano } from "react-icons/wi";
import { MdOutlineLocalFireDepartment , MdWaterDrop,MdOutlineStorm} from "react-icons/md";
import Infobox from "./Components/Infobox";
import Map, { Marker } from "react-map-gl";
import Loader from "./Components/Loader";
import { PieChart } from "react-minimal-pie-chart";
const App = () => {
  const [data, setData] = useState([]);
  const [infobox, setinfobox] = useState();
  const [loader, setloader] = useState(false);
   const [wildfire,setwildfire]=useState(0);
  const [volcano,setvolcano]=useState(0);
   const [storms,setstorms]=useState(0);
   const [other,setother]=useState(0);
 
  const setValue=()=>{
      setvolcano(prev=>prev+1) 
  }
  const setValue1=()=>{
      setwildfire(prev=>prev+1) ;
  }
  const setValue2=()=>{
      setstorms(prev=>prev+1) ;
  }
  const setValue3=()=>{
      setother(prev=>prev+1) ;
  }
  
  const countall=()=>{
   for(let i=0;i<data.length;i++)
   {
     if(data[i].categories[0].id === 12)
     {
        setValue();
     }
     if(data[i].categories[0].id === 8)
     {
        setValue1();
     }
     if(data[i].categories[0].id === 15)
     {
        setValue2();
     }
     if(data[i].categories[0].id === 10)
     {
        setValue3();
     }
   }
}
  
   console.log("volcanos are: ",volcano);
  useEffect(() => {

    const getValue = async () => {
      setloader(true);
      const res = await fetch(
        "https://eonet.gsfc.nasa.gov/api/v2.1/events"
      );
      const resdata = await res.json();
      setData(resdata.events);
      setloader(false);
      console.log(data);
      countall();
    };
    getValue();
    // eslint-disable-next-line
    
  },[]);
  console.log("array length is: ",data.length);
  

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="main">
          <div className="rightbox">
            <div className="navbar">Disaster Tracker</div>
            {infobox && <Infobox infobox={infobox} />}
            <div className="calamties_chart">
              <div className="total">
              <span>SubTotal</span>
              <span className="value">{data.length}</span>
              </div>
              <PieChart
                data={[
                  { text: "One", value: wildfire, color: "tomato" },
                  { title: "Two", value: volcano, color: "#443C68" },
                  { title: "Four", value: storms, color: "aqua" },
                  { title: "Three", value: other, color: "#A27B5C" },
                ]}
              />
              ;
              <label>Disasters</label>
            </div>
          </div>

          <Map
            initialViewState={{
              longitude: -100,
              latitude: 40,
              zoom: 5,
            }}
            style={{ width: "80vw", height: "100vh", position: "relative",border: "inset" ,borderRadius:"1px",borderColor: "rgba(0,0,0,0.1)" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1Ijoib21rYXI0MDMzIiwiYSI6ImNsZTE3aDVqNjBlMG0zcW12MzZlMm9hcDUifQ.5PArT3vGqGuNpM0_yQay1w"
          >
            {   data.map((d) => (
              <Marker
                key={d.id}
                longitude={d.geometries[0].coordinates[0]}
                latitude={d.geometries[0].coordinates[1]}
                anchor="bottom"
              >
               { d.categories[0].id ===12 && <WiVolcano
                  onClick={() =>
                    setinfobox({
                      id: d.id,
                      title: d.title,
                      category_id: d.categories[0].id,
                      url: d.sources[0].url,
                      category:d.categories[0].title
                    })
                  }
                  style={{ fontSize: "25px", color: "#443C68" }}
                />}
               { d.categories[0].id ===8 && <MdOutlineLocalFireDepartment
                  onClick={() =>
                    setinfobox({
                      id: d.id,
                      title: d.title,
                      url: d.sources[0].url,
                      category_id: d.categories[0].id,
                      category:d.categories[0].title
                    })
                  }
                  style={{ fontSize: "15px", color: "tomato" }}
                />}
               { d.categories[0].id ===15 && <MdWaterDrop
                  onClick={() =>
                    setinfobox({
                      id: d.id,
                      title: d.title,
                      url: d.sources[0].url,
                      category_id: d.categories[0].id,
                      category:d.categories[0].title
                    })
                  }
                  style={{ fontSize: "15px", color: "#00FFF6" }}
                />}
               { d.categories[0].id ===10 && <MdOutlineStorm
                  onClick={() =>
                    setinfobox({
                      id: d.id,
                      title: d.title,
                      url: d.sources[0].url,
                      category_id: d.categories[0].id,
                      category:d.categories[0].title
                    })
                  }
                  style={{ fontSize: "15px", color: "#A27B5C" }}
                />}
             
             
              </Marker>
            ))}
          </Map>

          <div className="footer ">Copyright @ Omkar Raghu</div>
        </div>
      )}
    </div>
  );
};

export default App;
