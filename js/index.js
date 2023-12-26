// input variables 
let inputSearch = document.getElementById("search");

// today data variables 
let todayName = document.getElementById("today-name");
let todayNumber = document.getElementById("today-number");
let month = document.getElementById("month");
let todayLocation = document.getElementById("today-location");
let todayTemp = document.getElementById("today-temp");
let todayImg = document.getElementById("today-img");
let todayconditionText = document.getElementById("today-condition-text");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let windDirection = document.getElementById("wind-direction");

// next data variables 

let nextDay = document.getElementsByClassName("next-day-name")
let nextMaxTemp = document.getElementsByClassName("next-max-temp")
let nextMinTemp = document.getElementsByClassName("next-min-temp")
let nextConditionImg = document.getElementsByClassName("next-condition-img")
let nextConditionText = document.getElementsByClassName("next-condition-text")

// fetch Api 
async function getWeatherData (city){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b35f2e8b137d4ba397c130300232312&q=${city}&days=3`);
    let weatherData = await response.json();
    return weatherData;
}


// display today data 
function displaytodayData (data){
    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    month.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
    todayLocation.innerHTML = data.location.name;
    todayTemp.innerHTML = data.current.temp_c;
    todayImg.setAttribute("src",data.current.condition.icon)
    todayconditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir

}
   // display next data 
function displayNext (data){
    let forecastData = data.forecast.forecastday
    for(let i = 0 ; i < 2 ; i++)
    {
        let nextDate = new Date(forecastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }
}

console.log(nextDay);


// start APP
async function startApp (city= "cairo"){
    let weatherData = await getWeatherData(city);
    if(!weatherData.error){
        displaytodayData(weatherData);
        displayNext(weatherData);
    }
}

startApp ();

inputSearch.addEventListener("input", function(){
    startApp(inputSearch.value);

})
