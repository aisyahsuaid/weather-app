let apiKey = "aa4a09ddd8573d457f45bcat04cfo0ab";
let city = "Lisbon";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

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
  console.log(response.data);
  let topTemperature = document.querySelector("#mainTemp");
  let topCity = document.querySelector("h1");
  let topDescription = document.querySelector("#description");
  let topHumidity = document.querySelector("#humidity");
  let topWind = document.querySelector("#wind");
  let topDate = document.querySelector("#date");

  console.log(response.data.condition.icon);
  topTemperature.innerHTML =
    Math.round(response.data.temperature.current) + "°C";
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

axios.get(url).then(displayTemp);
