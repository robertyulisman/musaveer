import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";

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
  dataNode,
  directionsResponse,
  onLoad,
}) => {
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
        onLoad={onLoad}

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
            onClick={() => setChildClicked(i, place)}
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
        <Marker
          icon={{
            path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
            fillColor: "yellow",
            fillOpacity: 0.9,
            scale: 2,
            strokeColor: "gold",
            strokeWeight: 2,
          }}
          position={koordinat}
        />

        {dataNode.map((item) => (
          <Marker
            key={item.id}
            icon={
              "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            }
            position={{
              lat: item.lat,
              lng: item.lng,
            }}
          />
        ))}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
