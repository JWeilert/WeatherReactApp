import { useEffect, useState } from "react";
import LookupWeather from "./weatherSearch";
import "../CSS/Zip.css";
import { Search } from "../images/images";

function LookupZip() {
  var [zip, setZip] = useState(null);
  var [zipData, setZipData] = useState(null);
  var [loading, setLoading] = useState(false);
  var [details, setDetails] = useState(null);
  var [city, setCity] = useState();
  var [state, setState] = useState();

  function loadSearch() {
    setLoading(true);
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${zip}`)
      .then((response) => response.json())
      .then((data) => {
        zipData = data;
        setZipData(zipData);
      })
      .then(console.log(zipData))
      .then(() => {
        try {
          if (zipData.results[0].country === "United States") {
            for (var i = 0; i < zipData.results[0].postcodes.length; i++) {
              setDetails([
                zipData.results[0].latitude,
                zipData.results[0].longitude,
                zipData.results[0].timezone,
              ]);
            }
            setCity(zipData.results[0].admin3);
            setState(zipData.results[0].admin1);
          } else {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      })
      .then(setLoading(false));
  }

  async function search() {
    // zip = document.getElementById("zipCode").value;
    setZip(document.getElementById("zipCode").value.trim());
  }

  useEffect(() => {
    loadSearch();
  }, [zip]);

  if (loading === false) {
    return (
      <div>
        <div id="searchBar">
          <input
            id="zipCode"
            placeholder="Enter any Zip Code!"
            type="text"
            pattern="[0-9]{5}"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => {
              search();
            }}
          >
            <img src={Search} alt="Search button" />
          </button>
        </div>
        <h3>
          {city} {state}
        </h3>
        <LookupWeather details={details} />
      </div>
    );
  } else if (loading === true) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
}
export default LookupZip;
