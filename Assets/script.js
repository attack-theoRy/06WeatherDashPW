
// Variable Declarations

// get the city from input
var citySearched = $("#searchBox").val();

// set my api Key
var apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";

var myQueryURL = ''


// event listener for the search button
$("#searchBtn").on("click", function() {

// get the value from the form
citySearched = $("#searchTerm").val();

// the full query 
myQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + apiKey;

// ajax api call
$.ajax({
  url: myQueryUrl,
  method: "GET"
})
.then(function (response){

  console.log(response)

  console.log(response.name)
  console.log(response.weather[0].icon)

  let tempF = (response.main.temp - 273.15) * 1.80 + 32;
  console.log(Math.floor(tempF))

  console.log(response.main.humidity)

  console.log(response.wind.speed)

  //getCurrentConditions(response);
  //getCurrentForecast(response);
 // makeList();

  })



})
