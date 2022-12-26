// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// in order for this to work first we need to register this user
// Niko123
// gril.niko@gmail.com
// pass12345
Cypress.Commands.add('loginToApplication', () => {
    cy.visit('/login');
    cy.get('[placeholder="Email"]').type("gril.niko@gmail.com");
    cy.get('[placeholder="Password"]').type("pass12345");
    cy.get('form').submit();
})

