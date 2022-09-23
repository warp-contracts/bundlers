describe('Web bundlers contract test', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('displays correctly srcState element', () => {
    cy.get('#srcState').should('exist');
  });

  it('displays correctly state of a contract deployed from source', () => {
    cy.get('#srcState').contains('SRC CONTRACT');
    cy.get('#srcState').contains('owner');
    cy.get('#srcState').contains('ticker');
    cy.get('#srcState').contains('100');
  });

  it('displays correctly wasmSrc element', () => {
    cy.get('#wasmSrcState').should('exist');
  });

  it('displays correctly state of a WASM contract deployed from source', () => {
    cy.get('#wasmSrcState').contains('WASM SRC CONTRACT');
    cy.get('#wasmSrcState').contains('owner');
    cy.get('#srcState').contains('ticker');
    cy.get('#wasmSrcState').contains('100');
  });

  it('displays correctly state element', () => {
    cy.get('#state').should('exist');
  });

  it('displays correctly state of a contract deployed from file', () => {
    cy.get('#state').contains('CONTRACT');
    cy.get('#state').contains('owner');
    cy.get('#srcState').contains('ticker');
    cy.get('#state').contains('100');
  });
});
