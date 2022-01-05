import React, { useState, useEffect } from "react";
import "./search5Days.css";
import api from "./api";
import axios from "axios";

const Search5Days = () => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [fullWord, setFullWord] = useState("");
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

  useEffect(() => {
    const get5DaysWeather = async () => {
      try {
        const { data } = await axios.get(
          `${api.base}forecast?q=${fullWord}&units=metric&APPID=${api.key}`,
          {}
        );
        setData(data.list);
        setIsError(false);
        cities.push(term);
        localStorage.setItem("cities", JSON.stringify(cities));
      } catch (error) {
        console.log("City is not found");
        setIsError(true);
      }
    };
    if (fullWord) {
      get5DaysWeather();
    }
  }, [fullWord]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderedResults = data.map((city) => {
    return (
      <tr key={city.dt}>
        <td data-label="Date">{city.dt_txt}</td>
        <td data-label="Temp">{city.main.temp}°c</td>
        <td data-label="Weather">{city.weather[0].main}</td>
        <td data-label="Humidity">{city.main.humidity}%</td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="search-cont">
        <input
          placeholder="Enter CITY and get 5 days weather forecast"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          className="input search"
        />

        <button
          onClick={() => {
            setFullWord(term);
          }}
        >
          <span className="search-magnifier" aria-label="magnifier" role="img">
            🔍
          </span>
        </button>
      </div>
      {isError ? (
        <div className="error">Sorry, the city "{fullWord}" is not found</div>
      ) : (
        <div>
          {data.length > 0 && (
            <table className="my-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Temp</th>
                  <th>Weather</th>
                  <th>Humidity</th>
                </tr>
              </thead>
              <tbody>{renderedResults}</tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Search5Days;
