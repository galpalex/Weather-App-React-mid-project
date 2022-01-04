import React, { useState, useEffect } from "react";
import "./search5Days.css";
import axios from "axios";

const api = {
  key: "fbb5a29cf4c67bb8ccfba0781293e5d7",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Search5Days = () => {
  const [data, setData] = useState([]);
  const [term, setTerm] = useState("");
  const [fullWord, setFullWord] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const readCities = () => {
      if (localStorage.getItem("cities")) {
        setCities(JSON.parse(localStorage.getItem("cities")));
      }
    };
    readCities();
  }, []);

  const onCreate = () => {
    setFullWord(term);
    cities.push(term);
    localStorage.setItem("cities", JSON.stringify(cities));
  };

  useEffect(() => {
    const getOneLocationWeather = async () => {
      try {
        const { data } = await axios.get(
          `${api.base}forecast?q=${fullWord}&units=metric&APPID=${api.key}`,
          {}
        );
        setData(data.list);
        console.log(data.list);
      } catch (error) {
        console.log("Got Error");
      }
    };
    if (fullWord) {
      getOneLocationWeather();
    }
  }, [fullWord]);

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
          placeholder="Enter City Name"
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
          className="input"
        />

        <button
          onClick={() => {
            onCreate();
          }}
        >
          Search
        </button>
      </div>

      <div>
        <table class="my-table">
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
      </div>
    </div>
  );
};

export default Search5Days;
