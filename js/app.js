const cotainer = document.querySelector("#curr-weather-container");
const city = document.querySelector("#city");
const grades = document.querySelector("#grades");
const form = document.querySelector("#form");

window.addEventListener("load", () => {
  form.addEventListener("submit", searchWeather);
});

function searchWeather(e) {
  e.preventDefault();
  const cityInput = document.querySelector("#searchbar").value;
  //Validate weather
  if (cityInput === "") {
    messageAlert("You have to search a city", "error");
    return;
  }
  consultWeather(cityInput);
}

function messageAlert(message, type) {
  const messageDiv = document.querySelector("#message-container");
  const alertExist = document.querySelector(".message-container-error");
  const alert = document.createElement("p");

  if (!alertExist) {
    alert.textContent = message.toUpperCase();
    messageDiv.appendChild(alert);
    messageDiv.classList.add("message-container-error");
  }
  setTimeout(() => {
    messageDiv.classList.remove("message-container-error");
    alert.remove();
  }, 3000);
}

function consultWeather(city) {
  const appID = "902925ebc12361c0a205a3de876df17d";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    appID;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        messageAlert(data.message, "error");
        return;
      }
      printWeather(data);
    });
}
function printWeather(response) {
  const city_name = document.querySelector("#city");
  const { name, weather, main } = response;
  let { temp, temp_max, temp_min } = main;
  temp -= 273.15;
  temp_max -= 273.15;
  temp_min -= 273.15;
  const weather_centigrades = document.querySelector("#grades");
  const weather_min = document.querySelector("#weather-min");
  const weather_max = document.querySelector("#weather-max");

  printImage(response);
  city_name.textContent = name;
  weather_centigrades.textContent = Math.round(temp) + "°C";
  weather_min.textContent = Math.round(temp_min) + "°C";
  weather_max.textContent = Math.round(temp_max) + "°C";
}

function printImage(response) {
  const { weather, main } = response;
  let { temp, temp_max, temp_min } = main;
  temp -= 273.15;
  temp_max -= 273.15;
  temp_min -= 273.15;

  let main_desc = weather[0].main;
  const moon_sun = document.querySelector(".moon-sun");
  const moon_sun_min = document.querySelector(".moon-sun-min");
  const moon_sun_max = document.querySelector(".moon-sun-max");

  const snowflake = "/images/snowflake.png";
  const sun = "/images/sun.png";
  const cloud = "/images/cloud.png";
  const rain = "/images/rain.png";

  console.log(response);
  console.log(temp_max);
  console.log(temp_min);

  if (temp <= 10) {
    moon_sun.style.backgroundImage = "url('" + snowflake + "')";
    moon_sun.style.setProperty("--invert-color", "invert(100%)");
  } else if (main_desc.includes("Clear")) {
    moon_sun.style.backgroundImage = "url('" + sun + "')";
    moon_sun.style.setProperty("--invert-color", "invert(0%)");
  } else if (main_desc.includes("Cloud") || main_desc.includes("Mist")) {
    moon_sun.style.backgroundImage = "url('" + cloud + "')";
    moon_sun.style.setProperty("--invert-color", "invert(100%)");
  } else if (main_desc.includes("Rain")) {
    moon_sun.style.backgroundImage = "url('" + rain + "')";
    moon_sun.style.setProperty("--invert-color", "invert(100%)");
  }

  if (temp_min <= 16) {
    moon_sun_min.style.backgroundImage = "url('" + snowflake + "')";
    moon_sun_min.style.setProperty("--invert-color", "invert(100%)");
  } else if (temp_min > 16) {
    moon_sun_min.style.backgroundImage = "url('" + sun + "')";
    moon_sun_min.style.setProperty("--invert-color", "invert(0%)");
  }

  if (temp_max <= 16) {
    moon_sun_max.style.backgroundImage = "url('" + snowflake + "')";
    moon_sun_max.style.setProperty("--invert-color", "invert(100%)");
  } else if (temp_max > 16) {
    moon_sun_max.style.backgroundImage = "url('" + sun + "')";
    moon_sun_max.style.setProperty("--invert-color", "invert(0%)");
  }
}
