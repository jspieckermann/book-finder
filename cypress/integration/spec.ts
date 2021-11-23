describe('My Book-Finder Test', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Ensure that title is displayed', () => {
    cy.contains('Book-Finder');
  })

  it('shall display books of Ken Follet', () => {
    cy.get('#paginator').should('not.exist');
    cy.get('#book-list').children().should('have.length', 0);
    cy.get('#filter').select('Author');
    cy.get('#submitButton').should('be.disabled');
    cy.get('#content').type('Ken Follet');
    cy.get('#submitButton').should('not.be.disabled');
    cy.get('#submitButton').click();
    cy.get('#book-list').children().should('have.length', 10);
    cy.get('#paginator').should('exist');
  })

  it('shall display the book with ISBN 9783838709079', () => {
    cy.get('#paginator').should('not.exist');
    cy.get('#book-list').children().should('have.length', 0);
    cy.get('#filter').select('ISBN');
    cy.get('#submitButton').should('be.disabled');
    cy.get('#content').type('9783838709079');
    cy.get('#submitButton').should('not.be.disabled');
    cy.get('#submitButton').click();
    cy.get('#book-list').children().should('have.length', 1);
    cy.get('#paginator').should('not.exist');
  })

  it('shall display the book with tile: Die Nadel', () => {
    cy.get('#paginator').should('not.exist');
    cy.get('#book-list').children().should('have.length', 0);
    cy.get('#filter').select('Title');
    cy.get('#submitButton').should('be.disabled');
    cy.get('#content').type('Die Nadel');
    cy.get('#submitButton').should('not.be.disabled');
    cy.get('#submitButton').click();
    cy.get('#book-list').children().should('have.length', 10);
    cy.get('#paginator').should('exist');
  })


})
