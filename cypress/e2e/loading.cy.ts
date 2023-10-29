describe('searchbar', () => {
  it('should load git users', () => {
    cy.visit('/');
    cy.get('[data-cy="search-input"]').focus();

    cy.get('[data-cy="search-input"]').type('abc');

    cy.wait(3000);
    cy.get('[data-cy="search-result-wrapper"]').children().should('have.length', 30);

    cy.get('[data-cy="search-result-wrapper"]').scrollTo('bottom');
    cy.wait(3000);
    cy.get('[data-cy="search-result-wrapper"]').children().should('have.length', 60);
  })
})