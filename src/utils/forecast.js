const axios = require('axios');
const { WEATHER_ACCESS_KEY } = require('./access-key');

const forecast = (longtitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current';
    const params = {
        access_key: WEATHER_ACCESS_KEY,
        query: `${latitude},${longtitude}`,
    };

    axios.get(url, {params}).then(({data}) => {
        if (data.error) {        
            callback('Request failed! Location not found!');
            return;
        }

        const {temp, feelslike} = ({
            temp: data.current.temperature, 
            feelslike: data.current.feelslike
        });

        const description = data.current.weather_descriptions[0];
        const message = `It is currently ${temp} degrees out. It feels like ${feelslike} degrees out`;
        
        callback(undefined, `${description}. ${message}`);
    }).catch(() => callback('Weather bad request!', undefined));
}

module.exports = {
    forecast,
}