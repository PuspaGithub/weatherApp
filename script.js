const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = document.querySelector("#city").value;
    const country = document.querySelector("#country").value;
    const celcius = document.querySelector("#celcius");
    const ferhenhite = document.querySelector("#ferhenhite");

    fetch (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city},${country}?unitGroup=metric`)
    .then(function(response) {
        return response.json();
    })
    .then(function(datas){
        celcius.textContent = `Current temperature of ${city, country} is: ` + datas.currentConditions.temp+'\u00B0C';
        const conversion = (datas.currentConditions.temp * 1.8) + 32;
        ferhenhite.textContent = `Current temperature of ${city, country} is: ` + conversion+'\u00B0F'
    })
    
})