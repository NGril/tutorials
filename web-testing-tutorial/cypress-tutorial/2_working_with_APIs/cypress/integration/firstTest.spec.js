// this first line is added so that VS code helps us with autocompleting Cypress code
/// <reference types="cypress" />

describe("Test with backend", () => {
  beforeEach("login to the app", () => {
    // old way, example of mocking the response
    // notice the retarded syntax for providing the response file

    // OLD WAY
    // cy.server();
    // cy.route("GET", "**/tags", "fixture:tags.json");

    // NEW WAY
    // notice the still retarded, but a bit less syntax for providing the file
    // cy.intercept("GET", "**/tags", { fixture: "tags.json" });
    // new intercept method with request matcher
    cy.intercept({ method: "Get", path: "tags" }, { fixture: "tags.json" });

    cy.loginToApplication();
  });

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
    cy.get('[formcontrolname="description"]').type(
      "This is the article description"
    );
    cy.get('[formcontrolname="body"]').type("This is the article body");
    cy.contains("Publish Article").click();

    // await and assert
    cy.wait("@postArticles"); // here we are using the alias
    cy.get("@postArticles").then((xhr) => {
      //   expect(xhr.status).to.equal(200); OLD
      expect(xhr.response.statusCode).to.equal(200);
      expect(xhr.request.body.article.body).to.equal(
        "This is the article body"
      );
      expect(xhr.response.body.article.description).to.equal(
        "This is the article description"
      );
    });
  });

  it("should give tags with routing object - mocking example", () => {
    cy.get(".tag-list")
      .should("contain", "cypress")
      .should("contain", "automation")
      .should("contain", "testing");
  });

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
    cy.get('[formcontrolname="description"]').type(
      "This is the article description"
    );
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
      expect(xhr.request.body.article.body).to.equal(
        "This is the article body"
      );
      // asserting response body (intercepted value)
      expect(xhr.response.body.article.body).to.equal(
        "This is an intercepted response body value"
      );
    });
  });
});
