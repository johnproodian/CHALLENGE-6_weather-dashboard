APIKey = "433db97a8512e8112426ca764b0710cc";

var currentEl = document.querySelector("#current-weather");


var searchCity = "austin";

// function to get current conditions
var getCurrent = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    
    fetch(apiUrl)
        .then(function(response) {
            console.log("it fetched")
            if(response.ok) {
                console.log("response is good!");
                response.json()
                    .then(function(data) {
                        displayCurrent(data); //add fcn to display current conditions here --> something like displayCurrent(data)
                    })
            } else {
                alert("Error: didn't work...")
            }
    })
}

var getCurrentUVI = function(latitude, longitude) {
    
}

var getForecast = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&?units=imperial";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log("#2 worked");
                response.json()
                    .then() // put fcn here to display five day forecast --> something like displayForecast(data)
            } else {
                alert("#2 didn't work...");
            }
        })
}

var displayCurrent = function(current) {
    // add city and date to top of div
    var cityName = current.name;
    var date = new Date();
    var [month, day, year] = [[date.getMonth() + 1], date.getDate(), date.getFullYear()];
    var cityDateEl = document.createElement("h3");
    date = "(" + month + "/" + day + "/" + year + ")";
    cityDateEl.textContent = cityName + " " + date;
    currentEl.appendChild(cityDateEl);

    // add temp
    var temp = current.main.temp
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + temp + "°F";
    currentEl.appendChild(tempEl);
    console.log("temp: " + temp);

    // add wind
    var wind = current.wind.speed;
    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + wind + "MPH";
    currentEl.appendChild(windEl);


    // add UV index
    var uVIndex = "";

    // h3 with [city] and [date]
    // p with "Temp: " + temp data
    // p with "Wind: " + wind data
    // p with "UV Index: " + UV Data <-- this needs to be formatted with the right color...
}

getCurrent(searchCity);
getForecast(searchCity);





// Get previous searches (local storage) fcn --> Check local storage and get previous searches
// Display previous searches fcn --> Display previous searches in clickable buttons below search form

// Call get local storage and display local storage fcns(2)

// Form submit handler fcn --> Receive input from search form and store it in a variable
// Store search fcn --> store search in localStorage
// Get current conditions fcn --> Fetch current conditions from api based on input, store it in variable(s)
    // conditions: 
        // city name
        // date
        // icon rep of weather conditions
        // temperature
        // humidity
        // wind speed
        // UV index
// Get future conditions fcn --> Fetch future conditions from api based on input, store it in variable(s)
// Display current and future conditions --> display conditions function

// Listen for click, then run form submiit handler fcn 
    // --> store current search fcn, 
    // --> get previous searches fcn, 
    // --> display previous searches fcn, 
    // --> get current conditions fcn 
        // --> display current conditions fcn)
    // --> Get future conditions fcn
        // --> display future conditions fcn) 