describe("Navigation", () => {

  xit("should visit root", () => {
    cy.visit('/');
  });

  xit("should navigate to Tuesday", () => {
    cy.visit('/');

    cy.contains('[data-testid=day]', 'Tuesday')
      .click()
      .should('have.class', 'day-list__item--selected');
  });

});