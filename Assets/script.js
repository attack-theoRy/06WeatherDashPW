
// Variable Declarations

// get the city from input
var citySearched = '' 

// set my api Key
var apiKey = "&appid=4f673f2121ccfb9c88b2fc0428302cb3";

// declare variable for eventual looong query
var myQueryURL = ''

// saved cities object array
var savedCities = ['']

// saved search history array
// used just for testing
//var history = ['New York', 'San Francisco', 'Albany', 'Berkeley']


// use date variable to get proper date
var date = moment().format('dddd, MMMM Do YYYY')


// event listener function for the search button
// what happens when you hit search!
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

 
  // save the last city searched for in storage
  localStorage.setItem('savedCities', citySearched)


// show the current weather
showCurrentWeather(response)
showUVIndex(response)

 makeForecast(response)
 searchHistory();

  })

})

// also handle search input if enter key is pressed
$('#searchBox').keypress(function (e){
  if(e.keyCode === 13){
      e.preventDefault() 
      $("#searchBtn").click()
  }
})

// logic for saved searches
$(".list").on("click", function(event) {
  event.preventDefault() 

  // get the value from the form

  var selection = event.target

  savedCity = selection.textContent;

  // debug console for saved search
  console.log("clicked saved search")

  console.log(savedCity)
  
  // the full query 
  myQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + savedCity + apiKey;
  
  // ajax api call
  $.ajax({
    url: myQueryURL,
    method: "GET"
  })
  .then(function (response){
  
    console.log(response)
    localStorage.setItem('savedCities', savedCity)
  
  // show the current weather
  showCurrentWeather(response)
  showUVIndex(response)
  
   makeForecast(response)

  
    })
  
  })

  //////////////////////////////////////


  // load the last search
  function loadSearch(){


    // get the savedCities from file
    savedCities = localStorage.getItem('savedCities')
    
    // display the last search as long as there are cities saved
    if(savedCities !== null)
    {

      // debug console
  console.log(savedCities)

  // set the city to search for to the last displayed city
  citySearched = savedCities
  console.log(citySearched)
 
  // the full query 
  myQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + apiKey;

  // ajax api call
  $.ajax({
  url: myQueryURL,
  method: "GET"
})
.then(function (response){

// show the current weather
showCurrentWeather(response)

// show the current UV index with color coding
showUVIndex(response)

// show the 5 day forecast
makeForecast(response)
})
    
}}

///////////////

// load this function on startup to get the last city searched to display 
loadSearch()

  // get saved cities from localStorage and also save the current cities searched for
function searchHistory() {


// make sure the text box has something in it
if(citySearched !== '')
{
  // set list item to last city search
  var listItem = $("<li>").addClass("list-group-item").text(citySearched);

  // add it to the search history list and give it a button class to enable clicking 
  listItem.addClass('btn-outline-primary')
  $(".list").append(listItem);
 
}}


// show the current weather conditions
function showCurrentWeather(response)
{

  // clear out what is currently displaying if anything
  $('#currentCity').empty();

    // get temperature from response and convert it fahrenheit
    var tempFahren = (response.main.temp - 273.15) * 1.80 + 32;


    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var city = $("<h4>").addClass("card-title").text(response.name);
    var cityDate = $("<h4>").addClass("card-title").text(date);
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempFahren + " °F");
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);

    $("#currentCity").append(card)

}

function makeForecast(response)
{

  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearched + apiKey,
    method: "GET"
  }).then(function (response){


  // variable to hold response.list
  var results = response.list;
  
  // debug the list
  console.log(response)
  
  // clear out the previous forecast
  $('#forecast').empty();

  // debug console
  console.log(date)


  // loop for all 5 days
  for (var i = 0; i < 5; i++) {


    // get the current day
    var tempDate = date
    tempDate = moment().add(i, 'days')
     
    
      // get the image for the forecast from the api
    var cardImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
  

      // get the temperature in kelvin and convert to fahrenheit
    var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
    var tempFahren = Math.round(temp);


    // set card attributes for the 5 day forecast
      var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");

      var cardBody = $("<div>").addClass("card-body p-3 ")
      
      // set temperature, humidity and date to current conditions
      var temperature = $("<p>").addClass("card-text").text("Temp: " + tempFahren + " °F");
      var humidity = $("<p>").addClass("card-text ").text("Humidity: " + results[i].main.humidity + "%");
      var cityDate = $("<h4>").addClass("card-title").text(tempDate);

      // unhide the 5 day forecast title
      $('#forecastH5').show()

      // add the conditions to the card
      cardBody.append(cityDate, cardImage, temperature, humidity);

      
      // add the body to the card shell
      card.append(cardBody);
      
      // add the card to the forecast anchor element
      $("#forecast").append(card);
    //}

  }


})
}

// function to get the UV index
function showUVIndex(response){


  // used for debugging
  console.log(response)

  // get the longitude from the API response
  var longitude = response.coord.lon

  // get the latitude from the API response
  var latitude = response.coord.lat

  // get UV url query
  var UVurl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + latitude + '&lon=' + longitude + apiKey

  // ajax call
  $.ajax({
    url: UVurl,
    method: "GET"
  }).then(function (response){


    // set the different UV colors depending on how severe the conditions are
    // favorable
    if(response.value < 3)
    {
      var UVindex = $("<p>").addClass("card-text current-UV").text("UV Index: " + response.value + " - favorable");
      UVindex.css('background-color', 'green')
    }
    // moderate
    else if(response.value > 3 && response.value < 5)
    {
      var UVindex = $("<p>").addClass("card-text current-UV").text("UV Index: " + response.value + ' - moderate');
      UVindex.css('background-color', 'yellow')
    }
    // severe
    else{

      var UVindex = $("<p>").addClass("card-text current-UV").text("UV Index: " + response.value + ' - severe');
      UVindex.css('background-color', 'red')
    }

    // add the UV index to the current conditions
    $("#currentCity").append(UVindex)
  })

}