const axios = require('axios');
const { MAPBOX_ACCESS_KEY } = require('./access-key');

const geocode = (location, callback) => {
    const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${MAPBOX_ACCESS_KEY}`;

    axios.get(geocodeURL).then(({data}) => {
        if (!data.features.length) {
            callback('Unable to find location. Try another search.', undefined);
            return;
        }
        
        const weatherData = {
            latitude: data.features[0].center[0],
            longtitude: data.features[0].center[1],
            location: data.features[0].place_name,
        }
            
        callback(undefined, weatherData);
    }).catch(() => callback('Location bad request!', undefined));
}

module.exports = {
    geocode,
}