const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const weatherstackApiKey = "write your api key here";
  const coordinates = `${latitude},${longitude}`;
  const metric = "m";
  const weatherstackUrl = `http://api.weatherstack.com/current?access_key=${weatherstackApiKey}&query=${coordinates}&units=${metric}`;

  request({ url: weatherstackUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to network!");
      return;
    }

    // works similarly to fetch - 400 and 500 are not treated as errors
    if (body.error) {
      callback("Unable to find location!");
      return;
    }

    const currentWeatherData = body.current;
    callback(undefined, currentWeatherData);
  });
};

module.exports = { forecast };
