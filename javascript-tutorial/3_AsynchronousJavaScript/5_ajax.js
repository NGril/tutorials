// 5. AJAX (Asynchronous JavaScript And XML) - allows us to asynchronously communicate with the server
/*
Metaweather API, https://www.metaweather.com/api/

 JS Cross origin policy which means the we can't request resources outside of our domain. In order to avoid this the server needs to implement CORS (cross origin resource sharing). To solve it we'll create a workaround using https://cors-anywhere.herokuapp.com
*/

// AJAX with promises
function getWeather(woeID) {
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeID}/`)
        .then(result => {
            console.log(result);
            return result.json();
        })
        .then(data => {
            console.log(data);
            const today = data.consolidated_weather[0];
            console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp} degrees celsisus.`);
        })
        .catch(error => {
            console.log(error);
        });
}
getWeather(44418);

// AJAX with async await
async function getWeatherAW(woeID) {
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeID}/`);
        const data = await result.json();

        const tomorrow = data.consolidated_weather[0];
        console.log(`Temperatures in ${data.title} for tomorrow stay between ${tomorrow.min_temp} and ${tomorrow.max_temp} degrees celsisus.`);
        return data;
    } catch (error) {
        console.log(error);
    }
}
getWeatherAW(44418);
let dataLondon = getWeatherAW(44418).then(data => {
    dataLondon = data;
    console.log(dataLondon);
});