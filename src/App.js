import { useState } from "react";
import "./App.css";

function App() {
  const [cityName, setcityName] = useState("");
  const [cityLocation, setcityLocation] = useState("");
  const [cityTemp, setTemperature] = useState("");
  const [windspeed, setwindspeed] = useState("");

  function onCityChange(e) {
    setcityName(e.target.value);
  }
  async function checkWeather(e) {
    //make a function
    e.preventDefault(0);

    try {
      const weatherRes = await fetch(
        `https://P2pclouds.up.railway.app/v1/learn/weather?city=${cityName}`
      );
      const weather = await weatherRes.json();
      setTemperature(weather.current.temp_c);
      setcityLocation(weather.location.name);
      setwindspeed(weather.current.wind_kph);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }
  return (
    <div>
      <h1>Wether App</h1>
      <div className="container slide-in-fwd-center">
        <label className="label" for="city-name">
          City
        </label>
        <form onSubmit={checkWeather}>
          <input
            type="text"
            placeholder="Enter your City Name"
            name="cityName"
            onChange={onCityChange}
            id="city-input"
          />
          <button className="btn" type="submit">
            Get Weather
          </button>
          <h2 id="location">{cityLocation}</h2>
          <p id="Temperature">{cityTemp}°C</p>
          <p id="wind"> WindSpeed:{windspeed}m/s </p>
        </form>
      </div>
    </div>
  );
}

export default App;
