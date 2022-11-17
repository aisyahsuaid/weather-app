let apiKey = "aa4a09ddd8573d457f45bcat04cfo0ab";
let city = "London";
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
  console.log(response.data.time * 1000);
  let topTemperature = document.querySelector("#mainTemp");
  let topCity = document.querySelector("h1");
  let topDescription = document.querySelector("#description");
  let topHumidity = document.querySelector("#humidity");
  let topWind = document.querySelector("#wind");
  let topDate = document.querySelector("#date");
  topTemperature.innerHTML =
    Math.round(response.data.temperature.current) + "°C";
  topCity.innerHTML = response.data.city;
  topDescription.innerHTML = response.data.condition.description;
  topHumidity.innerHTML = response.data.temperature.humidity + "%";
  topWind.innerHTML = Math.round(response.data.wind.speed) + "MPH";
  topDate.innerHTML = currentDate(response.data.time * 1000);
}
axios.get(url).then(displayTemp);
