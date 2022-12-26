// creates a new object (notice that we don't have to use new because of how we written our code)
var g = G$("John", "Doe");

// showing chainable methods
g.greet().setLang("es").greet(true).log();

// let's use our object on the click event of a login button
$("#login").click(function () {
  // creating an object
  var loginGrtr = G$("John", "Doe");

  // hiding the form
  $("#logindiv").hide();

  // setting the language to the one selected, setting the value of the HTML within the #greeting element
  loginGrtr.setLang($("#lang").val()).HTMLGreeting("#greeting", true).log();
});
