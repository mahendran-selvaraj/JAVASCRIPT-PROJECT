

const apiKey = '44c250c0f8033cd4a6a440be0a38fd5b';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

document.getElementById('search-btn').addEventListener('click', fetchWeather);
document.getElementById('city').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather() {
    const city = document.getElementById('city').value.trim();

    if (city === '') {
        displayError('Please enter a city name.');
        return;
    }

    const url = `${baseUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => displayError(error.message));
}

function displayWeather(data) {
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('weather-info').style.display = 'block';

    const weatherInfo = document.getElementById('weather-info');

    const mainCondition = data.weather[0].main.toLowerCase();

    const logoMap = {
        rain: 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png',
        clouds: 'https://cdn-icons-png.flaticon.com/512/414/414927.png', 
        clear: 'https://cdn-icons-png.flaticon.com/512/169/169367.png',
        drizzle: 'https://cdn-icons-png.flaticon.com/512/3075/3075933.png', 
        snow: 'https://cdn-icons-png.flaticon.com/512/651/651767.png',
        thunderstorm: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
        default: 'https://cdn-icons-png.flaticon.com/512/861/861059.png'
    };
    const weatherLogo = logoMap[mainCondition] || logoMap.default;

    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p class="temp">${data.main.temp}°C</p>
        <img src="${weatherLogo}" alt="${mainCondition}" style="width: 100px; height: 100px; margin: 10px auto; display: block;">
        <div style="color:black">
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
}

function displayError(message) {
    document.getElementById('weather-info').style.display = 'none';
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = message;
    errorMessage.style.display = 'block';
}


