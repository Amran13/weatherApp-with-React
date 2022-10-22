import { useState } from "react";
import "./styles.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([{}]);

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ba4fe921a6df88f74a049bc77ce7c63f`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
          console.log(data);
          setCity("");
        });
    }
  };

  return (
    <div className="App">
      <input
        className="input"
        placeholder="Enter city name..."
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
        type="text"
      />
      <div>
        {typeof weatherData.main === "undefined" ? (
          <p>Wellcome to weather app.</p>
        ) : (
          <div>
            <p> {weatherData.name}</p>
            <p> {Math.round(weatherData.main.temp) - 273}°C</p>
            <p>{weatherData.weather[0].main}</p>
          </div>
        )}
        {weatherData.cod === "404" ? (
          <div>
            <p> 404! </p>
            <p>Not Found</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
