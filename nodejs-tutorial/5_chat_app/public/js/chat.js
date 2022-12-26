const socket = io();

// Elements
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");

const $shareLocationButton = document.querySelector("#send-location");

const $messages = document.querySelector("#messages");

const $sidebar = document.querySelector("#sidebar");

// Templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationTemplate = document.querySelector("#location-template").innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

// Options - using the QS library to parse query strings
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// autoscrolling helper function
const autoscroll = () => {
  // get new message element
  const $newMessage = $messages.lastElementChild;

  // get height of new message
  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // visible height
  const visibleHeight = $messages.offsetHeight;

  // messages container height
  const containerHeight = $messages.scrollHeight;

  // how far have I scrolled - how far from the bottom are we?
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight < scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

// Event handlers
socket.on("message", (message) => {
  console.log(message.text);

  // render the message on screen
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    // using the momentjs library to nicely format the date
    createdAt: moment(message.createdAt).format("HH:mm"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("locationMessage", (locationMessage) => {
  console.log(locationMessage);

  // render the location link
  const html = Mustache.render(locationTemplate, {
    username: locationMessage.username,
    url: locationMessage.url,
    createdAt: moment(locationMessage.createdAt).format("HH:mm"),
  });
  $messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });
  $sidebar.innerHTML = html;
});

// Button event listeners
$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // disable form submit
  $messageFormButton.setAttribute("disabled", "disabled");

  // getting the form element by its name
  const message = e.target.elements.message.value;

  // notice the event acknowledgement as well
  socket.emit("sendMessage", message, (error) => {
    // re-enable form submit
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();

    if (error) {
      return console.log(error);
    }

    console.log("Message delivered");
  });
});

// we are using the MDN Geolocation API https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
$shareLocationButton.addEventListener("click", () => {
  $shareLocationButton.setAttribute("disabled", "disabled");

  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("sendLocation", { latitude, longitude }, () => {
      $shareLocationButton.removeAttribute("disabled");
      console.log("Location shared!");
    });
  });
});

// emitting room join events (with an acknowledgement function)
socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
