import { useEffect, useState } from "react";
import LookupWeather from "./weatherSearch";

function LookupZip() {
  var [zip, setZip] = useState(null);
  var [zipData, setZipData] = useState(null);
  var [loading, setLoading] = useState(false);
  var [details, setDetails] = useState(null);
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
              console.log(details);
            }
          } else {
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      });
  }

  async function search() {
    // zip = document.getElementById("zipCode").value;
    setZip(document.getElementById("zipCode").value.trim());
  }

  useEffect(() => {
    loadSearch();
  }, [zip]);

  return (
    <div>
      <h1>{zip}</h1>
      <input id="zipCode" type="text" pattern="[0-9]{5}" />
      <button
        type="button"
        onClick={() => {
          search();
        }}
      >
        Click
      </button>
      <h1>{details?.[1]}</h1>
      <h1>{details?.[0]}</h1>
      <LookupWeather
        details={details}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
export default LookupZip;
