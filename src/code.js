let apiKey = "aa4a09ddd8573d457f45bcat04cfo0ab";
let city = "London";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

function displayTemp(response) {
  console.log(response.data.wind.speed);
  let topTemperature = document.querySelector("#mainTemp");
  let topCity = document.querySelector("h1");
  let topDescription = document.querySelector("#description");
  let topHumidity = document.querySelector("#humidity");
  let topWind = document.querySelector("#wind");
  topTemperature.innerHTML =
    Math.round(response.data.temperature.current) + "°C";
  topCity.innerHTML = response.data.city;
  topDescription.innerHTML = response.data.condition.description;
  topHumidity.innerHTML = response.data.temperature.humidity + "%";
  topWind.innerHTML = Math.round(response.data.wind.speed) + "MPH";
}
axios.get(url).then(displayTemp);
