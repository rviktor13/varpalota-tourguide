document.addEventListener('DOMContentLoaded', () => {
    const LATITUDE = 47.1973;
    const LONGITUDE = 18.1396;
    
    const API_URL = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE}&longitude=${LONGITUDE}&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe/Budapest&forecast_days=7`;

    const loadingEl = document.getElementById('weather-loading');
    const errorEl = document.getElementById('weather-error');
    const gridEl = document.getElementById('forecast-grid');

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP hiba! Státusz: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Hiba az időjárás adatok lekérésekor:', error);
            showError("Nem sikerült lekérni az időjárási adatokat. Próbáld újra később.");
        });

    function displayForecast(data) {
        loadingEl.style.display = 'none';
        gridEl.innerHTML = ''; 

        const daily = data.daily;

        for (let i = 0; i < daily.time.length; i++) {
            const date = daily.time[i];
            const code = daily.weathercode[i];
            const maxTemp = Math.round(daily.temperature_2m_max[i]);
            const minTemp = Math.round(daily.temperature_2m_min[i]);

            const weather = getWeatherInfo(code); 

            const card = document.createElement('div');
            card.className = 'forecast-card';
            
            card.innerHTML = `
                <h3>${formatDate(date)}</h3>
                <i class="weather-icon wi ${weather.iconClass}"></i>
                <p class="description">${weather.description}</p>
                <p class="temp">${maxTemp}°C / ${minTemp}°C</p>
            `;
            
            gridEl.appendChild(card);
        }
    }

    function formatDate(dateStr) {
        const date = new Date(dateStr);
        const day = date.toLocaleDateString('hu-HU', { day: 'numeric' });
        const month = date.toLocaleDateString('hu-HU', { month: 'short' });
        return `${month} ${day}.`; // Formátum: "okt. 23."
    }


    function getWeatherInfo(code) {
        const codes = {
            0: { description: 'Tiszta égbolt', iconClass: 'wi-day-sunny' },
            1: { description: 'Túlnyomóan derült', iconClass: 'wi-day-sunny-overcast' },
            2: { description: 'Részben felhős', iconClass: 'wi-day-cloudy' },
            3: { description: 'Borult', iconClass: 'wi-cloudy' },
            45: { description: 'Köd', iconClass: 'wi-fog' },
            48: { description: 'Zúzmarás köd', iconClass: 'wi-fog' },
            51: { description: 'Enyhe szitálás', iconClass: 'wi-sprinkle' },
            53: { description: 'Mérsékelt szitálás', iconClass: 'wi-sprinkle' },
            55: { description: 'Erős szitálás', iconClass: 'wi-sprinkle' },
            56: { description: 'Ónos szitálás', iconClass: 'wi-rain-mix' },
            57: { description: 'Ónos szitálás', iconClass: 'wi-rain-mix' },
            61: { description: 'Enyhe eső', iconClass: 'wi-rain' },
            63: { description: 'Mérsékelt eső', iconClass: 'wi-rain' },
            65: { description: 'Erős eső', iconClass: 'wi-rain' },
            66: { description: 'Ónos eső', iconClass: 'wi-rain-mix' },
            67: { description: 'Ónos eső', iconClass: 'wi-rain-mix' },
            71: { description: 'Enyhe havazás', iconClass: 'wi-snow' },
            73: { description: 'Mérsékelt havazás', iconClass: 'wi-snow' },
            75: { description: 'Erős havazás', iconClass: 'wi-snow' },
            77: { description: 'Hódara', iconClass: 'wi-snow' },
            80: { description: 'Enyhe zápor', iconClass: 'wi-showers' },
            81: { description: 'Mérsékelt zápor', iconClass: 'wi-showers' },
            82: { description: 'Erős zápor', iconClass: 'wi-showers' },
            85: { description: 'Hózápor', iconClass: 'wi-snow-wind' },
            86: { description: 'Hózápor', iconClass: 'wi-snow-wind' },
            95: { description: 'Zivatar', iconClass: 'wi-thunderstorm' },
            96: { description: 'Zivatar jégesővel', iconClass: 'wi-storm-showers' },
            99: { description: 'Zivatar jégesővel', iconClass: 'wi-storm-showers' }
        };
        return codes[code] || { description: 'Ismeretlen', iconClass: 'wi-na' }; 
    }

    function showError(message) {
        loadingEl.style.display = 'none';
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
});