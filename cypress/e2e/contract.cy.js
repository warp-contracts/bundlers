describe('Web bundlers contract test', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('displays correctly read contract state', () => {
    cy.get('#srcState').should('exist');
  });

  it('displays correctly read contract state', () => {
    cy.get('#srcState').contains('SRC CONTRACT');
    cy.get('#srcState').contains('owner');
    cy.get('#srcState').contains('WB');
    cy.get('#srcState').contains('100');
  });

  it('displays correctly read WASM contract state', () => {
    cy.get('#wasmSrcState').should('exist');
  });

  it('displays correctly read contract state', () => {
    cy.get('#wasmSrcState').contains('WASM SRC CONTRACT');
    cy.get('#wasmSrcState').contains('owner');
    cy.get('#wasmSrcState').contains('WB');
    cy.get('#wasmSrcState').contains('100');
  });

  it('displays correctly read contract state', () => {
    cy.get('#state').should('exist');
  });

  it('displays correctly read contract state', () => {
    cy.get('#state').contains('CONTRACT');
    cy.get('#state').contains('owner');
    cy.get('#state').contains('WB');
    cy.get('#state').contains('100');
  });
});
