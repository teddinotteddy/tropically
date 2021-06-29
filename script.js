function getTime() {
  var today = new Date();
  var now = today.getDay();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var day = days[now];
  var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
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

      console.log(weather_url)

    fetch(weather_url)
      .then(response => response.json())
      .then(data => {
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
          .then(response => response.json())
          .then(data => {
            console.log(data);
            let area = data.name;
            location.innerHTML = area;
        });
        console.log(data);
        let temp = Math.round(data.current.temp);
        let {humidity, pressure, sunrise, sunset, wind_speed, dew_point, clouds, uvi, feels_like} = data.current;
        let area = data.current.location;
        let description = data.current.weather[0].description;
        location.innerHTML = area;
        typeofweather.innerHTML = "Description: " + description + ",";
        temperature.innerHTML = temp + " °F" + " (Feels like: " + Math.round(feels_like) + " °F)";
        let minTemp = data.daily[0].temp.min;
        let maxTemp = data.daily[0].temp.max;
        minMax.innerHTML = "Min: " + Math.round(minTemp)+ " °F" + ", Max: " + Math.round(maxTemp) + " °F";
        windspeed.innerHTML = "Wind Speed: " + wind_speed + " mph";
        uvindex.innerHTML = "UV Index: " + Math.round(uvi);
        cloudcover.innerHTML = "Cloud Cover: " + clouds + "%"
        precipitation.innerHTML = "Humidity: " + humidity + "%" + ", Chance of Rain: " + 100 * data.hourly[1].pop + "%";
        var tempHigh = ["Hot out there, I'd take a dip in a pool or something.", "A little bit toasty.", "Not what I would call room temperature."];
        var tempLow = ["Little bit chilly, you should take a sweater or jacket.", "Cooler then I would like.", "Chilly right?"];
        var tempMid = ["Nice weather, I would recommend going to the park.", "To put it simply, it's room temperature.", "I would go outside and get some fresh air.", "Nice weather, go touch some grass."]
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
        let tomorrowMinTemp = data.daily[1].temp.min;
        let tomorrowMaxTemp = data.daily[1].temp.max;
        tomorrowMinMax.innerHTML = "Min: " + Math.round(tomorrowMinTemp) + " °F" + ", Max: " + Math.round(tomorrowMaxTemp) + " °F";
        let nextDayTemp = data.daily[1].temp.day;
        nextdaytemp.innerHTML = Math.round(nextDayTemp) + " °F";
        nextdaydescription.innerHTML = data.daily[1].weather[0].description;
        let nextDayHumidity = data.daily[1].humidity;
        let nextDayDewPoint = data.daily[1].dew_point;
        nextdaypercipation.innerHTML = "Humidity: " + nextDayHumidity + "%" + " , Chance of Rain: " + 100 * data.daily[1].pop + "%";
        nextdaycloudcover.innerHTML = "Cloud Cover: " + data.daily[1].clouds + "%";
        nextdayuvi.innerHTML = "UV Index: " + Math.round(data.daily[1].uvi);
        console.log(data.daily);
          function getWeeksWeather() {
            var today = new Date();
            var now = today.getDay();
            var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let day3Day = (now + 2 > 6) ? now + 2 - 7: now + 2;
            let day4Day = (now + 3 > 6) ? now + 3 - 7: now + 3;
            let day5Day = (now + 4 > 6) ? now + 4 - 7: now + 4;
            let day6Day = (now + 5 > 6) ? now + 5 - 7: now + 5;
            let day7Day = (now + 6 > 6) ? now + 6 - 7: now + 6;
            day3Title.innerHTML = days[day3Day];
            day3.innerHTML = "Min: " + Math.round(data.daily[2].temp.min) + " °F" + ",  Max: " + Math.round(data.daily[2].temp.max) + " °F" + ", Chance of Rain: " + 100 * data.daily[2].pop + "%  " + data.daily[2].weather[0].description;
            day4Title.innerHTML = days[day4Day];
            day4.innerHTML = "Min: " + Math.round(data.daily[3].temp.min) + " °F" + ",  Max: " + Math.round(data.daily[3].temp.max) + " °F" + ", Chance of Rain: " + 100 * data.daily[3].pop + "%  " + data.daily[3].weather[0].description;
            day5Title.innerHTML = days[day5Day];
            day5.innerHTML = "Min: " + Math.round(data.daily[4].temp.min) + " °F" + ",  Max: " + Math.round(data.daily[4].temp.max) + " °F" + ", Chance of Rain: " + 100 * data.daily[4].pop + "%  " + data.daily[4].weather[0].description;
            day6Title.innerHTML = days[day6Day];
            day6.innerHTML = "Min: " + Math.round(data.daily[5].temp.min) + " °F" + ",  Max: " + Math.round(data.daily[5].temp.max) + " °F" + ", Chance of Rain: " + 100 * data.daily[5].pop + "%  " + data.daily[5].weather[0].description;
            day7Title.innerHTML = days[day7Day];
            day7.innerHTML = "Min: " + Math.round(data.daily[6].temp.min) + " °F" + ",  Max: " + Math.round(data.daily[6].temp.max) + " °F" + ", Chance of Rain: " + 100 * data.daily[6].pop + "%  " + data.daily[6].weather[0].description;
          }
        getWeeksWeather()
      })
  function getAqi() {
          fetch(aq_url)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            let aqi = data.list[0].main.aqi;
            airqualityindex.innerHTML = "Air Quality Index: " + aqi;
        })
      }
  getAqi()
}

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
};

getWeather();
