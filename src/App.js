// Hooks
import { useState } from "react";

// Styles
import "./App.css";

// Icons

import { BiSearch } from "react-icons/bi";

const apiKey = "5c1e801a98de55b805c069472e3bdc3a";

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );
    const data = await res.json();

    if (data.cod === "404") {
      setError(true);
      setLocation("");
      setWeather(null);
    } else {
      setWeather(data);
      setLocation("");
      setError(false);
    }
  };

  console.log(weather);
  const enterLocation = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="card">
      <div className="search">
        <input
          value={location}
          onChange={enterLocation}
          type="text"
          className="search-bar"
          placeholder="Search"
        />
        <button onClick={fetchData}>
          <BiSearch />
        </button>
      </div>
      {weather && (
        <div className="weather">
          <h2 className="city">Weather in {weather && weather.name} </h2>
          <h1 className="temp">{weather && weather.main.temp.toFixed()}°C</h1>
          <div className="flex">
            <img
              src="https://openweathermap.org/img/wn/04n.png"
              alt=""
              className="icon"
            />
            <div className="description">Cloudy</div>
          </div>
          <div className="humidity">
            Humidity: {weather && weather.main.humidity}%
          </div>
          <div className="wind">
            Wind speed: {weather && weather.wind.speed} km/h
          </div>
        </div>
      )}
      {error && <p>Please enter a valid location</p>}
    </div>
  );
};

export default App;
