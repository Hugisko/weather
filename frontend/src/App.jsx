import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./App.css";
import Loading from "./Loading";

const App = () => {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchCity = async (e, value) => {
    if (e !== null) {
      e.preventDefault();
    }
    const valueSearch = value;
    const options = {
      method: "POST",
      url: "https://weather-app-server-oeke.onrender.com/api/data",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ valueSearch: valueSearch }),
    };

    setLoading(true);
    try {
      const response = await fetch(options.url, options);
      const data = await response.json();
      if (data.status === "success") {
        setError(false);
        setCity(data.body.name);
        setTemperature(parseInt(data.body.main.temp));
        setImage(
          "https://openweathermap.org/img/wn/" +
            data.body.weather[0].icon +
            ".png"
        );
        setDescription(data.body.weather[0].description);
        setHumidity(data.body.main.humidity);
        setWind(data.body.wind.speed);
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    searchCity(null, "Kosice");
  }, []);

  return (
    <main>
      <div className="overlay"></div>
      <div className="wrapper">
        <h1>Weather App</h1>
        <div className="weather-container">
          <form
            onSubmit={(e) => searchCity(e, search)}
            className="search-container"
          >
            <div className="input-field">
              <input
                type="text"
                className="search-bar"
                spellCheck="false"
                placeholder="search city"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="search-btn">
              <BiSearchAlt />
            </button>
            {error && <p className="error-message">Wrong input</p>}
          </form>
          {loading ? (
            <Loading />
          ) : (
            <div className="weather">
              <span className="city">{city}</span>
              <p className="temperature">
                <span className="temp">{temperature}</span> °C
              </p>
              <div className="description">
                <img src={image} alt="image" />
                <span>{description}</span>
              </div>
              <p>
                Humidity: <span className="humid">{humidity}</span>%
              </p>
              <p>
                Wind: <span className="wind">{wind}</span> km/h
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
