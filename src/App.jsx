import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("weather_loading?")) {
      fetch("http://localhost:3000/weather")
        .then((response) => response.json())
        .then((data) => setData(data.results));
    }
    else {
      setData(JSON.parse(localStorage.getItem("weather_loading?")));
    }
  }, []);

  if (data) {
    localStorage.setItem("weather_loading?", JSON.stringify(data));
    console.log(data);
  }

  return (
    <>
      <h1>Clima by HG Brasil</h1>
      <div className="containerForecasts">
        {data != null &&
          data.forecast.map((prev, index) => (
            <div key={index} className="containerWeather">
              <p className="weekDate">{`${prev.weekday}, ${prev.date}`}</p>
              <img
                title={prev.description}
                src={`https://assets.hgbrasil.com/weather/icons/conditions/${prev.condition}.svg`}
                alt=""
              />
              <div className="containerMaxMin">
                <span>{`max: ${prev.max}ºC`}</span>
                <span>{`min: ${prev.min}ºC`}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
