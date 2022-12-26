const request = require("request");

const geocode = (address, callback) => {
  const mapboxApiKey = "Write your api key here";
  const searchTerm = encodeURIComponent(address);
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTerm}.json?access_token=${mapboxApiKey}`;

  request({ url: mapboxUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to geocoding service!");
      return;
    }

    if (body.features.length === 0) {
      callback("Unable to resolve geolocation!");
      return;
    }

    const latitude = body.features[0].center[1];
    const longitude = body.features[0].center[0];
    const location = body.features[0].place_name;
    callback(undefined, { latitude, longitude, location });
  });
};

module.exports = { geocode };
