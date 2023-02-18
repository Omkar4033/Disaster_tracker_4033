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

  // let wildfire=0,volcano=0,storms=0,other=0;

  // const countall=(d)=>{
  //     if(d.categories[0].id ===12)
  //     volcano++;
  // }

  useEffect(() => {
    const getValue = async () => {
      setloader(true);
      const res = await fetch(
        "https://eonet.gsfc.nasa.gov/api/v2.1/events"
      );
      const resdata = await res.json();
      setData(resdata.events);
      console.log(data);
      setloader(false);
      // const rest=await data.filter(countall);
    };

    getValue();
    // eslint-disable-next-line
  }, []);

  // console.log("total data is",data.length);
  // console.log(volcano);

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
             
              <PieChart
                data={[
                  { text: "One", value: 80, color: "tomato" },
                  { title: "Two", value: 15, color: "pink" },
                  { title: "Four", value: 14, color: "aqua" },
                  { title: "Three", value: 1, color: "purple" },
                ]}
              />
              ;
            </div>
          </div>

          <Map
            initialViewState={{
              longitude: -100,
              latitude: 40,
              zoom: 5,
            }}
            style={{ width: "80vw", height: "100vh", position: "relative" }}
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
                  style={{ fontSize: "25px", color: "yello" }}
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
                  style={{ fontSize: "15px", color: "purple" }}
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
