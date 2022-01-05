import React, { useState, useEffect } from "react";
import GetDate from "./GetDate";
import api from "./api";
import axios from "axios";

const Search = () => {
  const [data, setData] = useState({});
  const [term, setTerm] = useState("");
  const [cities, setCities] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const readCities = () => {
      if (localStorage.getItem("cities")) {
        setCities(JSON.parse(localStorage.getItem("cities")));
      }
    };
    readCities();
  }, []);

  const getOneLocationWeather = async () => {
    try {
      const { data } = await axios.get(
        `${api.base}weather?q=${term}&units=metric&APPID=${api.key}`,
        {}
      );
      setData(data);
      setIsError(false);
      cities.push(term);
      localStorage.setItem("cities", JSON.stringify(cities));
    } catch (error) {
      console.log("City is not found");
      setIsError(true);
    }
  };

  return (
    <div className="container">
      <div className="search-cont">
        <input
          className="input search"
          placeholder="Enter CITY and get today weather forecast"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getOneLocationWeather();
          }}
        >
          <span className="search-magnifier" aria-label="magnifier" role="img">
            🔍
          </span>
        </button>
      </div>
      {isError ? (
        <div className="error"> Sorry, the city "{term}" is not found </div>
      ) : (
        ""
      )}
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
