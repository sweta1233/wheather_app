document.addEventListener('DOMContentLoaded',() => {
    const cityInput=document.getElementById("city-input")
    const weatherInfo=document.getElementById("weather-info")
    const getWeatherBtn=document.getElementById("get-weather-btn")
    const cityNameDisplay=document.getElementById("city-name")
    const temperatureDisplay=document.getElementById("temperature")
    const descriptionDisplay=document.getElementById("description")
    const API_KEY="982e5b796e45fda7d506e8c91337d3c3"  //enviromental variable
    getWeatherBtn.addEventListener('click',async()=>{
        const city = cityInput.ariaValueMax.trim()
        if(!city) return;
        try {
            const weatherData= await fetchWeatherData(city)
            displayWeatherData(weatherData)
        } catch (error) {
            showError()
            
        }
    })
    async function fetchWeatherData(city){
        //get the data
        const url=`https://api.openweathermap.org/data/3.0/weather?q=${city}&units=metrics&appid=${API_KEY}`;
        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE",response);
        if(!response.ok){
            throw new Error("city not found");
        }
         const data=await response.json()
         return data


    }
    function displayWeatherData(data){
        //display data
        console.log(data);
        const { name,main, weather}=data;
        cityNameDisplay.textContent=name;
        temperatureDisplay.textContent=`Temperature:${main.temp}`
        descriptionDisplay.textContent=`Temperature:${weather[0].description}` 
    

        //unlock the display
        weatherInfo.classList.remove("hidden")
        errorMessage.classList.add("hidden")
        
    }
    function showError(){
        weatherInfo.classList.remove("hidden")
        errorMessage.classList.add("hidden")
    }
})
