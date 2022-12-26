// here we are showing how the event queue works only when the execution stack gets empty
// this means that if we click on the page when while the long running function is still executing the clickHandler will get
//  processed only after the entire execution stack is empty (which means after the 'finished execution' console.log)

// long running function
function waitThreeSeconds() {
  var ms = 3000 + new Date().getTime();
  while (new Date() < ms) {}
  console.log("finished function");
}

function clickHandler() {
  console.log("click event!");
}

// listen for the click event
document.addEventListener("click", clickHandler);

waitThreeSeconds();
console.log("finished execution");
