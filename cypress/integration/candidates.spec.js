describe("candidates", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Can view candidates", () => {
    cy.visit("/openings");
    cy.contains("TEST_OPENING_DO_NOT_DELETE").click();
    cy.contains("TEST_CANDIDATE_1_DONT_LET_ME_DIE").click();
    cy.contains("Current score");
  });

  it("Can add candidate", () => {
    cy.visit("/openings");
    cy.contains("TEST_OPENING_DO_NOT_DELETE").click();
    cy.contains("Add candidate").click();
    cy.get(`[name='name']`).type("Testing person");
    cy.get(`[name='email']`).type("email@wowow.com");
    cy.contains("Create candidate").click();
    cy.contains("Current score");
  });

  it("Can archive candidate", () => {
    cy.visit("/openings");
    cy.contains("TEST_OPENING_DO_NOT_DELETE").click();
    cy.contains("Testing person").click();
    cy.contains("Edit details").click();
    cy.get(".hp-button__button__icon--danger").click();
  });
});
