
      // STILL NEEDED:
        // add icon for type of weather
        // date might need to be changed to not UTC time??
        // delete search history buttons

let storedSearches = [];

const APIKey = "433db97a8512e8112426ca764b0710cc";

let searchHistoryList = document.querySelector("#search-history");


const currentEl = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast-card-container");
const forecastH2El = document.querySelector("#forecast-title");
const searchInputEl = document.querySelector("#search");
const searchForm = document.querySelector("#search-form");
const searchBtn = document.querySelector("#search-btn")

const displaySearchHistory = function(storedSearchesArray) {
    // create a searchable/clickable card for every city in the array
    searchHistoryList.textContent = "";

    for (i = 0; i < storedSearchesArray.length; i++) {
        console.log("storedSearchesArray[i]: " + storedSearchesArray[i]);
        let historyBtn = document.createElement("button");
        historyBtn.className = "history-btn my-2 rounded-lg";
        historyBtn.textContent = storedSearchesArray[i];
        searchHistoryList.appendChild(historyBtn);
    }
}

const historyGetCurrent = function(searchCity) {
    currentEl.textContent = "";
    forecastContainer.textContent = "";
    forecastH2El.textContent = "";
    getCurrent(searchCity);
};


const getLocalStorage = function() {
    storedSearches = JSON.parse(localStorage.getItem("searches"));
    if (!storedSearches) {
        storedSearches = [];
    } else {
        displaySearchHistory(storedSearches);
    }
}

getLocalStorage();

const formSubmitHandler = function(event) {
    event.preventDefault();

    currentEl.textContent = "";
    forecastContainer.textContent = "";
    forecastH2El.textContent = "";
    const searchCity = searchInputEl.value.toLowerCase().trim();

    if (searchCity) {
        searchInputEl.value = "";
        storeSearch(searchCity);
        getCurrent(searchCity);
    } else {
        alert("Please enter a city!");
    } 
}

const storeSearch = function(city) {
    if (!storedSearches.includes(city)) {
        storedSearches.push(city);
        localStorage.setItem("searches", JSON.stringify(storedSearches));
        displaySearchHistory(storedSearches);
    } 
}

// function to get current conditions
const getCurrent = function(city) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    
    fetch(apiUrl)
        .then(function(response) {
            console.log("it fetched")
            if(response.ok) {
                console.log("response is good!");
                response.json()
                    .then(function(data) {
                        let latitude = data.coord.lat;
                        let longitude = data.coord.lon;
                        displayCurrent(data, latitude, longitude); //add fcn to display current conditions here --> something like displayCurrent(data)
                        getForecast(latitude, longitude);
                    })
            } else {
                storedSearches.pop();
                localStorage.setItem("searches", JSON.stringify(storedSearches));
                displaySearchHistory(storedSearches);
                console.log("storedSearches: " + storedSearches);
                alert("Please enter a valid city!");
            }
    })
}

// function to get and display current UVI (since current api didn't have it, I had to use the lat and lon values from current api to get the current uvi from the One Call API)
const getCurrentUVI = function(latitude, longitude) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&exclude=minutely,hourly,alerts";
    
    // get api data AND display the UVI element
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        let currentUVI = data.current.uvi;
                        let currentUVIEl = document.createElement("p");
                        let currentUVISpan = document.createElement("span");
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

const getForecast = function(latitude, longitude) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&exclude=current,minutely,hourly,alerts&units=imperial";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                console.log("#2 worked");
                response.json()
                    .then(function(data) {
                        // debugger;
                        displayForecast(data);
                    }) // put fcn here to display five day forecast --> something like displayForecast(data)
            } else {
                alert("#2 didn't work...");
            }
        })
}

// function to display the data of the current weather from the api
const displayCurrent = function(current, lat, lon) {
    // add city and date to top of div
    let cityName = current.name;
    let date = new Date();
    let [month, day, year] = [[date.getMonth() + 1], date.getDate(), date.getFullYear()];
    // var weatherIcon = current.weather.icon;
    let cityDateIconEl = document.createElement("h3");
    date = "(" + month + "/" + day + "/" + year + ")";
    cityDateIconEl.className = "ml-2";
    cityDateIconEl.textContent = cityName + " " + date; //+ " " + weatherIcon;
    currentEl.appendChild(cityDateIconEl);
    currentEl.className = "border border-secondary"

    // add temp
    let temp = current.main.temp
    let tempEl = document.createElement("p");
    tempEl.className = "ml-2";
    tempEl.textContent = "Temp: " + temp + "°F";
    currentEl.appendChild(tempEl);
    console.log("temp: " + temp);

    // add wind
    let wind = current.wind.speed;
    let windEl = document.createElement("p");
    windEl.className = "ml-2";
    windEl.textContent = "Wind: " + wind + " MPH";
    currentEl.appendChild(windEl);

    // add humidity
    let humidity = current.main.humidity;
    let humidityEl = document.createElement("p");
    humidityEl.className = "ml-2";
    humidityEl.textContent = "Humidity: " + humidity + " %";
    currentEl.appendChild(humidityEl);


    // add UV index
    getCurrentUVI(lat, lon);

  
}

const displayForecast = function(forecast) {
    forecastH2El.textContent = "5-Day Forecast:";

    for (i = 1; i < 6; i++) {
        // container
        let forecastCard = document.createElement("div")
        forecastCard.className = "bg-secondary text-white border p-2 m-2"


        // date
        let unixTimeStamp = forecast.daily[i].dt;
        let milliseconds = unixTimeStamp * 1000;
        let dateObject = new Date(milliseconds);
        let [month, day, year] = [[dateObject.getMonth() + 1], dateObject.getDate(), dateObject.getFullYear()]
        console.log(i + ": " + dateObject)
        let date = month + "/" + day + "/" + year;
        let dateEl = document.createElement("p")
        dateEl.className = "font-weight-bold";
        dateEl.textContent = date;
        forecastCard.appendChild(dateEl)
        
        // Icon here...


        // Temp:
        let temp = forecast.daily[i].temp.day;
        let tempEl = document.createElement("p");
        tempEl.className = "font-weight-bold";
        tempEl.textContent = "Temp: " + temp + "°F";
        forecastCard.appendChild(tempEl);
        
        // Wind:
        let wind = forecast.daily[i].wind_speed;
        let windEl = document.createElement("p")
        windEl.className = "font-weight-bold";
        windEl.textContent = "Wind: " + wind + " MPH";
        forecastCard.appendChild(windEl);

        // Humidity: 
        let humidity = forecast.daily[i].humidity;
        let humidityEl = document.createElement("p");
        humidityEl.className = "font-weight-bold";
        humidityEl.textContent = "Humidity: " + humidity + "%";
        forecastCard.appendChild(humidityEl);

        forecastContainer.appendChild(forecastCard);
    }
    
}

searchForm.addEventListener("submit", formSubmitHandler);
searchHistoryList.addEventListener("click", function(evt) {
    if (evt.target.classList.contains('history-btn')) {
        currentEl.textContent = "";
        forecastContainer.textContent = "";
        forecastH2El.textContent = "";
        let searchCity = evt.target.innerHTML;

        storeSearch(searchCity);
        getCurrent(searchCity);
    }
})


// --------------







