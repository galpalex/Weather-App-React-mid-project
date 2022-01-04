import React, { useState, useEffect } from "react";
import "./favorite.css";

const Favorite = ({}) => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");
  const [updateCity, setUpdateCity] = useState("");

  useEffect(() => {
    const readCities = () => {
      if (localStorage.getItem("cities")) {
        setCities(JSON.parse(localStorage.getItem("cities")));
      }
    };
    readCities();
  }, [cities]);

  const onCreate = () => {
    cities.push(newCity);
    localStorage.setItem("cities", JSON.stringify(cities));
    setNewCity("");
  };

  const onDelete = (city) => {
    const index = cities.indexOf(city);
    cities.splice(index, 1);
    localStorage.setItem("cities", JSON.stringify(cities));
    setNewCity("");
    setCities(JSON.parse(localStorage.getItem("cities")));
  };
  const onUpdate = (city) => {
    const index = cities.indexOf(city);
    const citiesUpdated = JSON.parse(localStorage.getItem("cities"));
    citiesUpdated[index] = updateCity;
    localStorage.setItem("cities", JSON.stringify(citiesUpdated));
    setCities(JSON.parse(localStorage.getItem("cities")));
  };

  const renderedResults = cities.map((city) => {
    return (
      <tr key={city}>
        <td data-label="Date">{city}</td>
        <td data-label="Temp">
          {" "}
          <button onClick={() => onDelete(city)}>
            <span aria-label="trash" role="img">
              🗑️
            </span>
          </button>
        </td>
        <td data-label="Weather">
          <input type="text" onChange={(e) => setUpdateCity(e.target.value)} />
          <button onClick={() => onUpdate(city)}>
            <span aria-label="floppy" role="img">
              💾
            </span>
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="add-city-cont">
        <input
          className="add-city-input"
          type="text"
          placeholder="Add new city"
          onChange={(e) => setNewCity(e.target.value)}
        />

        <button onClick={onCreate}>
          {" "}
          <span aria-label="plus" role="img">
            ➕
          </span>
        </button>
      </div>
      <div>
        <table class="my-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Delete City</th>
              <th>Update City</th>
            </tr>
          </thead>
          <tbody>{renderedResults}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Favorite;
