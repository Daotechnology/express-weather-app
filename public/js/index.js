const log = console.log;
const form = document.querySelector("#form");
const timeZone= document.querySelector("#timezone");
const temp = document.querySelector("#temp");
const locations = document.querySelector("#location");
const weather = document.querySelector("#weather");
const forecast = document.querySelector("#forecast");
const showList = document.querySelector(".list-group");

//using Fetch to fetch the Api End Point

const obj = async (addresss)=>{
    let res = await fetch(`http://localhost:3000/weather?address=${addresss}`);
    let data = await res.json();
    return data;
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let search = form['search'];
    obj(search.value).then(data=>{
        if(data.error){
           document.querySelector(".error").innerHTML = data.error;
        } else {
            log(data)
            document.querySelector(".error").innerHTML = '';
            showList.style.display = 'block';
            temp.textContent = 'Minimum Temperature=>:'+ data.address.temp.min;
            timezone.textContent = 'TimeZone=>' + data.address.timezone;
            weather.textContent = 'Weather=>' + data.address.weather.desc;
            locations.textContent = 'Location=>' + data.location;
            forecast.textContent = `Forecast=>: The Weather is ${data.address.weather.desc} with a minimum temperature of
             ${data.address.temp.min} and maximum temperature of ${data.address.temp.max} and
              a ${data.address.rain || data.address.pop}% chance of Raining.`;
        }
    })
})