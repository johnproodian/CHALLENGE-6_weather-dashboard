APIKey = "433db97a8512e8112426ca764b0710cc";

var searchCity = "austin";

// function to get current conditions

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var getCurrent = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    
    fetch(apiUrl)
        .then(function(response) {
            console.log("it fetched")
            if(response.ok) {
                console.log("response is good!");
                response.json()
                    .then()
            } else {
                alert("Error: didn't work...")
            }

    })
}

var getForecat = function(city) {
    var apiUrl = "";
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