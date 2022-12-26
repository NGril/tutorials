// this first line is added so that VS code helps us with autocompleting Cypress code
/// <reference types="cypress" />

describe("Our first suite", () => {
  it("element locators", () => {
    // getting to the appropriate view
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // Trying out different locators
    cy.get("input");
    cy.get("#inputEmail1");
    cy.get(".input-full-width");
    cy.get("[placeholder]");
    cy.get('[placeholder="Email"]');
    cy.get('[class="input-full-width size-medium shape-rectangle"]');
    cy.get('input[placeholder="Email"]');
    cy.get('[placeholder="Email"][type="email"]');
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');
    cy.get('[data-cy="imputEmail1"]');
  });

  it("finding elements", () => {
    // getting to the appropriate view
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // finding elements examples
    cy.get("[data-cy=signInButton]");

    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    // getting to the appropriate view
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // then and wrap
    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputEmail1"]')
    //   .should("contain", "Email");

    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputPassword2"]')
    //   .should("contain", "Password");

    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputEmail1"]')
    //   .should("contain", "Email");

    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputPassword1"]')
    //   .should("contain", "Password");

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // SELENIUM - WEIRD ERRORS BECAUSE CYPRESS IS ASYNC AND SAVING VARIABLES LIKE THIS DOESN'T WORK
    // const firstForm = cy.contains("nb-card", "Using the Grid");
    // const secondForm = cy.contains("nb-card", "Basic form");

    // firstForm.find('[for="inputEmail1"]').should("contain", "Email");
    // firstForm.find('[for="inputPassword2"]').should("contain", "Password");

    // secondForm.find('[for="exampleInputEmail1"]').should("contain", "Email");
    // secondForm.find('[for="exampleInputPassword1"]').should("contain", "Password");

    ////////////////////////////////////////////////////////////////////////////////////////////////
    // CYPRESS - note that inside the then block we can't use cypress find and assert methods, but rather those are jQuery and Chai methods of the same name
    // if we want to be using the cypress methods we need to wrap the promise inside of the wrap methdd
    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();

      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      // a more complex example where we are asyncronously getting stuff inside then
      // CHECK - we can probably chain then statemens since we are working with promises
      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelFirst).to.equal(passwordLabelSecond);

        // USING THE WRAP FUNCTION
        cy.wrap(secondForm)
          .find('[for="exampleInputPassword1"]')
          .should("contain", "Password");
      });
    });
  });

  it("invoke command", () => {
    // getting to the appropriate view
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // Approach 1
    cy.get("[for=exampleInputEmail1]").should("contain", "Email address");

    // Approach 2
    cy.get("[for=exampleInputEmail1]").then((label) => {
      expect(label.text()).to.equal("Email address");
    });

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
      //   .should("contain", "checked")
      .then((classValue) => {
        expect(classValue).to.contain("checked");
      });
  });

  it("assert property", () => {
    // getting to the appropriate view
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    // assert property using invoke
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get("nb-calendar-day-picker").contains("17").click();
        cy.wrap(input).invoke("prop", "value").should("contain", "17");
      });
  });

  it("radio button", () => {
    // getting to the appropriate view
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // radio button
    cy.contains("nb-card", "Using the Grid")
      .find("[type=radio]")
      .then((radioButtons) => {
        // here we need to pass the force: true flag because the input element is actually hidden in the DOM (whole story with styling checkboxes)
        // since we have 3 radio buttons selected here we can decide which one we are talking about by using the .first() method or specifying the index with .eq(1)
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).first().should("not.be.checked");
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("checkboxes", () => {
    // getting to the appropriate view
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    // checkboxes, here we selected 3 checboxes and checked them all (if it is already checked it stays checked)
    // check is used only for checkboxes and radio buttons, where as click is universal (click will work as a toggle for them)
    cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="checkbox"]').eq(0).check({ force: true });
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
  });

  it("lists and dropdowns", () => {
    // getting to the appropriate view
    cy.visit("/");

    // first way
    // cy.get('nav nb-select').click();
    // cy.get('.options-list').contains('Dark').click();
    // cy.get('nav nb-select').should('contain', 'Dark');
    // cy.get('nb-layout-header nav').should('have.css', 'background-color' , 'rgb(34, 43, 69)');

    // second way
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

        // note that we have to use click if our dropdown is not defined within the <select></select> tags
        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );

        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it("web tables", () => {
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

  it("date pickers", () => {
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
        cy.wrap(input).should("have.value", dateAssert);
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
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click();
          }
        });

      return dateAssert;
    }
  });

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
    cy.on('window:confirm', stub);
    cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
    });

    // if we don't want cypress to automatically confirm the dialog box (popup)
    cy.get("tbody tr").first().find(".nb-trash").click();
    cy.on('window:confirm', (confirm) => false);

  });
});
