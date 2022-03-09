describe("openings", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Can vue openings", () => {
    cy.visit("/openings");
    cy.contains("PERMANENT_OPENING");
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
    cy.get(".hp-opening-card").each(($el, index, $list) => {
      if ($el[0].textContent.includes("TEST_OPENING")) {
        cy.contains("TEST_OPENING").click();
        cy.contains("Edit opening").click();
        cy.contains("Archive opening").click();
        cy.visit("/openings");
      } else {
      }
    });
  });
  it("Can add an interview", () => {
    cy.contains("PERMANENT_OPENING").click();
    cy.contains("Edit opening").click();
    cy.contains("Add interview").click();
    // cy.contains("Add interview")
    //   .parents(".hp-interview-card")
    //   .find("a")
    //   .contains("Add interview")
    //   .click();
    cy.get(".hp-add-opening-card").next().contains("Add to opening").click();
  });

  it("Can remove interview from opening", () => {
    cy.contains("PERMANENT_OPENING").click();
    cy.contains("Edit opening").click();

    cy.get(".hp-interview-card").each(($el, index, $list) => {
      // Hacky way to exlude the add new card
      if (index !== $list.length - 1) {
        cy.get(".hp-interview-card")
          .eq(1)
          .find(".hp-button__button__icon--danger")
          .click();
      } else {
        return false;
      }
    });

    cy.contains("Save changes").click();
  });
});
