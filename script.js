function getTime() {
  var today = new Date();
  var now = today.getDay();
  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var day = days[now - 1];
  var date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes();
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

  let weather_api = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "ca676571878294269458ad76e22c6693";
  let aq_api = "https://api.openweathermap.org/data/2.5/air_pollution";

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
        console.log(data);
        let temp = data.main.temp;
        let high = data.main.temp_max;
        let low = data.main.temp_min;
        let feels_like = data.main.feels_like;
        temperature.innerHTML = temp + " °F" + " (Feels like: " + feels_like + " °F)";
        feels.innerHTML = "High: " + high + " °F" + ", Low: " + low + " °F";
        location.innerHTML = data.name;
        var humidity = data.main.humidity;
        description.innerHTML = "Description: " + data.weather[0].description + ", Humidity: " + humidity + ", Wind Speed: " + data.wind.speed + " mph";
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
})
        function getAqi() {
          fetch(aq_url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data.main.aqi);
    })
  }
    getAqi()
  }

  function error() {
    location.innerHTML = "Unable to retrieve your location";
  }
};

getWeather();
