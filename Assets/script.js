
// Variable Declarations

// get the city from input
var citySearched = $("#searchBox").val();

// set my api Key
var apiKey = "&appid=4f673f2121ccfb9c88b2fc0428302cb3";

// declare variable for eventual looong query
var myQueryURL = ''

var savedCities = ['']

var firstRun = true

var date = new Date();



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


// show the current weather
showCurrentWeather(response)
//showUVIndex(response)

 makeForecast(response)
 searchHistory();

  })


})

// logic for saved searches
$(".btn-outline-primary").on("click", function(event) {

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
  
  // show the current weather
  showCurrentWeather(response)
  //showUVIndex(response)
  
   makeForecast(response)
   searchHistory();
  
    })
  
  })

  //////////////////////////////////////

  // load the saved searches from file and display the last search

  function loadSearch(){

    //var savedCity = 'Oakland'
    //localStorage.setItem('savedCities', JSON.stringify(savedCity))


    // get the savedCities from file
    savedCities = JSON.parse(localStorage.getItem('savedCities'))

    

    // display the last search as long as there are cities saved
    if(savedCities !== null)
    {

      console.log(savedCities)

      citySearched = savedCities[(savedCities.length - 1)]
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
//showUVIndex(response)

 makeForecast(response)
 searchHistory();

  })


    }
    else{
      console.log("switching first run here")
      firstRun = false
    }



}

///////////////

// load this function on startup
loadSearch()

  // get saved cities from localStorage and also save the current cities searched for
function searchHistory() {

  // get the saved City array from local storage
  savedCities = JSON.parse(localStorage.getItem('savedCities'))


  // make sure savedCities has something in it
  if(savedCities !== null)
  {

    console.log("not the first run?")

    console.log(savedCities)
    
  for(var i=0; i< savedCities.length; i++)
  {
    var listItem = $("<li>").addClass("list-group-item").text(savedCities[i]);
    listItem.addClass('btn-outline-primary')
    $(".list").append(listItem);
    

  }
}

if(citySearched !== '')
{
  var listItem = $("<li>").addClass("list-group-item").text(citySearched);

  listItem.addClass('btn-outline-primary')
  $(".list").append(listItem);

  // if this isn't the first run with saved cities then push onto array, otherwise equal the array for first index
  if(!firstRun)
  {
  savedCities.push(citySearched)
  localStorage.setItem('savedCities', savedCities)
  }
  else
  {
    savedCities[0] = citySearched
  }
  
}


  //savedCities.push(citySearched)

 

 //savedCities = JSON.parse(localStorage.getItem('savedCities'))
}


function showCurrentWeather(response)
{

  // clear out what is currently displaying if anything
  $('#currentCity').empty();

    // get temperature from response and convert it fahrenheit
    var tempFahren = (response.main.temp - 273.15) * 1.80 + 32;

    // get the date
    //var todayDate = Date()


    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var city = $("<h4>").addClass("card-title").text(response.name);
    const cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempFahren + " °F");
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.main.humidity + "%");
    var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

    // add to page
    city.append(cityDate, image)
    cardBody.append(city, temperature, humidity, wind);
    card.append(cardBody);

    // get the UV Index

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
  
  // 
  $('#forecast').empty();


  for (var i = 0; i < results.length; i++) {


    if(results[i].dt_txt.indexOf("12:00:00") !== -1){
    
      // get the image for the forecast
    var cardImage = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")
  
      // get the temperature and convert to fahrenheit 
      //var tempFahren =  Math.floor((results[i].main.temp - 273.15) * 1.80 + 32);

    var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
    var tempFahren = Math.round(temp);


      var card = $("<div>").addClass("card col-2 bg-primary text-white currentCard");

      var cardBody = $("<div>").addClass("card-body p-3 ")
     
      var temperature = $("<p>").addClass("card-text forecastTemp").text("Temp: " + tempFahren + " °F");
      var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");

      var cityDate = $("<h4>").addClass("card-title").text(date.toLocaleDateString('en-US'));

      
      cardBody.append(cityDate, cardImage, temperature, humidity);
      card.append(cardBody);
      $("#forecast").append(card);
    }

  }
})
}

function showUVIndex(response){


  // used for debugging
  console.log(response)

  // get the longitude from the API response
  var longitude = response.coord.lon

  // get the latitude from the API response
  var latitude = response.coord.lat

  // get UV url query
  var UVurl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + latitude + '&lon=' + longitude + apiKey

  $.ajax({
    url: UVurl,
    method: "GET"
  }).then(function (response){

    if(response.value < 3)
    {
      var UVindex = $("<p>").addClass("card-text current-UV").text("UV Index: " + response.value);
      UVindex.setAttribute('')
    }
    else if(response.value > 3 && response.value < 5)
    {

    }
    else{

    }

   // $('currentCard').append(UVindex)
    $("#currentCity").append(UVindex)
  })




}