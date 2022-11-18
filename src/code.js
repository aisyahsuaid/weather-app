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
function getForecast(city) {
  let apiKey = "aa4a09ddd8573d457f45bcat04cfo0ab";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  if (iconDescription == "clear-sky-day") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/sun--v1.png"
    );
  }
  if (iconDescription == "clear-sky-night") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/bright-moon.png"
    );
  }
  if (iconDescription == "few-clouds-day") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/partly-cloudy-day--v1.png"
    );
  }
  if (iconDescription == "few-clouds-night") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/partly-cloudy-night--v1.png"
    );
  }
  if (iconDescription == "scattered-clouds-day") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/cloud.png"
    );
  }
  if (iconDescription == "scattered-clouds-night") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/cloud.png"
    );
  }
  if (iconDescription == "broken-clouds-day") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/skydrive.png"
    );
  }

  if (iconDescription == "broken-clouds-night") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/skydrive.png"
    );
  }
  if (iconDescription == "shower-rain-day") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/rain--v1.png"
    );
  }
  if (iconDescription == "shower-rain-night") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/keep-dry.png"
    );
  }
  if (iconDescription == "rain-day") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/rain--v1.png"
    );
  }
  if (iconDescription == "rain-night") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/rainy-night.png"
    );
  }
  if (iconDescription == "thunderstorm-day") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/storm--v1.png"
    );
  }
  if (iconDescription == "thunderstorm-night") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/storm--v1.png"
    );
  }
  if (iconDescription == "snow-day") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/snow-storm.png"
    );
  }
  if (iconDescription == "snow-night") {
    topIcon.setAttribute(
      "src",
      "https://img.icons8.com/dusk/64/null/snow-storm.png"
    );
  }
  if (iconDescription == "mist-day") {
    topIcon.setAttribute("src", "https://img.icons8.com/dusk/64/null/wind.png");
  }
  if (iconDescription == "mist-day") {
    topIcon.setAttribute("src", "https://img.icons8.com/dusk/64/null/wind.png");
  }
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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="https://img.icons8.com/dusk/64/null/windsock.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

search("London");
