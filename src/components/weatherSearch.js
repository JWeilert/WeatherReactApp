import React, { useEffect } from "react";
import { useState } from "react";
import "../CSS/Weather.css";

function LookupWeather(props) {
  var [weatherData, setWeatherData] = useState("");
  var [hour, setHour] = useState("");
  var [dailyView, setDailyView] = useState(false);
  var [hourTemprature, setHourTemprature] = useState();
  var [dailyTempratureMax, setDailyTempratureMax] = useState();
  var [dailyTempratureMin, setDailyTempratureMin] = useState();

  var hourTempratureArray = [];
  var dailyTempratureArrayMax = [];
  var dailyTempratureArrayMin = [];

  function loadSearch() {
    hourTempratureArray = [];
    dailyTempratureArrayMax = [];
    dailyTempratureArrayMin = [];
    if (props.details !== null) {
      hour = new Date().toLocaleString("en-US", {
        hour12: false,
        timeZone: props.details[2],
        hour: "2-digit",
      });
      setHour(hour);
      //
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${props.details[0]}&longitude=${props.details[1]}&hourly=temperature_2m,apparent_temperature,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,windspeed_10m_max&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=auto`
      )
        .then((response) => response.json())
        .then((data) => {
          weatherData = data;
          setWeatherData(weatherData);
          console.log(weatherData);
        })
        .then(() => {
          for (var i = hour; i <= parseInt(hour) + 7; i++) {
            hourTempratureArray.push(weatherData.hourly.temperature_2m[i]);
          }
          setHourTemprature(hourTempratureArray);
        })
        .then(() => {
          for (
            var i = 0;
            i < weatherData.daily.temperature_2m_max.length;
            i++
          ) {
            dailyTempratureArrayMax.push(
              weatherData.daily.temperature_2m_max[i]
            );
          }
          setDailyTempratureMax(dailyTempratureArrayMax);
          for (
            var i = 0;
            i < weatherData.daily.temperature_2m_min.length;
            i++
          ) {
            dailyTempratureArrayMin.push(
              weatherData.daily.temperature_2m_min[i]
            );
          }
          setDailyTempratureMin(dailyTempratureArrayMin);
          console.log(dailyTempratureMax, dailyTempratureMin);
        })
        .then(props.setLoading(false));
    }
  }

  useEffect(() => {
    loadSearch();
  }, [props.details]);

  if (dailyView !== true) {
    return (
      <div>
        <h1>
          {hourTemprature?.[0]}
          <sup>º</sup>
        </h1>
        <div id="timeContainer">
          <div id="times">
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <p>
                {hourTemprature?.[1]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <p>
                {hourTemprature?.[2]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <p>
                {hourTemprature?.[3]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <p>
                {hourTemprature?.[4]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <p>
                {hourTemprature?.[5]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <p>
                {hourTemprature?.[6]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <p>
                {hourTemprature?.[7]}
                <sup>º</sup>
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setDailyView(!dailyView);
          }}
        >
          Daily View
        </button>
      </div>
    );
  } else if (dailyView !== false) {
    return (
      <div>
        <h1>Daily Max and Min Temp</h1>
        <h4>
          Max: {dailyTempratureMax[0]} Min: {dailyTempratureMin[0]}
          <br />
          Max: {dailyTempratureMax[1]} Min: {dailyTempratureMin[1]}
          <br />
          Max: {dailyTempratureMax[2]} Min: {dailyTempratureMin[2]}
          <br />
          Max: {dailyTempratureMax[3]} Min: {dailyTempratureMin[3]}
          <br />
          Max: {dailyTempratureMax[4]} Min: {dailyTempratureMin[4]}
          <br />
          Max: {dailyTempratureMax[5]} Min: {dailyTempratureMin[5]}
          <br />
          Max: {dailyTempratureMax[6]} Min: {dailyTempratureMin[6]}
        </h4>
        <button
          onClick={() => {
            setDailyView(!dailyView);
          }}
        >
          Hour View
        </button>
      </div>
    );
  }
}
export default LookupWeather;
