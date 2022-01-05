import React, { useState, useEffect } from "react";
import "./favorite.css";

const Favorite = () => {
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
  }, []);

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

  const renderedResults = cities.map((city, index) => {
    return (
      <React.Fragment key={index}>
        <tr>
          <td data-label="City" className="city">
            {city}
          </td>
          <td data-label="Delete">
            {" "}
            <button className="mobile" onClick={() => onDelete(city)}>
              <span className="search-magnifier" aria-label="trash" role="img">
                🗑️
              </span>
            </button>
          </td>
          <td data-label="Update">
            <input
              className="input mobile-input"
              placeholder="Update the city"
              type="text"
              onChange={(e) => setUpdateCity(e.target.value)}
            />
            <button className="mobile" onClick={() => onUpdate(city)}>
              <span className="search-magnifier" aria-label="floppy" role="img">
                💾
              </span>
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <div>
      <div className="add-city-cont">
        <input
          className="add-city-input input"
          type="text"
          placeholder="Add new city"
          onChange={(e) => setNewCity(e.target.value)}
        />

        <button className="mobile" onClick={onCreate}>
          {" "}
          <span className="search-magnifier" aria-label="plus" role="img">
            ➕
          </span>
        </button>
      </div>
      {cities.length > 0 && (
        <div>
          <table className="my-table">
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
      )}
    </div>
  );
};

export default Favorite;
