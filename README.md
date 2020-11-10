11/7/2020
Pirooz Wallace

06 Weather Dashboard

GitHub Repo: https://github.com/attack-theoRy/06WeatherDashPW

GitHub Pages / App : https://attack-theory.github.io/06WeatherDashPW/

APIs and CSS Frameworks Used: 
- OpenWeatherMap API
- jQuery API
- Font Awesome CSS for search function magnifying icon
- BootStrap CSS

What this App Does:
Weather app that allows you to find the current weather conditions by city / country. Has search bar (where user inputs city) that calls openweathermap api to get current temperature, humidity, date, wind speed and UV index. UV index is color coded to denote whether UV is favorable (green), moderate (yellow) or severe (red). Favorable = 0-3, Moderate = 3-5 and Severe = 5+. Here is an example of severe UV index in Chile

Search can also be done by pressing "enter" as well, not just clicking.

<img src='Assets\SampleScreen1.png' alt='Chile Weather... get it?'>

 The app also gives a 5 day forecast for the city with basic weather conditions including date, temperature, humidity and a small image to denote whether it will be sunny, rainy, foggy etc. and then adds the city to a search history that is displayed beneath the search bar. Searching for multiple cities will give you a clickable search history list you can use to retrieve those cities weather conditions again:

 <img src='Assets\SampleScreen3.png'  alt='I guess this means the sun looks like a dirt stain right about now?'>  
 
 The last city searched is saved to localstorage and retrieved when opening / refreshing the browser. So opening after using it should have last search already displayed like below:
 
 <img src='Assets\SampleScreen2.png'  alt='SF always cloudy'>  
   
   


