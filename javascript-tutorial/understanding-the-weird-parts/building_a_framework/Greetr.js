// wrap everything in an IFEE (safe code)
(function (global, $) {
  // wrapping the initialization of an object into a function so we don't have to write 'new' anywhere in code when using Greetr
  var Greetr = function (firstName, lastName, language) {
    // 'this' within the Greeter.init function will point to the empty object created by 'new'
    return new Greetr.init(firstName, lastName, language);
  };

  // DATA NEEDED WITHIN THE FUNCTION WHICH IS NOT EXPOSED OUTSIDE
  var supportedLangs = ["en", "es"];

  var greetings = {
    en: "Hello",
    es: "Hola",
  };

  var formalGreetings = {
    en: "Greetings",
    es: "Saludos",
  };

  var logMessages = {
    en: "Logged in",
    es: "Iniciar sesión",
  };

  // this way the code is nicer
  // we add functionalities to the prototype
  Greetr.prototype = {
    fullName: function () {
      return this.firstName + " " + this.lastName;
    },

    validate: function () {
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid language";
      }
    },

    greeting: function () {
      return greetings[this.language] + " " + this.firstName + "!";
    },

    formalGreeting: function () {
      return formalGreetings[this.language] + ", " + this.fullName() + "!";
    },

    greet: function (formal) {
      var msg;

      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },

    log: function () {
      if (console) {
        console.log(logMessages[this.language] + ": " + this.fullName());
      }

      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },

    setLang: function (lang) {
      this.language = lang;

      this.validate();

      return this;
    },

    // JQUERY SUPPORT IN HERE
    HTMLGreeting: function (selector, formal) {
      if (!$) {
        throw "jQuery not loaded";
      }

      if (!selector) {
        throw "Missing jQuery selector";
      }

      var msg;
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      // jQuery selects the element and adds the message into the html
      // TODO add validation
      $(selector).html(msg);

      return this;
    },
  };

  // it's okay that this is bellow Greetr because Greetr is not called yet
  Greetr.init = function (firstName, lastName, language) {
    // self trick so we don't have to worry about where this is pointing later
    var self = this;

    self.firstName = firstName || "";
    self.lastName = lastName || "";
    self.language = language || "en";

    self.validate();
  };

  // making all objects created by the Greetr.init point to the Greetr.prototype
  Greetr.init.prototype = Greetr.prototype;

  // attaching the Greetr to the global object (window)
  // G$ is just an alias
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
