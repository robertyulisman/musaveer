import React, { useState, useEffect } from "react";
import { CssBaseline, Grid, Card } from "@material-ui/core";
import { getDataTempat } from "./api";
import List from "./components/List/List";
import Peta from "./components/Peta/Peta";
import HeaderCustom from "./components/HeaderCustom/HeaderCustom";
import "./App.css";
import RestauranData from "./components/Peta/Restaurant.json";
import dataMap from "./components/Peta/Vertex.json";

const App = () => {
  const [tempat, setTempat] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [filterTempat, setFilterTempat] = useState([]);

  console.log("RestauranData", RestauranData);

  const [koordinat, setKoordinat] = useState({});
  const [batas, setBatas] = useState({});
  const [sdgLoading, setSdgLoading] = useState(false);
  const [tipe, setTipe] = useState("restaurants");
  const [rating, setRating] = useState("");

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [dataNode, setDataNode] = React.useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    setDataNode(dataMap);
    setTempat(RestauranData);
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setKoordinat({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filterTempat = tempat?.filter((place) => place.rating >= rating);
    setFilterTempat(filterTempat);
  }, [rating]);

  useEffect(() => {
    if (batas.sw && batas.ne) {
      setSdgLoading(true);
      getDataTempat(tipe, batas?.sw, batas?.ne).then((data) => {
        console.log(data);
        // setTempat(RestauranData);
        // setTempat(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilterTempat([]);
        setRating("");
        setSdgLoading(false);
      });
    }
  }, [tipe, batas]);

  const handleClickChild = async (i, place) => {
    // console.log("iteeeeeem", i);
    setChildClicked(i);
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    // eslint-disable-next-line no-undef
    const origin = new google.maps.LatLng(koordinat.lat, koordinat.lng);
    // eslint-disable-next-line no-undef
    const destination = new google.maps.LatLng(place.latitude, place.longitude);
    const results = await directionsService.route({
      origin: origin,
      destination: destination,

      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    if (results.status === "OK") {
      console.log("result", results);
      setDirectionsResponse(results);
    } else {
      alert("Directions request failed due to " + results.status);
    }
  };

  return (
    <>
      <CssBaseline />
      <HeaderCustom tipe={tipe} setTipe={setTipe} setKoordinat={setKoordinat} />
      <Grid container spacing={1} style={{ width: "100%" }}>
        <Grid item xs={12} md={8}>
          <Peta
            setKoordinat={setKoordinat}
            setBatas={setBatas}
            koordinat={koordinat}
            tempat={filterTempat?.length ? filterTempat : tempat}
            setChildClicked={(i, place) => handleClickChild(i, place)}
            dataNode={dataNode}
            directionsResponse={directionsResponse}
            onLoad={(map) => setMap(map)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <List
            tempat={filterTempat?.length ? filterTempat : tempat}
            childClicked={childClicked}
            sdgLoading={sdgLoading}
            tipe={tipe}
            setTipe={setTipe}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
