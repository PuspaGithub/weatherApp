const form = document.querySelector("form");


async function getWeather(encodedCity, encodedCountry) {
    try {
        const response = await fetch (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedCity},${encodedCountry}?unitGroup=metric`)
        if (!response.ok){
            throw new Error("Error")
        }
        const weatherData = await response.json();
        return {data:weatherData, errors:false}
    } catch(error) {
        return {data:error, errors:true};
    }
}

function renderError(data, weatherDisplay){
    weatherDisplay.textContent = data;
}

function renderWeather(data, weatherDisplay){
    weatherDisplay.textContent = `The Weather is ${data.cel}(${data.fer})`
}

function processWeather(data){
    const tempCel = data.currentConditions.temp;
    const tempFer = (tempCel*1.8)+32;
    return {cel: tempCel+"\u00B0C", fer: tempFer+"\u00B0F"}
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = document.querySelector("#city").value;
    const country = document.querySelector("#country").value;
    const weatherDisplay = document.querySelector("#weatherDisplay");

    const encodedCountry = encodeURIComponent(country);
    const encodedCity = encodeURIComponent(city);


    const {data, errors} = await getWeather(encodedCity, encodedCountry);

    if(errors){
        renderError(data, weatherDisplay);
    }else {
        const weather = processWeather(data);
        renderWeather(weather, weatherDisplay);
    }
})