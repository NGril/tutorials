# Web testing

**Types of tests**:

- **unit tests**
  - test one unit of code in isolation
- **integration tests**
  - test how do multiple units work together
- **functional tests**
  - test a specific application functionality
- **acceptance / end to end (E2E) tests**
  - uses an actual browser and sever (Cypress, Selenium)

## React Testing Library and Jest

<details>
<summary>Click to expand / collapse...</summary>
<hr />

### Basics

<details>
<summary>Click to expand / collapse...</summary>
<hr />

#### React Testing Library vs Jest

- **React Testing Library** provides the virtual DOM and utilities for tests
  - things like:
    - rendering components into the virtual DOM
    - searching the virtual DOM
    - interacting with the virtual DOM
    - it needs a test runner for finding and running tests and also making assertions
- **Jest** is a test runner which:
  - finds tests
  - runs tests
  - determines whether tests pass or fail
  - has the option to be ran in watch mode

#### Jest

- uses a global **`test`** method with 2 arguments:

  - a string description (test name)
  - test function - which passes if there are no errors

- we can also use the `describe` method to group multiple tests

- **assertions**:
  - example: `expect(linkElement).toBeInTheDocument()`
    - `expect` - Jest global, starts the assertion, takes in the argument
    - `toBeInTheDocument`, `toBe`, `toHaveLength`... - types of matchers

**jest-dom**:

