var units = ["metric", "imperial"];
var showUnit = ["C", "F"]
var unitID = 0;
var lat = 0;
var lon = 0;

/* if the user allows geolocation, gets position */
$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
    });
  getWeather(lat, lon);
  };
});

/* pulls in json information and updates the app to show weather info */
function getWeather(lat, lon) {
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=449d7d0f088db31263496d4ed169f548&units=" + units[unitID] + "&format=json", function(data) {
    $(".condition").html(data.weather[0].main)
    $(".location").html(data.name)
    $(".temp").html(Math.floor(data.main.temp) + '&deg; ' + showUnit[unitID])
    $(".pic").attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png').show()
  });
}

/* upon toggle of button, change temperature between celsius and fahrenheit */
function toggle(button) {
  if (document.getElementById("1").value == "Celsius") {
    unitID = 0;
    getWeather(lat, lon);
    document.getElementById("1").value = "Fahrenheit";
  } else if (document.getElementById("1").value == "Fahrenheit") {
    unitID = 1;
    getWeather(lat, lon);
    document.getElementById("1").value = "Celsius";
  }
}