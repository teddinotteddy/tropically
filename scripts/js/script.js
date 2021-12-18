function visitCount() {
  var visits = Number(localStorage.getItem("visitCount"));
  var current = Boolean(sessionStorage.getItem("session"));

  if (!current) {
    visits++;
  }

  localStorage.setItem("visitCount", visits);
  sessionStorage.setItem("session", true);

  console.log("Website total visit count: " + visits);
}

window.onload = function () {
  visitCount();
};

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function getTime() {
  var today = new Date();
  var now = today.getDay();
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var day = days[now];
  var date =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  var hour = today.getHours();
  var hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
  var time = hoursIn12HrFormat + ":" + today.getMinutes();
  var dateTime = day + " - " + date + " - " + formatAMPM(new Date());
  timing.innerHTML = dateTime;
}

window.setInterval(function () {
  getTime();
}, 1000);

function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");

  let weather_api = "https://api.openweathermap.org/data/2.5/onecall";
  let aq_api = "https://api.openweathermap.org/data/2.5/air_pollution";
  let apiKey = "ca676571878294269458ad76e22c6693";

  location.innerHTML = "Locating...";

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    let weather_url =
      weather_api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=imperial";

    let aq_url =
      aq_api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apiKey +
      "&units=imperial";

    fetch(weather_url)
      .then((response) => response.json())
      .then((data) => {
        let api = "https://api.openweathermap.org/data/2.5/weather";
        let info_url =
          api +
          "?lat=" +
          latitude +
          "&lon=" +
          longitude +
          "&appid=" +
          apiKey +
          "&units=imperial";
        fetch(info_url)
          .then((response) => response.json())
          .then((data) => {
            let area = data.name;
            location.innerHTML = area;
          });
        console.log(data);
        let temp = Math.round(data.current.temp);
        let {
          humidity,
          pressure,
          sunrise,
          sunset,
          wind_speed,
          dew_point,
          clouds,
          uvi,
          feels_like,
        } = data.current;
        let area = data.current.location;
        let description = data.current.weather[0].main;
        location.innerHTML = area;
        typeofweather.innerHTML = "Description: " + description + ",";
        temperature.innerHTML =
          temp + " °F" + " (Feels like: " + Math.round(feels_like) + " °F)";
        let minTemp = data.daily[0].temp.min;
        let maxTemp = data.daily[0].temp.max;
        minMax.innerHTML =
          "Min: " +
          Math.round(minTemp) +
          " °F" +
          ", Max: " +
          Math.round(maxTemp) +
          " °F";
        windspeed.innerHTML = "Wind Speed: " + wind_speed + " mph";
        uvindex.innerHTML = "UV Index: " + Math.round(uvi);
        cloudcover.innerHTML = "Cloud Cover: " + clouds + "%";
        precipitation.innerHTML =
          "Humidity: " +
          humidity +
          "%" +
          ", Chance of Rain: " +
          100 * data.hourly[1].pop +
          "%";
        var tempHigh = [
          "Hot out there, I'd take a dip in a pool or something.",
          "A little bit toasty.",
          "Not what I would call room temperature.",
        ];
        var tempLow = [
          "Little bit chilly, you should take a sweater or jacket.",
          "Cooler then I would like.",
          "Chilly right?",
        ];
        var tempMid = [
          "Nice weather, I would recommend going to the park.",
          "To put it simply, it's room temperature.",
          "I would go outside and get some fresh air.",
          "Nice weather, go touch some grass.",
        ];
        var randomHigh = tempHigh[Math.floor(Math.random() * tempHigh.length)];
        var randomLow = tempLow[Math.floor(Math.random() * tempLow.length)];
        var randomMid = tempMid[Math.floor(Math.random() * tempMid.length)];
        if (temp > 85) {
          remark.innerHTML = randomHigh;
        } else if (temp < 65) {
          remark.innerHTML = randomLow;
        } else {
          remark.innerHTML = randomMid;
        }
        let weatherIcons = [
          "Weather Icons/Cloudy.SVG",
          "Weather Icons/Drizzle.SVG",
          "Weather Icons/Rain.SVG",
          "Weather Icons/Snow.SVG",
          "Weather Icons/Sunny.SVG",
          "Weather Icons/Thunder.SVG",
        ];
        function getWeatherIcons() {
          if (data.current.weather[0].main === "Clouds") {
            document.getElementById("weatherIcon").src = weatherIcons[0];
          } else if (data.current.weather[0].main === "Drizzle") {
            document.getElementById("weatherIcon").src = weatherIcons[1];
          } else if (data.current.weather[0].main === "Rain") {
            document.getElementById("weatherIcon").src = weatherIcons[2];
          } else if (data.current.weather[0].main === "Snow") {
            document.getElementById("weatherIcon").src = weatherIcons[3];
          } else if (data.current.weather[0].main === "Clear") {
            document.getElementById("weatherIcon").src = weatherIcons[4];
          } else if (data.current.weather[0].main == "Thunderstorm") {
            document.getElementById("weatherIcon").src = weatherIcons[5];
          } else {
            document.getElementById("weatherIcon").src = weatherIcons[4];
          }
          function getTomorrowWeatherIcon() {
            if (data.daily[1].weather[0].main === "Clouds") {
              document.getElementById("tomorrowWeatherIcon").src =
                weatherIcons[0];
            } else if (data.daily[1].weather[0].main === "Drizzle") {
              document.getElementById("tomorrowWeatherIcon").src =
                weatherIcons[1];
            } else if (data.daily[1].weather[0].main === "Rain") {
              document.getElementById("tomorrowWeatherIcon").src =
                weatherIcons[2];
            } else if (data.daily[1].weather[0].main === "Snow") {
              document.getElementById("tomorrowWeatherIcon").src =
                weatherIcons[3];
            } else if (data.daily[1].weather[0].main === "Clear") {
              document.getElementById("tomorrowWeatherIcon").src =
                weatherIcons[4];
            } else if (data.daily[1].weather[0].main == "Thunderstorm") {
              document.getElementById("tomorrowWeatherIcon").src =
                weatherIcons[5];
            } else {
              document.getElementById("tomorrowWeatherIcon").src =
                weatherIcons[4];
            }
          }
          getTomorrowWeatherIcon();
        }

        getWeatherIcons();

        let tomorrowMinTemp = data.daily[1].temp.min;
        let tomorrowMaxTemp = data.daily[1].temp.max;
        tomorrowMinMax.innerHTML =
          "Min: " +
          Math.round(tomorrowMinTemp) +
          " °F" +
          ", Max: " +
          Math.round(tomorrowMaxTemp) +
          " °F";
        let nextDayTemp = data.daily[1].temp.day;
        nextdaytemp.innerHTML = Math.round(nextDayTemp) + " °F";
        nextdaydescription.innerHTML = data.daily[1].weather[0].main;
        let nextDayHumidity = data.daily[1].humidity;
        let nextDayDewPoint = data.daily[1].dew_point;
        nextdaypercipation.innerHTML =
          "Humidity: " +
          nextDayHumidity +
          "%" +
          " , Chance of Rain: " +
          100 * data.daily[1].pop +
          "%";
        nextdaycloudcover.innerHTML =
          "Cloud Cover: " + data.daily[1].clouds + "%";
        nextdayuvi.innerHTML = "UV Index: " + Math.round(data.daily[1].uvi);
        if (data.current.temp > data.daily[1].temp.day) {
          nextdaycomparison.innerHTML = "Tomorrow will be a bit more cool.";
        } else if (data.current.temp < data.daily[1].temp.day) {
          nextdaycomparison.innerHTML =
            "Tommorrow will be a bit hotter than today.";
        } else if (data.current.temp === data.daily[1].temp.day) {
          nextdaycomparison.innerHTML =
            "Don't worry about tomorrow's weather it's the same as today.";
        }
        function getWeeksWeather() {
          var today = new Date();
          var now = today.getDay();
          var days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          let day3Day = now + 2 > 6 ? now + 2 - 7 : now + 2;
          let day4Day = now + 3 > 6 ? now + 3 - 7 : now + 3;
          let day5Day = now + 4 > 6 ? now + 4 - 7 : now + 4;
          let day6Day = now + 5 > 6 ? now + 5 - 7 : now + 5;
          let day7Day = now + 6 > 6 ? now + 6 - 7 : now + 6;
          day3Title.innerHTML = days[day3Day];
          day3.innerHTML =
            "Min: " +
            Math.round(data.daily[2].temp.min) +
            " °F" +
            ",  Max: " +
            Math.round(data.daily[2].temp.max) +
            " °F" +
            ", Chance of Rain: " +
            100 * data.daily[2].pop +
            "%  " +
            data.daily[2].weather[0].description;
          if (data.daily[2].weather[0].main === "Clouds") {
            document.getElementById("day3WeatherIcon").src = weatherIcons[0];
          } else if (data.daily[2].weather[0].main === "Drizzle") {
            document.getElementById("day3WeatherIcon").src = weatherIcons[1];
          } else if (data.daily[2].weather[0].main === "Rain") {
            document.getElementById("day3WeatherIcon").src = weatherIcons[2];
          } else if (data.daily[2].weather[0].main === "Snow") {
            document.getElementById("day3WeatherIcon").src = weatherIcons[3];
          } else if (data.daily[2].weather[0].main === "Clear") {
            document.getElementById("day3WeatherIcon").src = weatherIcons[4];
          } else if (data.daily[2].weather[0].main == "Thunderstorm") {
            document.getElementById("day3WeatherIcon").src = weatherIcons[5];
          } else {
            document.getElementById("day3WeatherIcon").src = weatherIcons[4];
          }
          day4Title.innerHTML = days[day4Day];
          day4.innerHTML =
            "Min: " +
            Math.round(data.daily[3].temp.min) +
            " °F" +
            ",  Max: " +
            Math.round(data.daily[3].temp.max) +
            " °F" +
            ", Chance of Rain: " +
            100 * data.daily[3].pop +
            "%  " +
            data.daily[3].weather[0].description;
          if (data.daily[3].weather[0].main === "Clouds") {
            document.getElementById("day4WeatherIcon").src = weatherIcons[0];
          } else if (data.daily[3].weather[0].main === "Drizzle") {
            document.getElementById("day4WeatherIcon").src = weatherIcons[1];
          } else if (data.daily[3].weather[0].main === "Rain") {
            document.getElementById("day4WeatherIcon").src = weatherIcons[2];
          } else if (data.daily[3].weather[0].main === "Snow") {
            document.getElementById("day4WeatherIcon").src = weatherIcons[3];
          } else if (data.daily[3].weather[0].main === "Clear") {
            document.getElementById("day4WeatherIcon").src = weatherIcons[4];
          } else if (data.daily[3].weather[0].main == "Thunderstorm") {
            document.getElementById("day4WeatherIcon").src = weatherIcons[5];
          } else {
            document.getElementById("day4WeatherIcon").src = weatherIcons[4];
          }
          day5Title.innerHTML = days[day5Day];
          day5.innerHTML =
            "Min: " +
            Math.round(data.daily[4].temp.min) +
            " °F" +
            ",  Max: " +
            Math.round(data.daily[4].temp.max) +
            " °F" +
            ", Chance of Rain: " +
            100 * data.daily[4].pop +
            "%  " +
            data.daily[4].weather[0].description;
          if (data.daily[4].weather[0].main === "Clouds") {
            document.getElementById("day5WeatherIcon").src = weatherIcons[0];
          } else if (data.daily[4].weather[0].main === "Drizzle") {
            document.getElementById("day5WeatherIcon").src = weatherIcons[1];
          } else if (data.daily[4].weather[0].main === "Rain") {
            document.getElementById("day5WeatherIcon").src = weatherIcons[2];
          } else if (data.daily[4].weather[0].main === "Snow") {
            document.getElementById("day5WeatherIcon").src = weatherIcons[3];
          } else if (data.daily[4].weather[0].main === "Clear") {
            document.getElementById("day5WeatherIcon").src = weatherIcons[4];
          } else if (data.daily[4].weather[0].main == "Thunderstorm") {
            document.getElementById("day5WeatherIcon").src = weatherIcons[5];
          } else {
            document.getElementById("day5WeatherIcon").src = weatherIcons[4];
          }
          day6Title.innerHTML = days[day6Day];
          day6.innerHTML =
            "Min: " +
            Math.round(data.daily[5].temp.min) +
            " °F" +
            ",  Max: " +
            Math.round(data.daily[5].temp.max) +
            " °F" +
            ", Chance of Rain: " +
            100 * data.daily[5].pop +
            "%  " +
            data.daily[5].weather[0].description;
          if (data.daily[5].weather[0].main === "Clouds") {
            document.getElementById("day6WeatherIcon").src = weatherIcons[0];
          } else if (data.daily[5].weather[0].main === "Drizzle") {
            document.getElementById("day6WeatherIcon").src = weatherIcons[1];
          } else if (data.daily[5].weather[0].main === "Rain") {
            document.getElementById("day6WeatherIcon").src = weatherIcons[2];
          } else if (data.daily[5].weather[0].main === "Snow") {
            document.getElementById("day6WeatherIcon").src = weatherIcons[3];
          } else if (data.daily[5].weather[0].main === "Clear") {
            document.getElementById("day6WeatherIcon").src = weatherIcons[4];
          } else if (data.daily[5].weather[0].main == "Thunderstorm") {
            document.getElementById("day6WeatherIcon").src = weatherIcons[5];
          } else {
            document.getElementById("day6WeatherIcon").src = weatherIcons[4];
          }
          day7Title.innerHTML = days[day7Day];
          day7.innerHTML =
            "Min: " +
            Math.round(data.daily[6].temp.min) +
            " °F" +
            ",  Max: " +
            Math.round(data.daily[6].temp.max) +
            " °F" +
            ", Chance of Rain: " +
            100 * data.daily[6].pop +
            "%  " +
            data.daily[6].weather[0].description;
          if (data.daily[6].weather[0].main === "Clouds") {
            document.getElementById("day7WeatherIcon").src = weatherIcons[0];
          } else if (data.daily[6].weather[0].main === "Drizzle") {
            document.getElementById("day7WeatherIcon").src = weatherIcons[1];
          } else if (data.daily[6].weather[0].main === "Rain") {
            document.getElementById("day7WeatherIcon").src = weatherIcons[2];
          } else if (data.daily[6].weather[0].main === "Snow") {
            document.getElementById("day7WeatherIcon").src = weatherIcons[3];
          } else if (data.daily[6].weather[0].main === "Clear") {
            document.getElementById("day7WeatherIcon").src = weatherIcons[4];
          } else if (data.daily[6].weather[0].main == "Thunderstorm") {
            document.getElementById("day7WeatherIcon").src = weatherIcons[5];
          } else {
            document.getElementById("day7WeatherIcon").src = weatherIcons[4];
          }
        }
        getWeeksWeather();

        function getHourlyWeather() {
          var today = new Date();
          var hour = today.getHours();
          var currentMinute = today.getMinutes();

          let hour1 = hour + 1 > 12 ? hour + 1 - 12 : hour + 1;
          let hour2 = hour + 2 > 12 ? hour + 2 - 12 : hour + 2;
          let hour3 = hour + 3 > 12 ? hour + 3 - 12 : hour + 3;
          let hour4 = hour + 4 > 12 ? hour + 4 - 12 : hour + 4;
          let hour5 = hour + 5 > 12 ? hour + 5 - 12 : hour + 5;

          hour1time.innerHTML = hour1 + ":" + currentMinute;
          hour2time.innerHTML = hour2 + ":" + currentMinute;
          hour3time.innerHTML = hour3 + ":" + currentMinute;
          hour4time.innerHTML = hour4 + ":" + currentMinute;
          hour5time.innerHTML = hour5 + ":" + currentMinute;

          hour1temp.innerHTML = "Temp: " + data.hourly[1].temp + " °F";
          hour2temp.innerHTML = "Temp: " + data.hourly[2].temp + " °F";
          hour3temp.innerHTML = "Temp: " + data.hourly[3].temp + " °F";
          hour4temp.innerHTML = "Temp: " + data.hourly[4].temp + " °F";
          hour5temp.innerHTML = "Temp: " + data.hourly[5].temp + " °F";

          hour1pop.innerHTML =
            "Chance of rain: " + Math.round(100 * data.hourly[1].pop) + "%";
          hour2pop.innerHTML =
            "Chance of rain: " + Math.round(100 * data.hourly[2].pop) + "%";
          hour3pop.innerHTML =
            "Chance of rain: " + Math.round(100 * data.hourly[3].pop) + "%";
          hour4pop.innerHTML =
            "Chance of rain: " + Math.round(100 * data.hourly[4].pop) + "%";
          hour5pop.innerHTML =
            "Chance of rain: " + Math.round(100 * data.hourly[5].pop) + "%";
        }
        getHourlyWeather();
      });
    function getAqi() {
      fetch(aq_url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let aqi = data.list[0].main.aqi;
          airqualityindex.innerHTML = "Air Quality Index: " + aqi;
        });
    }
    getAqi();
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
}

getWeather();
