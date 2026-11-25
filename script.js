const form = document.querySelector("form");


async function getWeather(encodedCity, encodedCountry, celcius, ferhenhite) {
    try {
        const response = await fetch (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedCity},${encodedCountry}?unitGroup=metric`)
        const weatherData = await response.json();
        celcius.textContent = `Current temperature of ${encodedCity + ", "+ encodedCountry} is: ` + weatherData.currentConditions.temp+'\u00B0C'; 
        const conversion = (weatherData.currentConditions.temp * 1.8) + 32;
        ferhenhite.textContent = `Current temperature of ${encodedCity + ", "+ encodedCountry} is: ` + conversion+'\u00B0F';
        console.log(weatherData);
    } catch(error) {
        console.log(error);
        celcius.textContent = error;
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = document.querySelector("#city").value;
    const country = document.querySelector("#country").value;
    const celcius = document.querySelector("#celcius");
    const ferhenhite = document.querySelector("#ferhenhite");

    const encodedCountry = encodeURIComponent(country);
    const encodedCity = encodeURIComponent(city);


    getWeather(encodedCity, encodedCountry, celcius, ferhenhite);

    // fetch (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodedCity},${encodedCountry}?unitGroup=metric`)
    // .then(function(response) {
    //     if(!response.ok){
    //         throw new Error("Error")
    //     }
    //     return response.json();
    // })
    // .then(function(datas){
    //     celcius.textContent = `Current temperature of ${city + ", "+ country} is: ` + datas.currentConditions.temp+'\u00B0C';
    //     const conversion = (datas.currentConditions.temp * 1.8) + 32;
    //     ferhenhite.textContent = `Current temperature of ${city + ", "+ country} is: ` + conversion+'\u00B0F'
    // }).catch((err) => console.log(err));
    
})

/*

<script>
  const img = document.querySelector('img');

  async function getCats() {
    try {
      const response = await fetch('https://api.giphy.com/v1/gifs/random?api_key=YOUR_KEY_HERE&tag=cats');
      const catData = await response.json();
      img.src = catData.data.images.original.url;
    } catch (error) {
      console.error(error);
    }
  }
</script>

*/