const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const getWeatherData = (location) => {
  fetch(`/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        return;
      }

      console.log(data);
      messageOne.textContent = data.location;
      messageTwo.textContent = `${data.temperature}\u00B0 ${data.weather_descriptions[0]}`;
    });
};

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = "";
  messageTwo.textContent = "";

  const location = search.value;

  if (!location) {
    messageOne.textContent = "Please provide a location!";
    return;
  }

  messageOne.textContent = "Loading...";

  getWeatherData(location);
});
