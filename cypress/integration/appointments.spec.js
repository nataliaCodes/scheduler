describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains("Monday");
  });

  it("should book an interview", () => {

    // Clicks on the "Add" button in the second appointment
    cy.get('[alt=Add]')
      .first()
      .click();

    //Enters their name
    cy.get('[data-testid=student-name-input]')
      .should('be.visible')
      .type('Student Name')
      .should('have.value', 'Student Name')

    // Chooses an interviewer
    cy.get('[alt="Sylvia Palmer"]')
      .click()

    // Clicks the save button
    cy.contains('Save')
      .click();

    // Sees the booked appointment
    cy.contains('Student Name')
      .should('be.visible')
  });

  it("should edit an interview", () => {

    // Clicks the edit button for the existing appointment
    cy.get('[alt="Edit"]').first()
      .click({ force: true })

    // Changes the name
    cy.get('[data-testid=student-name-input]')
      .should('be.visible')
      .should('have.value', 'Archie Cohen')
      .clear()
      .type('Student Name')
      .should('have.value', 'Student Name')

    // Changes the interviewer
    cy.get('[alt="Tori Malcolm"]')
      .click()

    // Clicks the save button
    cy.contains('Save')
      .click();

    // Sees the edit to the appointment
    cy.contains('Student Name')
      .should('be.visible')

  });

  it("should cancel an interview", () => {
    //Visits the root of our web server
    cy.visit('/');

    // Clicks the delete button for the existing appointment
    cy.get('[alt="Delete"]').first()
      .click({ force: true })

    // Clicks the confirm button
    cy.contains('Confirm')
      .click()

    // Confirm that the 'Deleting' status shows up then disappears
    cy.contains('Deleting').should('exist');
    cy.contains('Deleting').should('not.exist');

    // Sees that the appointment slot is empty
    cy.contains('Archie Cohen')
      .should('not.exist');

  });
});