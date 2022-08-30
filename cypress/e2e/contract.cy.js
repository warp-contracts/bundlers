describe('The Next JS Prod', () => {
  it('successfully loads', () => {
    cy.visit('/');
    cy.contains('Web Bundlers PST');
  });
});
