// this showcases how we can make http requests natively within Node.js, without using a 3rd party package

// note that Node.js uses separate modules for http and https protocols

const http = require("http");

const url = `http://api.weatherstack.com/current?access_key=cb748a1fa62aba829288039acb483612&query=45.45,45.45`;

const request = http.request(url, (response) => {
  // this works on a much lower level, and we need to handle each individual chunk of data that is received
  let data = "";

  response.on("data", (chunk) => {
    data += chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

// Error handling
request.on("error", (error) => {
  console.log("An error occured: ", error);
});

// to actually fire the request we need to do this
request.end();
