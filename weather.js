const weatherContainer = document.querySelector('.weatherContainer');
const weatherDiv = weatherContainer.querySelector('.weather');
const weatherIconImg = weatherContainer.querySelector('.weather_icon');
const temperatureDiv = weatherContainer.querySelector('.temperature');
const cityDiv = weatherContainer.querySelector('.city');

const COORDS = 'coords';
const WEATHER_API_KEY = '2a4dfa6f9892a50c75182e50c8cc820d';

function getWeather(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const icon = json.weather[0].icon;
            const weatherDescription = json.weather[0].description;
            const temperature = json.main.temp;
            const country = json.sys.country;
            const city = json.name;
            weatherDiv.title = weatherDescription;
            weatherIconImg.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            temperatureDiv.innerHTML = `${temperature} °`;
            cityDiv.innerText = `${city}, ${country}`;
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't access geolocation!!");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
