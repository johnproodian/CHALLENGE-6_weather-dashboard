APIKey = "433db97a8512e8112426ca764b0710cc";

var currentEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast-card-container");


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
                        var latitude = data.coord.lat;
                        var longitude = data.coord.lon;
                        displayCurrent(data, latitude, longitude); //add fcn to display current conditions here --> something like displayCurrent(data)
                        getForecast(latitude, longitude);
                    })
            } else {
                alert("Error: didn't work...")
            }
    })
}

// function to get and display current UVI (since current api didn't have it, I had to use the lat and lon values from current api to get the current uvi from the One Call API)
var getCurrentUVI = function(latitude, longitude) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&exclude=minutely,hourly,alerts";
    
    // get api data AND display the UVI element
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        var currentUVI = data.current.uvi;
                        var currentUVIEl = document.createElement("p");
                        var currentUVISpan = document.createElement("span");
                        currentUVISpan.textContent = currentUVI;
                        if (currentUVI <= 2) {
                            currentUVISpan.className = "bg-success text-white px-2 py-1";
                        } else if (2 < currentUVI < 6) {
                            currentUVISpan.className = "bg-warning px-2 py-1";
                        } else {
                            currentUVISpan.className = "bg-danger text-white px-2 py-1";
                        }
                        currentUVIEl.className = "ml-2";
                        currentUVIEl.textContent = "UV Index: ";
                        currentUVIEl.append(currentUVISpan); 
                        currentEl.appendChild(currentUVIEl);
                    })
            } else {
                alert("UV Index fetch failed");
            }
        })
}

var getForecast = function(latitude, longitude) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&exclude=current,minutely,hourly,alerts";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log("#2 worked");
                response.json()
                    .then(function(data) {
                        debugger;
                        displayForecast(data);
                    }) // put fcn here to display five day forecast --> something like displayForecast(data)
            } else {
                alert("#2 didn't work...");
            }
        })
}

// function to display the data of the current weather from the api
var displayCurrent = function(current, lat, lon) {
    // add city and date to top of div
    var cityName = current.name;
    var date = new Date();
    var [month, day, year] = [[date.getMonth() + 1], date.getDate(), date.getFullYear()];
    var weatherIcon = current.weather.icon;
    var cityDateIconEl = document.createElement("h3");
    date = "(" + month + "/" + day + "/" + year + ")";
    cityDateIconEl.className = "ml-2";
    cityDateIconEl.textContent = cityName + " " + date + " " + weatherIcon;
    currentEl.appendChild(cityDateIconEl);

    // add temp
    var temp = current.main.temp
    var tempEl = document.createElement("p");
    tempEl.className = "ml-2";
    tempEl.textContent = "Temp: " + temp + "°F";
    currentEl.appendChild(tempEl);
    console.log("temp: " + temp);

    // add wind
    var wind = current.wind.speed;
    var windEl = document.createElement("p");
    windEl.className = "ml-2";
    windEl.textContent = "Wind: " + wind + " MPH";
    currentEl.appendChild(windEl);

    // add humidity
    var humidity = current.main.humidity;
    var humidityEl = document.createElement("p");
    humidityEl.className = "ml-2";
    humidityEl.textContent = "Humidity: " + humidity + " %";
    currentEl.appendChild(humidityEl);


    // add UV index
    getCurrentUVI(lat, lon);

    // STILL NEEDED:
        // add icon for type of weather
        // date might need to be changed to not UTC time??
}

var displayForecast = function(forecast) {
    for (i = 0; i < forecast.length; i++) {
        // container
        var forecastCard = document.createElement("div")

        // date
        var date = forecast[i].daily.dt;
        var dateEl = document.createElement("p")
        dateEl.className = "ml-2";
        dateEl.textContent = date;
        forecastCard.appendChild(dateEl)
        forecastEl.appendChild(forecastCard);
        // Temp:
        // Wind:
        // Humidity: 
    }
    
    // cards...divs??
}

getCurrent(searchCity);






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