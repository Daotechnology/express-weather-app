const axios = require('axios');
  const forecast = ( {lat,long}, callback )=>{
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=a215229badc0e12c5417f9d4c520e9ce`).then(req=>{
        const data = req.data;
        if (data.cod == 400) {
            callback(`The Longitude and Latitude is Empty,${data.message}`,undefined);
        } else {
            let obj = {
                temp:{
                    min:data.daily[0].temp.min,
                    max:data.daily[0].temp.min
                    },
                weather:{
                    desc:data.daily[0].weather[0].description,
                    main:data.daily[0].weather[0].main
                },
                timezone:data.timezone,
                pop:data.daily[0].pop,
                rain:data.daily[0].rain
            }
           callback(undefined,obj);
        }
    }).catch(err=>{
        callback('Connection Failed,Please try Again When you have a Stable Connection',undefined);
    })
  }
  
module.exports = forecast;