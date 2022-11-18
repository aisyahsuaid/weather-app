let form = document.querySelector("#search-form");
form.addEventListener("submit", submitValue);

function search(city) {
  let apiKey = "aa4a09ddd8573d457f45bcat04cfo0ab";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayTemp);
}
function submitValue(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
  getForecast(cityInput.value);
}

function currentDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minutes}`;
}
function icons(description) {
  if (description == "clear-sky-day") {
    return "https://img.icons8.com/dusk/64/null/sun--v1.png";
  }
  if (description == "clear-sky-night") {
    return "https://img.icons8.com/dusk/64/null/bright-moon.png";
  }
  if (description == "few-clouds-day") {
    return "https://img.icons8.com/dusk/64/null/partly-cloudy-day--v1.png";
  }
  if (description == "few-clouds-night") {
    return "https://img.icons8.com/dusk/64/null/partly-cloudy-night--v1.png";
  }
  if (description == "scattered-clouds-day") {
    return "https://img.icons8.com/dusk/64/null/cloud.png";
  }
  if (description == "scattered-clouds-night") {
    return "https://img.icons8.com/dusk/64/null/cloud.png";
  }
  if (description == "broken-clouds-day") {
    return "https://img.icons8.com/dusk/64/null/skydrive.png";
  }
  if (description == "broken-clouds-night") {
    return "https://img.icons8.com/dusk/64/null/skydrive.png";
  }
  if (description == "shower-rain-day") {
    return "https://img.icons8.com/dusk/64/null/rain--v1.png";
  }
  if (description == "shower-rain-night") {
    return "https://img.icons8.com/dusk/64/null/keep-dry.png";
  }
  if (description == "rain-day") {
    return "https://img.icons8.com/dusk/64/null/rain--v1.png";
  }
  if (description == "rain-night") {
    return "https://img.icons8.com/dusk/64/null/rainy-night.png";
  }
  if (description == "thunderstorm-day") {
    return "https://img.icons8.com/dusk/64/null/storm--v1.png";
  }
  if (description == "thunderstorm-night") {
    return "https://img.icons8.com/dusk/64/null/storm--v1.png";
  }
  if (description == "snow-day") {
    return "https://img.icons8.com/dusk/64/null/snow-storm.png";
  }
  if (description == "snow-night") {
    return "https://img.icons8.com/dusk/64/null/snow-storm.png";
  }
  if (description == "mist-day") {
    return "https://img.icons8.com/dusk/64/null/wind.png";
  }
  if (description == "mist-day") {
    return "https://img.icons8.com/dusk/64/null/wind.png";
  }
}
function displayTemp(response) {
  let topTemperature = document.querySelector("#mainTemp");
  let topCity = document.querySelector("h1");
  let topDescription = document.querySelector("#description");
  let topHumidity = document.querySelector("#humidity");
  let topWind = document.querySelector("#wind");
  let topDate = document.querySelector("#date");

  topCelsius = response.data.temperature.current;

  topTemperature.innerHTML = Math.round(topCelsius);
  topCity.innerHTML = response.data.city;
  topDescription.innerHTML = response.data.condition.description;
  topHumidity.innerHTML = response.data.temperature.humidity + "%";
  topWind.innerHTML = Math.round(response.data.wind.speed) + "MPH";
  topDate.innerHTML = currentDate(response.data.time * 1000);

  let iconDescription = response.data.condition.icon;
  let topIcon = document.querySelector("#mainIcon");
  topIcon.setAttribute("src", `${icons(iconDescription)}`);
}
function convertFahrenheit(event) {
  event.preventDefault();
  celsiusUnit.classList.remove("active");
  topFahrenheit.classList.add("active");
  let fahrenheitTemp = (topCelsius * 9) / 5 + 32;
  let calculatedTemp = document.querySelector("#mainTemp");
  calculatedTemp.innerHTML = Math.round(fahrenheitTemp);
}

function convertCelsius(event) {
  event.preventDefault();
  celsiusUnit.classList.add("active");
  topFahrenheit.classList.remove("active");
  let calculatedTemp = document.querySelector("#mainTemp");
  calculatedTemp.innerHTML = Math.round(topCelsius);
}

let topCelsius = null;

let topFahrenheit = document.querySelector("#fahrenheit");
topFahrenheit.addEventListener("click", convertFahrenheit);

let celsiusUnit = document.querySelector("#celsius");
celsiusUnit.addEventListener("click", convertCelsius);
function forecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let nextForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  console.log(response.data.daily);

  let forecastHTML = `<div class="row">`;
  nextForecast.forEach(function (forecastDay, index) {
    let forecastDescription = forecastDay.condition.icon;
    console.log(forecastDescription);
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 details">
        <div class="weather-forecast-date">${forecastDate(
          forecastDay.time
        )}</div>
        <img
          src=${icons(forecastDescription)}
          alt=""
          width="42"
          id="forecast-icon"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(city) {
  let apiKey = "aa4a09ddd8573d457f45bcat04cfo0ab";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
search("London");
getForecast("London");
