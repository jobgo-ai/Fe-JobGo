describe("openings", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Can vue openings", () => {
    cy.visit("/openings");
    cy.contains("Test opening #1");
  });

  it("Can create an opening", () => {
    cy.contains("Create new").click();
    cy.get(`[name='name']`).clear().type("TEST_OPENING");
    cy.get(`[name='description']`)
      .clear()
      .type("This is a test opening, please archive me");
    cy.contains("Save changes").click();
  });

  it("Can archive an opening", () => {
    cy.contains("TEST_OPENING").click();
    cy.contains("Edit opening").click();
    cy.contains("Archive opening").click();
  });

  // it("Can add an interview", () => {
  //   cy.contains("PERMANENT_TEST_OPENING").click();
  //   cy.contains("Edit opening").click();
  //   cy.contains("Add interview").click();
  //   cy.contains("TEST_INTERVIEW")
  //     .parents(".hp-add-opening-card")
  //     .find("button")
  //     .contains("Add to opening")
  //     .click();
  // });

  // it("Can remove interview from opening", () => {
  //   cy.contains("PERMANENT_TEST_OPENING").click();
  //   cy.contains("Edit opening").click();
  //   cy.contains("TEST_INTERVIEW")
  //     .find(".hp-button__button__icon--danger")
  //     .click();
  // });
});
