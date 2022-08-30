describe('The Next JS Prod', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.get('#state').contains('Web Bundlers PST');
  });
});
