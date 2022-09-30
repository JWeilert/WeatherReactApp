import React, { useEffect } from "react";
import { useState } from "react";
import "../CSS/Weather.css";
import Alien from "../images/wi-cloud.svg";
import {
  ClearSkys,
  MainlyClear,
  PartlyCloudy,
  Overcast,
  Fog,
  Drizzle,
  FreezingDrizzle,
  Rain,
  FreezingRain,
  SnowFall,
  RainShowers,
} from "../images/images";

function LookupWeather(props) {
  var [weatherData, setWeatherData] = useState("");
  var [hour, setHour] = useState("");
  var [dailyView, setDailyView] = useState(false);
  var [loading, setLoading] = useState(false);
  var [dailyTempratureMax, setDailyTempratureMax] = useState();
  var [dailyTempratureMin, setDailyTempratureMin] = useState();
  const [images, setImages] = useState({
    0: {
      src: ClearSkys,
      disc: "Clear skys",
    },
    1: {
      src: MainlyClear,
      disc: "Mainly Clear",
    },
    2: {
      src: PartlyCloudy,
      disc: "Partly Cloudy",
    },
    3: {
      src: Overcast,
      disc: "Overcast",
    },
    45: {
      src: Fog,
      disc: "Foggy",
    },
    48: {
      src: Fog,
      disc: "Foggy",
    },
    51: {
      src: Drizzle,
      disc: "Light drizzle",
    },
    53: {
      src: Drizzle,
      disc: "Moderate drizzle",
    },
    55: {
      src: Drizzle,
      disc: "Dense drizzle",
    },
    56: {
      src: FreezingDrizzle,
      disc: "Light freezing drizzle",
    },
    57: {
      src: FreezingDrizzle,
      disc: "Dense freezing drizzle",
    },
    61: { src: Rain, disc: "Slight rain" },
    63: { src: Rain, disc: "Moderate rain" },
    65: { src: Rain, disc: "Heavy rain" },
    66: {
      src: FreezingRain,
      disc: "Slight freezing rain",
    },
    67: {
      src: FreezingRain,
      disc: "Heavy freezing rain",
    },
    71: {
      src: SnowFall,
      disc: "Slight snow fall",
    },
    73: {
      src: SnowFall,
      disc: "Moderate snow fall",
    },
    75: {
      src: SnowFall,
      disc: "Heavy snow fall",
    },
    77: {
      src: SnowFall,
      disc: "Snow grains",
    },
    80: {
      src: RainShowers,
      disc: "Slight rain showers",
    },
    81: {
      src: RainShowers,
      disc: "Moderate rain showers",
    },
    82: {
      src: RainShowers,
      disc: "Heavy rain showers",
    },
  });

  function loadSearch() {
    setLoading(true);
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

        .then(setLoading(false));
    }
  }

  useEffect(() => {
    loadSearch();
  }, [props.details]);

  if (loading === false) {
    return (
      <div>
        <div id="topBox">
          <div id="firstBox">
            <p>
              {images[weatherData?.hourly?.weathercode[parseFloat(hour)]]?.disc}
            </p>
          </div>
          <div id="secondBox">
            <img
              src={
                images[weatherData?.hourly?.weathercode[parseFloat(hour)]]?.src
              }
              alt="Pic"
            />
            <p>
              Current:
              {images[weatherData?.hourly?.weathercode[parseFloat(hour)]]?.disc}
            </p>
          </div>
          <div id="thirdBox">
            <h1>
              {weatherData?.hourly?.temperature_2m[hour]}
              <sup>º</sup>
            </h1>
            <p>
              Feels like {weatherData?.hourly?.apparent_temperature[hour]}
              <sup>º</sup>
            </p>
          </div>
        </div>
        <div className="timeContainer">
          <p className="upNext">Next hours...</p>
          <div className="times">
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <img
                src={
                  images[weatherData?.hourly?.weathercode[parseFloat(hour) + 1]]
                    ?.src
                }
                alt="Pic"
              />

              <p className="hourTemp">
                {weatherData?.hourly?.temperature_2m[parseFloat(hour) + 1]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <img
                src={
                  images[weatherData?.hourly?.weathercode[parseFloat(hour) + 2]]
                    ?.src
                }
                alt="Pic"
              />
              <p className="hourTemp">
                {weatherData?.hourly?.temperature_2m[parseFloat(hour) + 2]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <img
                src={
                  images[weatherData?.hourly?.weathercode[parseFloat(hour) + 3]]
                    ?.src
                }
                alt="Pic"
              />
              <p className="hourTemp">
                {weatherData?.hourly?.temperature_2m[parseFloat(hour) + 3]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <img
                src={
                  images[weatherData?.hourly?.weathercode[parseFloat(hour) + 4]]
                    ?.src
                }
                alt="Pic"
              />
              <p className="hourTemp">
                {weatherData?.hourly?.temperature_2m[parseFloat(hour) + 4]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <img
                src={
                  images[weatherData?.hourly?.weathercode[parseFloat(hour) + 5]]
                    ?.src
                }
                alt="Pic"
              />
              <p className="hourTemp">
                {weatherData?.hourly?.temperature_2m[parseFloat(hour) + 5]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Time</p>
              <hr />
              <img
                src={
                  images[weatherData?.hourly?.weathercode[parseFloat(hour) + 6]]
                    ?.src
                }
                alt="Pic"
              />
              <p className="hourTemp">
                {weatherData?.hourly?.temperature_2m[parseFloat(hour) + 6]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBoxLast">
              <p className="time">Time</p>
              <hr />
              <img
                src={
                  images[weatherData?.hourly?.weathercode[parseFloat(hour) + 7]]
                    ?.src
                }
                alt="Pic"
              />
              <p className="hourTemp">
                {weatherData?.hourly?.temperature_2m[parseFloat(hour) + 7]}
                <sup>º</sup>
              </p>
            </div>
          </div>
        </div>
        {/* 
        Next box
        */}
        <div className="timeContainer">
          <p className="upNext">Next Days...</p>
          <div className="times">
            <div className="tempBox">
              <p className="time">Today</p>
              <hr />
              <img
                src={images[weatherData?.daily?.weathercode[0]]?.src}
                alt="Pic"
              />
              <p className="dayTemp">
                H: {weatherData?.daily?.temperature_2m_max[0]}
                <sup>º</sup>
              </p>
              <p className="dayTemp">
                L: {weatherData?.daily?.temperature_2m_min[0]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Day</p>
              <hr />
              <img
                src={images[weatherData?.daily?.weathercode[1]]?.src}
                alt="Pic"
              />
              <p className="dayTemp">
                H: {weatherData?.daily?.temperature_2m_max[1]}
                <sup>º</sup>
              </p>
              <p className="dayTemp">
                L: {weatherData?.daily?.temperature_2m_min[1]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Day</p>
              <hr />
              <img
                src={images[weatherData?.daily?.weathercode[2]]?.src}
                alt="Pic"
              />
              <p className="dayTemp">
                H: {weatherData?.daily?.temperature_2m_max[2]}
                <sup>º</sup>
              </p>
              <p className="dayTemp">
                L: {weatherData?.daily?.temperature_2m_min[2]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Day</p>
              <hr />
              <img
                src={images[weatherData?.daily?.weathercode[3]]?.src}
                alt="Pic"
              />
              <p className="dayTemp">
                H: {weatherData?.daily?.temperature_2m_max[3]}
                <sup>º</sup>
              </p>
              <p className="dayTemp">
                L: {weatherData?.daily?.temperature_2m_min[3]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Day</p>
              <hr />
              <img
                src={images[weatherData?.daily?.weathercode[4]]?.src}
                alt="Pic"
              />
              <p className="dayTemp">
                H: {weatherData?.daily?.temperature_2m_max[4]}
                <sup>º</sup>
              </p>
              <p className="dayTemp">
                L: {weatherData?.daily?.temperature_2m_min[4]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBox">
              <p className="time">Day</p>
              <hr />
              <img
                src={images[weatherData?.daily?.weathercode[5]]?.src}
                alt="Pic"
              />
              <p className="dayTemp">
                H: {weatherData?.daily?.temperature_2m_max[5]}
                <sup>º</sup>
              </p>
              <p className="dayTemp">
                L: {weatherData?.daily?.temperature_2m_min[5]}
                <sup>º</sup>
              </p>
            </div>
            <div className="tempBoxLast">
              <p className="time">Day</p>
              <hr />
              <img
                src={images[weatherData?.daily?.weathercode[6]]?.src}
                alt="Pic"
              />
              <p className="dayTemp">
                H: {weatherData?.daily?.temperature_2m_max[6]}
                <sup>º</sup>
              </p>
              <p className="dayTemp">
                L: {weatherData?.daily?.temperature_2m_min[6]}
                <sup>º</sup>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    <h1>Loading</h1>;
  }
}
export default LookupWeather;
