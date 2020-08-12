const log = console.log;
const axios = require('axios');
const geocode = (address,callback)=>{
    const api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoib2xhamlkZTQzMDkiLCJhIjoiY2tkanpiZHlpMGp3YjJ4b2hpOGV1cGc0ciJ9.AZMwaOPqhQSFnt_VylttRw&limit=1`;
    axios.get(api).then( ({ data }) =>{
        const checkArrLength = data.features.length;
        if (checkArrLength < 1) {
            callback('Location Not Found.Please try Another Search',undefined);
        } else {
            const lat = data.features[0].center[0];
            const long = data.features[0].center[1];
            const location = data.features[0].place_name;
            callback(undefined,{
                long:long,
                lat:lat,
                location
            })
        }
    }).catch(err=>{
        callback('There is an Error in Network Connection',undefined)
    });
    
}
geocode('America',(data)=>{
    log(data)
})
module.exports = geocode;