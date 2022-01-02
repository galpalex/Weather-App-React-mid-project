import React, { useState } from "react";
import GetDate from "./GetDate";
import axios from "axios";

const api = {
  key: "fbb5a29cf4c67bb8ccfba0781293e5d7",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Search = () => {
  const [data, setData] = useState({});
  const [term, setTerm] = useState("");

  const getOneLocationWeather = async () => {
    try {
      const { data } = await axios.get(
        `${api.base}weather?q=${term}&units=metric&APPID=${api.key}`,
        {}
      );
      setData(data);
    } catch (error) {
      console.log("Got Error");
    }
  };

  return (
    <div className="container">
      <div className="search-cont">
        <input
          placeholder="Enter City Name"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          className="input"
        />
        <button
          onClick={() => {
            getOneLocationWeather();
          }}
        >
          Search
        </button>
        <button>Favorite Cities</button>
      </div>

      {data.cod === 200 ? (
        <div className="weather-cont">
          <div className="location-cont">
            <div className="location">
              {data.name}, {data.sys.country}
            </div>
            <div className="date">
              <GetDate />
            </div>
          </div>
          <div className="weather-box">
            <div className="temp">{data.main.temp}°c</div>
            <div className="weather">{data.weather[0].main}</div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