- comes with `create-react-app`
- configured in the `setupTests.js` file, [here](./jest-and-react-testing-library-tutorial/1_color_button/src/setupTests.js)
- allows us to use DOM-based matchers
- their docs can be found **[here](https://github.com/testing-library/jest-dom)**

#### React testing library

Accessibility - **[which query should I use?](https://testing-library.com/docs/queries/about/#priority)**

- when using `getByRole`, which is the most preferred query type (because of screen reader support), **[these docs](https://www.w3.org/TR/wai-aria/#role_definitions)** should be useful.

- if we accidentally write the wrong role testing library will complain and will tell us the available role
- the preferred testing philosophy of _React testing library_ is to write functional tests

#### When to write unit tests

- if we have a function that is used by several components
- if the function logic is to difficult to test via functional tests
- if there are too many edge cases for the result of the function
- if we want to be able to determine what caused functional tests to fail (because funtional tests are higher level)

#### Test examples

- examples can be found [here](./jest-and-react-testing-library-tutorial/1_color_button/src/App.test.js)

</details>

### ESLint and Prettier with Testing Library

<details>
<summary>Click to expand / collapse...</summary>
<hr />

- ESLint - popular static linter for JavaScript
  - there are plugins for testing library and jest-dom
- Prettier - automatically formats the code

- Github pages for eslint plugins:

  - [testing-library](https://github.com/testing-library/eslint-plugin-testing-library)
  - [jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom)

- Preferred rules and plugins from the author: [here](https://github.com/bonnie/bonniedotdev/blob/master/client/.eslintrc.json)

- basic example in our project:

  - [eslint](./jest-and-react-testing-library-tutorial/1_color_button/.vscode/settings.json)
  - [prettier, vscode settings](./jest-and-react-testing-library-tutorial/1_color_button/.vscode/settings.json)

- setup steps:
  - `npm install eslint-plugin-testing-library eslint-plugin-jest-dom`
  - remove `eslintConfig` from `package.json`
  - create `.eslintrc.json` and add standard config
  - add `.eslintcache` and `.vscode` to `.gitignore`
  - create `.vscode/settings.json` and add standard config
  - test that it works

</details>

### User event testing

<details>
<summary>Click to expand / collapse...</summary>
<hr />

Different user event methods (other than `fireEvent`) can be found in the **[docs](https://github.com/testing-library/user-event)**

</details>

### Screen query methods

<details>
<summary>Click to expand / collapse...</summary>
<hr />

The structure of testing library query methods is the following: `command[All]ByQueryType`

- **command**

  - `get` - expect element to be in the DOM
  - `query` - expect element _not_ to be in the DOM
  - `find` - expect element to appear async

- **[All]**

  - if we exclude this option then we are expecting only one match
  - if we include it we are expecting an array of matches

- **QueryType**

  - `Role` - most preferred
  - `AltText` - images
  - `Text` - display elements
  - Form elements:
    - `PlaceholderText`
    - `LabelText`
    - `DisplayValue`

- `screen` query documentation links:
  - [Queries](https://testing-library.com/docs/queries/about)
  - [Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
  - [Which query to use?](https://testing-library.com/docs/queries/about/#priority)

**Not wrapped in act(...) warning:**

- this means that React updated some element after the test was finished
- **don't follow the advice** to wrap the function in `act(...)`
  - testing library already does this for us
- the same often happens if we have an error that we are updating state on an unmounted component
- to remedy this error we need to:
  - determine what changes after the test is over (async)
  - account for the change in test by:
    - awaiting the change
    - asserting on it
    - example can be found in this **[file](./jest-and-react-testing-library-tutorial/2_sundaes_on_demand/client/src/summary/test/SummaryForm.test.jsx)**
- almost always when we are using some async function we need to use `await findBy` in
- the same

</details>

### Mocking server responses with Mock Service Worker

<details>
<summary>Click to expand / collapse...</summary>
<hr />

**Mock Service Worker:**

- **[docs](https://mswjs.io/docs/)**
- purpose:
  - intercept network calls and return specified responses
  - prevent network calls during tests
  - set up test conditions using server response
- setup:

  - `npm install msw`
  - create handlers (mocking conditions) - **[example](./jest-and-react-testing-library-tutorial/2_sundaes_on_demand/client/src/mocks/handlers.js)**
  - create test server:
    - **[docs](https://mswjs.io/docs/getting-started/integrate/node)**
    - **[example](./jest-and-react-testing-library-tutorial/2_sundaes_on_demand/client/src/mocks/server.js)**
  - make sure test server listens during all tests
    - reset the handler after each test
    - **[example](jest-and-react-testing-library-tutorial/2_sundaes_on_demand/client/src/setupTests.js)**

- we can mock either REST or GraphQL requests
- we do it using a syntax like this:

  ```javascript
  rest.get("http:localhost:3030/scoops", (res, res, ctx) => {});
  ```

  - the `rest` part defines the handler type (`rest` or `graphql`)
  - `get` is the HTTP method to mock
  - the first parameter is the full URL to mock
  - the second parameter is a response resolver function (`req` is the request object, `res` is a function to create response, `ctx` is a utility to build the reponse)
  - [example in project](./jest-and-react-testing-library-tutorial/2_sundaes_on_demand/client/src/pages/entry/tests/Options.test.jsx)

- example of mocking an error response: [here](./jest-and-react-testing-library-tutorial/2_sundaes_on_demand/client/src/pages/entry/tests/OrderEntry.test.jsx)

**Bonus - passing Jest Mocks as props:**

- it is done using a jest mock function, `jest.fn()`
- it's merely a placeholder to avoid errors, it does not do anything
- [examples](./jest-and-react-testing-library-tutorial/2_sundaes_on_demand/client/src/pages/entry/tests/OrderEntry.test.jsx)

</details>

### Testing components wrapped in a provider (context or a store)

<details>
<summary>Click to expand / collapse...</summary>
<hr />

To add context to the test setup we need to add a `wrapper` option to our `render` function from testing library. The wrapper can be a React Context provider, a Redux provider, a MobX store etc. Here we created a custom render method so that we can have the wrapper by default.

- **[example](./jest-and-react-testing-library-tutorial/2_sundaes_on_demand/client/src/test-utils/testing-library-utils.jsx)**

</details>

### Debugging tips

<details>
<summary>Click to expand / collapse...</summary>
<hr />

- `screen.debug()` method can be used to print out the state of the DOM at a given point in the test
- when something is asynchronous use `await findBy*`, when we expect something to be present use `getBy`, when we expect it not to be present use `queryBy`
- don't be intimidated by the amount of error text

</details>

### Standard questions one needs to ask himself before writing tests

<details>
<summary>Click to expand / collapse...</summary>
<hr />

1. What to render?
   - What's the smallest possible component that encompasses test use cases?
2. Do we need to pass any props?
3. Do we need to wrap the component in a provider (context or store)?
   - Does the provider get used?
   - Is it alreadz wrapped within the component?
4. Where should the tests go?
   - Which file?
5. What to test?
   - what's the behavior that needs testing?
6. How to test?
   - what queries and events?
   - do we need to await, is there anything async going on?

- a nice **[article](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)** describing some common mistakes when working with React Testing library

</details>

</details>

## Cypress web automation testing

<details>
<summary>Click to expand / collapse...</summary>
<hr />

**[Cypress docs](https://www.cypress.io/)**

### Cypress vs Selenium

<details>
<summary>Click to expand / collapse...</summary>
<hr />

**Cypress pros:**

- complete framework (all dependencies installed out of the box)
- very fast (because it runs natively in the browser using JavaScript)
- more stable
- test and mock APIs
- don't need test environment

**Cypress cons:**

- no IE and Safari support
- asynchronous code
- no mobile, but mobile view
- single domain and single tab
- not friendly with iFrames

</details>

### Setting up the deveopment environment

<details>
<summary>Click to expand / collapse...</summary>
<hr />

- installing Cypress: `npm install cypress --save-dev`
- opening Cypress runner: `npx cypress open`

  - by default this command creates a basic file structure and some tests which can be run
  - the `cypress` folder at the root of our project is created
    - it containts the following: - `fixtures` - `integration` - `plugins` - `support` - it contains the `index.js` file, which is the entry point for our tests - it also contains `commands.js` which is a place for us to define all common functions which will be used in our tests (e.g. a login function)
  - the `plugins` folder contains a file in which we can include some additional functionalities (plugins) which will be added to our cypress installation
  - the `integration` folder contains all of our tests
  - the `fixtures` folder contains all of our additional test data such as mocks
  - there is also a `cypress.json` folder, created at the root of our project, which is a default configuration file for cypress

- Cypress configuration:
  - **[docs](https://docs.cypress.io/guides/references/configuration)**
  - **[example](./cypress-tutorial/1_basics/cypress.json)**
  - **[example project 1 - Github](https://github.com/Postavshik/ngx-cypress-test)**
  - **[example project 2 - Github](https://github.com/gothinkster/angular-realworld-example-app)**

</details>

### Interaction with web elements

<details>
<summary>Click to expand / collapse...</summary>
<hr />

All code examples can be found **[here](./cypress-tutorial/1_basics/cypress/integration/firstTest.spec.js)**

#### Basic DOM (Document Object Model) terminology:

It's important to understand the difference between the following:

- html element names (tags)
- html attribute names (`class` and `id` are also attribute names)
- html attribute values
- text values
- parent elements, child elements, sibling elements

#### Tests structure

- all tests need to start either with the `describe` or the `context` function (they are the same, it just comes down to syntactic preference) - they create a kind of container for singular tests
- singular tests are written using the `it` or `test` functions
- we can have multiple describes in the same file, also we can nest them (useful if we are using for example a `beforeEach`)
- **[example](./cypress-tutorial/1_basics/cypress/integration/firstTest.spec.js)**
- **a big help** is also adding this line: `/// <reference types="cypress" />` to the top of the file which uses cypress - it tells our IDE to help us with autocompleting test code

#### Types of locators

- Cypress is using the jQuery selector engine
- find element by tag name: `cy.get('input')`
- find element by id: `cy.get('#inputEmail1')`
- find element by class name: `cy.get('.input-full-width')`
- find element by attribute name: `cy.get('[placeholder]')`
- find element by attribute name and value: `cy.get('[placeholder="Email"]')`
- find element by class value (note that we need to provide all class values in order for this to work - if we omit one it won't work correctly): `cy.get('[class="input-full-width size-medium shape-rectangle"]')`
- by multiple elements (tag name and attribute with value): `cy.get('input[placeholder="Email"]')`
- by multiple elements (two different attributes): `cy.get('[placeholder="Email"][type="email"]')`
- by multiple elements (tag name, attribute with value, ID and class name): `cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')`
- the most recommended way by Cypress (by creating our own attributes): `cy.get('[data-cy="imputEmail1"]')`

- to run the application we need to execture: `cy.visit('/')` (because we specified the baseUrl in the config [here](./cypress-tutorial/cypress.json) it is enough just to specify a `/` for the path)
- after that we navigate to the screen which contains our element
- **[example](./cypress-tutorial/1_basics/cypress/integration/firstTest.spec.js)**

#### Finding web elements

As stated above, the best way to select web elements in Cypress is to add custom attributes to them because that is completely in our control. Other than selecting by attribute and using `cy.get()` we can use `cy.contains()`.

**Examples**:

`cy.contains('Sign in')` => finds the first element that matches the content
`cy.contains('[status="warning"]', 'Sign in')` => finding by attribute and content

```javascript
cy.get("#inputEmail3").parents("form").find("button").should("contain", "Sign in");
```

- traversing through the DOM, notice that we need to use the `find` method in this case, `get` won't work correctly
- **`find` method** is used only to find child elements inside parent elements
- **`get`** on the other hand searches for elements in the entire DOM
- **`parents`** is used to find parent elements relative to the currently selected element

```javascript
cy.get("#inputEmail3")
  .parents("form")
  .find("button")
  .should("contain", "Sign in")
  .parents("form")
  .find("nb-checkbox")
  .click();
```

- chaining events example

`cy.contains('nb-card', 'Horizontal form').find('[type="email"]')` => shorthand, here we are looking for an `nb-card` element which contains the text `Horizontal form` (even though the text is located inside its child, `nb-card-header`, element), and then once we have the card we are using the `find` method to locate the child element with attribute value `type="email"` which is an input located inside the `nb-card-body` element

- **[example](./cypress-tutorial/1_basics/cypress/integration/firstTest.spec.js)**

#### Saving the subject of a command, then and wrap methods

Cypress is asyncronous and saving variables doesn't work as you'd expect. Basically we need to use promises and the `then` function to save variables, and wrap the promise with the `wrap` function if we want to use Cypress methods on them.

Example (wrong):

```javascript
// SELENIUM - WEIRD ERRORS BECAUSE CYPRESS IS ASYNC AND SAVING VARIABLES LIKE THIS DOESN'T WORK
const firstForm = cy.contains("nb-card", "Using the Grid");
const secondForm = cy.contains("nb-card", "Basic form");

firstForm.find('[for="inputEmail1"]').should("contain", "Email");
firstForm.find('[for="inputPassword2"]').should("contain", "Password");

secondForm.find('[for="exampleInputEmail1"]').should("contain", "Email");
secondForm.find('[for="exampleInputPassword1"]').should("contain", "Password");
```

Example (correct):

```javascript
// CYPRESS - note that inside the then block we can't use cypress find and assert methods, but rather those are jQuery and Chai methods of the same name
// if we want to be using the cypress methods we need to wrap the promise inside of the wrap methdd
cy.contains("nb-card", "Using the Grid").then((firstForm) => {
  const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
  const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();

  expect(emailLabelFirst).to.equal("Email");
  expect(passwordLabelFirst).to.equal("Password");

  // a more complex example where we are asyncronously getting stuff inside then
  // CHECK - we can probably chain then statemens since we are working with promises
  cy.contains("nb-card", "Basic form").then((secondForm) => {
    const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text();
    expect(passwordLabelFirst).to.equal(passwordLabelSecond);

    // USING THE WRAP FUNCTION
    cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should("contain", "Password");
  });
});
```

#### Invoke command

Previous approaches:

```javascript
// Approach 1
cy.get("[for=exampleInputEmail1]").should("contain", "Email address");

// Approach 2
cy.get("[for=exampleInputEmail1]").then((label) => {
  expect(label.text()).to.equal("Email address");
});
```

Invoke command examples for extracting some info:

```javascript
// Approach 3 - INVOKE COMMAND
cy.get("[for=exampleInputEmail1]")
  .invoke("text")
  .then((text) => {
    expect(text).to.equal("Email address");
  });

cy.contains("nb-card", "Basic form")
  .find("nb-checkbox")
  .click()
  .find(".custom-checkbox")
  .invoke("attr", "class")
  // .should("contain", "checked");
  .then((classValue) => {
    expect(classValue).to.contain("checked");
  });
```

Invoke command example for asserting properties:

```javascript
// assert property using invoke
cy.contains("nb-card", "Common Datepicker")
  .find("input")
  .then((input) => {
    cy.wrap(input).click();
    cy.get("nb-calendar-day-picker").contains("17").click();
    cy.wrap(input).invoke("prop", "value").should("contain", "17");
  });
```

#### Checkboxes and radio buttons

Cypress uses a special command to work with these elements => `check`.

**Radio buttons:**

```javascript
// radio button
cy.contains("nb-card", "Using the Grid")
  .find("[type=radio]")
  .then((radioButtons) => {
    // here we need to pass the force: true flag because the input element is actually hidden in the DOM (whole story with styling checkboxes)
    // since we have 3 radio buttons selected here we can decide which one we are talking about by using the .first() method or specifying the index with .eq(1)
    cy.wrap(radioButtons).first().check({ force: true }).should("be.checked");
    cy.wrap(radioButtons).eq(1).check({ force: true });
    cy.wrap(radioButtons).first().should("not.be.checked");
    cy.wrap(radioButtons).eq(2).should("be.disabled");
  });
```

**Checkboxes:**

```javascript
// checkboxes, here we selected 3 checboxes and checked them all (if it is already checked it stays checked)
// check is used only for checkboxes and radio buttons, where as click is universal (click will work as a toggle for them)
cy.get('[type="checkbox"]').check({ force: true });
cy.get('[type="checkbox"]').eq(0).check({ force: true });
cy.get('[type="checkbox"]').eq(0).click({ force: true });
```

#### Lists and dropdowns:

```javascript
cy.get("nav nb-select").then((dropdown) => {
  cy.wrap(dropdown).click();

  // by using the Cypress .each method we can loop through different list options
  cy.get(".options-list nb-option").each((listItem, index) => {
    const itemText = listItem.text().trim();
    const colors = {
      Light: "rgb(255, 255, 255)",
      Dark: "rgb(34, 43, 69)",
      Cosmic: "rgb(50, 50, 89)",
      Corporate: "rgb(255, 255, 255)",
    };

    // note that we have to use .click() if our dropdown is not defined within the <select></select> tags
    // if it was we could've used the .select() method
    cy.wrap(listItem).click();
    cy.wrap(dropdown).should("contain", itemText);
    cy.get("nb-layout-header nav").should("have.css", "background-color", colors[itemText]);

    if (index < 3) {
      cy.wrap(dropdown).click();
    }
  });
});
```

#### Web tables

```javascript
it.only("web tables", () => {
  // getting to the appropriate view
  cy.visit("/");
  cy.contains("Tables & Data").click();
  cy.contains("Smart Table").click();

  // web tables
  // edit functionality
  cy.get("tbody")
    .contains("tr", "Larry")
    .then((tableRow) => {
      cy.wrap(tableRow).find(".nb-edit").click();
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
      cy.wrap(tableRow).find(".nb-checkmark").click();
      // because there were no unique identifiers for the column we were looking for, we found it by index here
      cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
    });

  // adding functionality
  cy.get("thead").find(".nb-plus").click();
  // because there were no unique identifiers for the row we were looking for, we found it by index here
  cy.get("thead")
    .find("tr")
    .eq(2)
    .then((tableRow) => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type("Niko");
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Gril");
      cy.wrap(tableRow).find(".nb-checkmark").click();
    });

  cy.get("tbody tr")
    .first()
    .find("td")
    .then((tableColumns) => {
      cy.wrap(tableColumns).eq(2).should("contain", "Niko");
      cy.wrap(tableColumns).eq(3).should("contain", "Gril");
    });

  // search functionality
  const age = [20, 30, 40, 200];

  cy.wrap(age).each((age) => {
    cy.get('thead [placeholder="Age"]').clear().type(age);
    // here we need to wait a bit for filtering to be applied
    cy.wait(500);
    cy.get("tbody tr").each((tableRow) => {
      if (age === 200) {
        cy.wrap(tableRow).should("contain", "No data found");
      } else {
        cy.wrap(tableRow).find("td").eq(6).should("contain", age);
      }
    });
  });
});
```

#### Web date pickers

```javascript
it.only("date pickers", () => {
  // getting to the appropriate view
  cy.visit("/");
  cy.contains("Forms").click();
  cy.contains("Datepicker").click();

  // working with dates
  cy.contains("nb-card", "Common Datepicker")
    .find("input")
    .then((input) => {
      cy.wrap(input).click();
      const dateAssert = selectDayFromCurrent(5);
      cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
    });

  // helper function for selecting the date
  function selectDayFromCurrent(daysFromCurrent) {
    let date = new Date();
    date.setDate(date.getDate() + daysFromCurrent);
    let futureDay = date.getDate();
    let futureMonth = date.toLocaleString("default", { month: "short" });
    let dateAssert = `${futureMonth} ${futureDay}, ${date.getFullYear()}`;

    cy.get("nb-calendar-navigation")
      .invoke("attr", "ng-reflect-date")
      .then((dateAttribute) => {
        if (!dateAttribute.includes(futureMonth)) {
          cy.get('[data-name="chevron-right"]').click();
          // here we are recursively calling this function, effectively calling a while loop
          selectDayFromCurrent(daysFromCurrent);
        } else {
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click();
        }
      });

    return dateAssert;
  }
});
```

#### Popups, tooltips, dialog boxes

```javascript
it("tooltip", () => {
  // getting to the appropriate view
  cy.visit("/");
  cy.contains("Modal & Overlays").click();
  cy.contains("Tooltip").click();

  cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
  cy.get("nb-tooltip").should("contain", "This is a tooltip");
});

it("browser window popup", () => {
  // getting to the appropriate view
  cy.visit("/");
  cy.contains("Tables & Data").click();
  cy.contains("Smart Table").click();

  // browser window popup - tricky because it's not part of our window, and cuz Cypress confirms it automatically
  cy.get("tbody tr").first().find(".nb-trash").click();

  // this is a workaround with which we can confirm that the on confirm popup was present with a given text
  const stub = cy.stub();
  cy.on("window:confirm", stub);
  cy.get("tbody tr")
    .first()
    .find(".nb-trash")
    .click()
    .then(() => {
      expect(stub.getCall(0)).to.be.calledWith("Are you sure you want to delete?");
    });

  // if we don't want cypress to automatically confirm the dialog box (popup)
  cy.get("tbody tr").first().find(".nb-trash").click();
  cy.on("window:confirm", (confirm) => false);
});
```

#### Cypress assertions

Cypress is using Chai assertions. More can be found in **[docs](https://docs.cypress.io/guides/references/assertions#BDD-Assertions)**. Note that some of these are much better and more type safe than the ones found in our code examples, which means that they should be the ones to be used in the future.

</details>

### Page object design pattern

<details>
<summary>Click to expand / collapse...</summary>
<hr />

If there are some actions that are repeting for each test we can put them inside the `beforeEach()` hook, **[example](./cypress-tutorial/1_basics/cypress/integration/testWithPageObjects.js)**.
In the linked example we can also see how clean it is to navigate between different pages if that logic is extracted to a helper like **[this](./cypress-tutorial/1_basics/cypress/support/page_objects/navigationPage.js)** (notice that it is placed in the `support` folder).

All of this is an example of the **page object pattern**. Notice how much more readable **[these tests](./cypress-tutorial/1_basics/cypress/integration/testWithPageObjects.js)** are in comparison to the **[first approach](./cypress-tutorial/1_basics/cypress/integration/firstTest.spec.js)** we had.

**BONUS - custom commands:**

Custom commands are defined within the `commands.js` file within the `support` folder, **[here](./cypress-tutorial/1_basics/cypress/support/commands.js)**. They are reusable pieces of code which can be used across different test files. More info can be found in **[Cypress docs](https://docs.cypress.io/api/cypress-api/custom-commands)**.

</details>

### Working with APIs

<details>
<summary>Click to expand / collapse...</summary>
<hr />

#### API listening and interception

- listening is done by using the `cy.intercept()` method
  - there are also a couple of deprecated methods used in previous versions of Cypress (<6) like: `cy.route`, `cy.route2` and `cy.server` which can be rewritten to use the new method, **[example](./cypress-tutorial/2_working_with_APIs/cypress/integration/firstTest.spec.js)**
  - basically here we are listening on the request using Cypress and then asserting the request and response
    - the steps to achieve this include:
      - initializing the server with `cy.server()` command
      - listening on the requests using the `cy.route` in combination with Cypress aliases
      - interacting with web elements to achieve our use case
      - waiting on the server response by using `cy.wait()` and passing the alias name prefixed with `@` to it
      - getting the alias by name (xhr request) and asserting what we need from it

```javascript
it("verify correct request and response - listening example", () => {
  // creating the server and listening to requests (the old way)

  // OLD WAY
  // cy.server();
  // cy.route("POST", "**/articles").as("postArticles"); // here we are providing the name of the alias

  // NEW WAY
  cy.intercept("POST", "**/articles").as("postArticles"); // here we are providing the name of the alias

  // use case
  cy.contains("New Article").click();
  cy.get('[formcontrolname="title"]').type("This is the title");
  cy.get('[formcontrolname="description"]').type("This is the article description");
  cy.get('[formcontrolname="body"]').type("This is the article body");
  cy.contains("Publish Article").click();

  // await and assert
  cy.wait("@postArticles"); // here we are using the alias
  cy.get("@postArticles").then((xhr) => {
    //   expect(xhr.status).to.equal(200); OLD
    expect(xhr.response.statusCode).to.equal(200);
    expect(xhr.request.body.article.body).to.equal("This is the article body");
    expect(xhr.response.body.article.description).to.equal("This is the article description");
  });
});
```

#### API mocking

- the best place to keep JSON files for mock responses is the fixtures folder, **[here](cypress-tutorial/2_working_with_APIs/cypress/fixtures/tags.json)**
- mocks are created by providing the third argument to the `cy.route` method - it can be a file from fixtures or a normal JSON string

```javascript
it("verify global feed likes count - another mocking example", () => {
  // OLD WAY
  // example of directly providing the mock JSON object
  // cy.route("GET", "**/articles/feed*", '{"articles":[],"articlesCount":0}');
  // example of providing the mock JSON object through a separate file
  // cy.route("GET", "**/articles*", "fixture:articles.json");

  // NEW WAY
  // example of directly providing the mock JSON object
  // notice that here we provide an object for the stub response (instead of a string like in the old way)
  cy.intercept("GET", "**/articles/feed*", {
    articles: [],
    articlesCount: 0,
  });
  // example of providing the mock JSON object through a separate file
  // notice the still retarded, but a bit less syntax for providing the file
  cy.intercept("GET", "**/articles*", { fixture: "articles.json" });

  cy.contains("Global Feed").click();

  cy.get("app-article-list button").then((listOfButtons) => {
    expect(listOfButtons[0]).to.contain("1");
    expect(listOfButtons[1]).to.contain("5");
  });

  // getting the file from the fixtures folder example
  cy.fixture("articles").then((file) => {
    const articleLink = file.articles[1].slug;
    // OLD WAY
    // cy.route("POST", `**/articles/${articleLink}/favorite`, file);
    cy.intercept("POST", `**/articles/${articleLink}/favorite`, file);
  });

  cy.get("app-article-list button").eq(1).click().should("contain", 6);
});
```

### Other `cy.intercept` features:

**[Cypress docs](https://docs.cypress.io/api/commands/intercept)**

- we can provide request matchers and router handlers as the arguments (much more info in docs)

```javascript
// simple example of request matcher (first argument), and router handler (second argument)
cy.intercept({ method: "Get", path: "tags" }, { fixture: "tags.json" });
```

- we can intercept requests:

```javascript
it.only("intercepting requests example", () => {
  // intercepting requests
  // NOTICE THAT THE FINAL VALUE OF THE DESCRIPTION WON'T BE WHAT WE TYPED, BUT THAT THE VALUE WAS MODIFIED WHEN THE REQUEST WAS INTERCEPTED
  // cy.intercept("POST", "**/articles", (req) => {
  //   req.body.article.description = "This is an intercepted description value";
  // }).as("postArticles");

  // intercepting and modyfing the response
  // NOTICE THAT THE FINAL VALUE OF THE BODY WON'T BE WHAT WE TYPED, BUT THAT THE VALUE WAS MODIFIED WHEN THE RESPONSE WAS INTERCEPTED
  cy.intercept("POST", "**/articles", (req) => {
    req.reply((res) => {
      expect(res.body.article.body).to.equal("This is the article body");
      res.body.article.body = "This is an intercepted response body value";
    });
  }).as("postArticles");

  // use case
  cy.contains("New Article").click();
  cy.get('[formcontrolname="title"]').type("This is the title");
  cy.get('[formcontrolname="description"]').type("This is the article description");
  cy.get('[formcontrolname="body"]').type("This is the article body");
  cy.contains("Publish Article").click();

  // await and assert
  cy.wait("@postArticles"); // here we are using the alias
  cy.get("@postArticles").then((xhr) => {
    //   expect(xhr.status).to.equal(200); OLD
    expect(xhr.response.statusCode).to.equal(200);

    //   // asserting request description (intercepted value)
    //   expect(xhr.request.body.article.description).to.equal(
    //     "This is an intercepted description value"
    //   );

    // asserting request body
    expect(xhr.request.body.article.body).to.equal("This is the article body");
    // asserting response body (intercepted value)
    expect(xhr.response.body.article.body).to.equal("This is an intercepted response body value");
  });
});
```

</details>

</details>
