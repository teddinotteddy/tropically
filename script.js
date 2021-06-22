function getTime() {
  var today = new Date();
  var now = today.getDay();
  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var day = days[now-1];
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var hour = today.getHours();
  var hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
  var time =  hoursIn12HrFormat + ":" + today.getMinutes();
  var dateTime = day + " - " + date + " - " + time;
  timing.innerHTML = dateTime;
}
window.setInterval(function() {
  getTime()
}, 1000);

function getWeather() {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("description");
  let location = document.getElementById("location");

  let weather_api = "https://api.openweathermap.org/data/2.5/onecall";
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

      console.log(weather_url)

    fetch(weather_url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let temp = Math.round(data.current.temp);
        let {humidity, pressure, sunrise, sunset, wind_speed, dew_point, clouds, uvi, feels_like} = data.current;
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

          let area = "";
          let description = "";

          fetch(info_url)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            let area = data.name;
            let description = data.weather[0].main;
            location.innerHTML = area;
            typeofweather.innerHTML = "Description: " + description + ",";
          });
        temperature.innerHTML = temp + " °F" + " (Feels like: " + Math.round(feels_like) + " °F)";
        windspeed.innerHTML = "Wind Speed: " + wind_speed + " mph";
        uvindex.innerHTML = "UV Index: " + uvi;
        cloudcover.innerHTML = "Cloud Cover: " + clouds +"%"
        precipitation.innerHTML = "Humidity: " + humidity + ", Dew Point: " + dew_point;
        console.log("http://openweathermap.org/img/wn/"+ data.current.weather.icon + "@2x.png")
        var tempHigh = ["Hot out there, I'd take a dip in a pool or something.", "A little bit toasty.", "Not what I would call room temperature."];
        var tempLow = ["Little bit chilly, you should take a sweater or jacket.", "Cooler then I would like.", "Chilly right?"];
        var tempMid = ["Nice weather, I would recommend going to the park.", "To put it simply, it's room temperature.", "I would go outside and get some fresh air."]
        var randomHigh = tempHigh[Math.floor(Math.random() * tempHigh.length)];
        var randomLow = tempLow[Math.floor(Math.random() * tempLow.length)];
        var randomMid = tempMid[Math.floor(Math.random() * tempMid.length)];
        if (temp > 85) {
          remark.innerHTML = randomHigh
        }
        else if (temp < 65) {
          remark.innerHTML = randomLow
        }
        else {
          remark.innerHTML = randomMid
        }
        let nextDay = data.daily;
        console.log(nextDay)
      })
}

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
};

getWeather();
