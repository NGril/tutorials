// in ES6 we don't really need to use IIFEs because of block scoping of const and let, it's enough to just everything within a block using {}
// be careful as function statements are not block scoped (if we defined useGreetr as a function statement we would be able to access it outside)
{
  const useGreetr = (global, selectorLib) => {
    // PRIVATE DATA - needed within the lib but not exposed outside
    const supportedLangs = ["en", "es"];
    const greetings = {
      en: "Hello",
      es: "Hola",
    };
    const formalGreetings = {
      en: "Greetings",
      es: "Saludos",
    };
    const logMessages = {
      en: "Logged in",
      es: "Iniciar sesión",
    };

    // GREETR CLASS - properties and methdos
    class Greetr {
      constructor(firstName = "", lastName = "", language = "en") {
        this.firstName = firstName;
        this.lastName = lastName;
        this.language = language;
      }

      fullName() {
        return `${this.firstName} ${this.lastName}`;
      }

      validate() {
        if (!supportedLangs.includes(this.language)) {
          throw "Invalid language";
        }
      }

      greeting() {
        return greetings[this.language] + " " + this.firstName + "!";
      }

      formalGreeting() {
        return `${formalGreetings[this.language]}, ${this.fullName()}!`;
      }

      greet(formal) {
        console.log(formal ? this.formalGreeting() : this.greeting());

        // 'this' refers to the object which is invoking the method at execution time
        // returning `this` enables us to use method chaining
        return this;
      }

      log() {
        console.log(`${logMessages[this.language]}: ${this.fullName()}`);

        // 'this' refers to the object which is invoking the method at execution time
        // returning `this` enables us to use method chaining
        return this;
      }

      setLang(lang) {
        this.language = lang;
        this.validate();

        // 'this' refers to the object which is invoking the method at execution time
        // returning `this` enables us to use method chaining
        return this;
      }

      HTMLGreeting(selector, formal) {
        if (!selectorLib) {
          throw "selector lib not loaded";
        }

        if (!selector) {
          throw "missing selector";
        }

        const msg = formal ? this.formalGreeting() : this.greeting();
        $(selector).html(msg);

        // 'this' refers to the object which is invoking the method at execution time
        // returning `this` enables us to use method chaining
        return this;
      }
    }

    // INIT FUNCTION - wrapping initialization in a function so we don't have to use 'new' in code
    const greetrInit = (firstName, lastName, language) => {
      return new Greetr(firstName, lastName, language);
    };

    // ATTACHING THE INIT FUNCTION TO THE GLOBAL OBJECT -  it can be called with Greetr() or G$()
    global.Greetr = global.G$ = greetrInit;
  };

  // calling the function and setting the global object to window and using jQuery as the selector library
  useGreetr(window, jQuery);
}
