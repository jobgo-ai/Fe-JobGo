describe("signup", () => {
  it("Visits the signup page", () => {
    cy.visit("/signup?email=iamtest@test.com");
  });

  it("Email is passed through", () => {
    cy.visit("/signup?email=iamtest@test.com");
    cy.get(`[name='email']`).should("have.value", "iamtest@test.com");
  });

  it("Can fill out all fields", () => {
    cy.visit("/signup?email=iamtest@test.com");
    cy.get(`[name='name']`).type("Test User");
    cy.get(`[name='password']`).type("testingpassword123");
    cy.get(`[name='passwordConfirmation']`).type("testingpassword123");
    cy.contains("Continue").should("be.disabled");
    cy.get(".hp-checkbox").click();
    cy.contains("Continue").should("not.be.disabled");
  });

  it("Can change name", () => {
    const name = "Test User" + Math.random();
    cy.login();
    cy.visit("/settings");
    cy.get(`[name='name']`).clear().type(name);
    cy.contains("Save changes").click();
    cy.get(".hp-header__dropdown-container").should("contain", name);
  });

  it("Can fillout change password", () => {
    cy.visit("/signin");
    cy.contains("Forgot password").click();
    cy.get(`[name='email']`).type("testingpassword123@wow.com");
    cy.contains("Reset password").should("not.be.disabled");
    cy.visit("/change-password");
    cy.get("button").should("be.disabled");
    cy.get(`[name='password']`).type("testingpassword123");
    cy.get(`[name='passwordConfirmation']`).type("testingpassword123");
    cy.get("button").should("not.be.disabled");
  });
});
