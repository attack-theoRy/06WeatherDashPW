
// Variable Declarations

// get the city from input
var citySearched = $("#searchBox").val();

// set my api Key
var apiKey = "&appid=afaa8eea1769b4359fd8e07b2efcefbd";

// declare variable for eventual looong query
var myQueryURL = ''


// event listener function for the search button
$("#searchBtn").on("click", function() {

// get the value from the form
citySearched = $("#searchBox").val();

// the full query 
myQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + apiKey;

// ajax api call
$.ajax({
  url: myQueryURL,
  method: "GET"
})
.then(function (response){

  console.log(response)

// show the current weather


showCurrentWeather(response)

 makeForecast(response)

  })



})

function showCurrentWeather(response)
{

  // clear out what is currently displaying if anything
  $('#currentCity').empty();

    // get temperature from response and convert it fahrenheit
    var tempFahren = (response.main.temp - 273.15) * 1.80 + 32;

    // get the date
    var todayDate = Date()

   // console.log(todayDate.getFullYear())
  // 
    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var city = $("<h4>").addClass("card-title").text(response.name);
    //var cityDate = $("<h4>").addClass("card-title").text(todayDate.getDate());
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempFahren + " °F");
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    //city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card)




}

function makeForecast(response)
{

  // variable to hold response.list
  var results = response.list;
  
  // debug the list
  console.log(results)
  
  $('#forecast').empty();


  
  for (let i = 0; i < results.length; i++) {

    let day = Number(results[i].dt_txt.split('-')[2].split(' ')[0]);
    let hour = results[i].dt_txt.split('-')[2].split(' ')[1];
    console.log(day);
    console.log(hour);

    if(results[i].dt_txt.indexOf("12:00:00") !== -1){
      
      // get the temperature and convert to fahrenheit 
      let temp = (results[i].main.temp - 273.15) * 1.80 + 32;
      let tempF = Math.floor(temp);

      const card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
      const cardBody = $("<div>").addClass("card-body p-3 forecastBody")
      const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
      const temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
      const humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

      const image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

      cardBody.append(cityDate, image, temperature, humidity);
      card.append(cardBody);
      $("#forecast").append(card);

}
