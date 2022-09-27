import React, { useEffect } from "react";
import { useState } from "react";

function LookupWeather(props) {
  var [weatherData, setWeatherData] = useState("");
  var [loading, setLoading] = useState(false);

  function loadSearch() {
    if (props.details !== null) {
      setLoading(true);
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${props.details[0]}&longitude=${props.details[1]}&hourly=temperature_2m,precipitation,cloudcover,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    loadSearch();
  }, [props.details]);
  return <div>{loading ? <h1>Loading</h1> : <h1>Not Loading</h1>}</div>;
}

export default LookupWeather;
