//https://api.openweathermap.org/data/2.5/weather?q=ranchi&appid=f1ae098a69e8a9f67b2043aaf81bfc3d&units=metric

const apiKey="f1ae098a69e8a9f67b2043aaf81bfc3d";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");

async function checkWeather(city){
    const response=await fetch(apiUrl+`${city}&appid=${apiKey}`);
    console.log(response);
    if(response.status==404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        document.querySelector(".weather").style.display="block";
        document.querySelector(".error").style.display="none";
        const data=await response.json(); 
        console.log(data);
        document.querySelector(".city").innerHTML=data.name;
        document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
        document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
        document.querySelector(".wind-speed").innerHTML=data.wind.speed+"Km/hr";
        const mode=data.weather[0].main;  

        // changing Image according to the weather status
        document.querySelector(".weather-icon").src=`resource/${mode}.png`;
    }
}
//creating functionality after click on button

searchBtn.addEventListener("click",()=>{
    var city=searchBox.value;
    checkWeather(city);
});
searchBtn.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
         // Prevent the default form submit action
        searchBtn.click(); // Trigger the button click
    }
});