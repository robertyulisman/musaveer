import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import "./styles.css";
import FilterHdr from "@mui/icons-material/FilterHdr";

const HeaderCustom = ({ setTipe, setKoordinat }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => setAutocomplete(autoC);
  const gantiTempat = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setKoordinat({ lat, lng });
  };

  return (
    <nav>
      <ul>
        <li className="logo">
          <FilterHdr possition="absolute" className="gambar" sx={{ fontSize: 40 }} />
          mosaveer
        </li>
        <div className="item">
          <li>
            <a value="restaurants" onClick={() => setTipe("restaurants")}>
              Restoran
            </a>
          </li>
          <li>
            <a value="hotels" onClick={() => setTipe("hotels")}>
              Hotel
            </a>
          </li>
          <li>
            <a value="attractions" onClick={() => setTipe("attractions")}>
              Tempat Menarik
            </a>
          </li>
        </div>
        <Autocomplete onLoad={onLoad} onPlaceChanged={gantiTempat}>
          <li className="search-icon">
            <input type="search" placeholder="Cari Tempat..." />
            <label className="icon">
              <span className="fas fa-search"></span>
            </label>
          </li>
        </Autocomplete>
      </ul>
    </nav>
  );
};

export default HeaderCustom;
