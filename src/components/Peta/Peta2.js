import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";
import dataMap from "./Vertex.json";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const Map = ({
  setKoordinat,
  setBatas,
  koordinat,
  tempat,
  setChildClicked,
}) => {
  console.log("data map", dataMap);
  const kelasDetail = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k",
    libraries: ["places"],
  });

  return (
    <div className={kelasDetail.mapContainer}>
      <GoogleMap
        center={koordinat}
        zoom={14}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          //   fullscreenControl: false,
        }}

        // margin={[50, 50, 50, 50]}
        // className=""
        // bootstrapURLKeys={{ key: "AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k" }}
        // defaultCenter={koordinat}
        // onCenterChanged={(e) => {
        //   setKoordinat({ lat: e.center.lat, lng: e.center.lng });
        //   setBatas({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        // }}
        // onClick={(child) => setChildClicked(child)}
      >
        {tempat?.map((place, i) => (
          <Marker
            onClick={(child) => console.log("ini child", child)}
            position={{
              lat: Number(place.latitude),
              lng: Number(place.longitude),
            }}
          />
        ))}
        {/* {tempat?.map((place, i) => (
          <div
            className={kelasDetail.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            <Paper elevation={3} className={kelasDetail.paper}>
              <Typography
                className={kelasDetail.typography}
                variant="subtittle2"
                gutterBottom
              >
                {place.name}
              </Typography>
              <img
                className={kelasDetail.pointer}
                src={place.photo ? place.photo.images.large.url : ""}
                alt={place.name}
              />
              <Rating size="small" value={Number(place.rating)} readOnly />
            </Paper>
          </div>
        ))} */}
        {/* // untuk vertex yg ada di file vertex.json pake marker biasa */}
        {/* <Marker position={koordinat} />

        {dataMap.map((item) => (
          <Marker
            position={{
              lat: item.lat,
              lng: item.lng,
            }}
          />
        ))} */}
      </GoogleMap>
    </div>
  );
};

export default Map;
