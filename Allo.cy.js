/// <reference types='cypress' />

describe('Allo Store', () => {
  before(() => {
    cy.visit('/'); 
  });
  it('the price filter should work correctly', () => {
    cy.url().should('include', '/allo')
    cy.get('.mh-catalog-btn').click();
    cy.contains('Генератори').click({ timeout: 4000 });
    cy.get('[data-id="action"]').click();
    cy.get('[data-id="9890"]').click();
    cy.get('[data-id="159043"]').click(); 
    cy.get('.sort-by__select').dblclick(); 
    cy.contains('від дорогих до дешевих').click();
    cy.wait(1000);
    cy.get('.v-pb__cur.discount span.sum').then($prices => {
        const firstPrice = parseFloat($prices.eq(0).text().replace('₴', ''));
        const secondPrice = parseFloat($prices.eq(1).text().replace('₴', ''));
        expect(firstPrice).to.be.greaterThan(secondPrice);
      });
  });
  it('Should be able to add items to the basket', () => {
    cy.visit('/'); 
    cy.url().should('include', '/allo')
    cy.get('.mh-catalog-btn').click();
    cy.contains('Генератори').click({ timeout: 4000 });
    cy.get('[data-product-id="12523305"] .v-btn--cart').click();
    cy.get('.comeback').click({ timeout: 4000 });
    cy.get('.mh-catalog-btn').click();
    cy.contains('Power Bank').click();
    cy.get('[data-product-id="12440240"] .v-btn--cart').click();
    cy.get('.products__list')
    .find('[data-product-id="12523305"], [data-product-id="12440240"]')
    .should('exist');
    cy.get('[data-product-id="12440240"] .vi.i-shared.vi__close.remove')
.click();
    cy.get('.products__list').should('have.length', 1);
  }); 
  it('Should be able to Search the item', () => {
    cy.visit('/'); 
    cy.url().should('include', '/allo')
    cy.get('#search-form__input').type('генератор')
    cy.get('.search-form__submit-button').click();
    cy.get('.product-card__content').should('include.text', 'генератор');
  }); 
  it('Should not be able to login with incorrect credentials', () => {
    cy.visit('/'); 
    cy.url().should('include', '/allo')
    cy.get('.mh-profile').click();
    cy.get('.auth__enter-password').click();
    cy.get('[name="phoneEmail"]').type('wrongmail@mail.com');
    cy.get('[name="password"]').type('Wrongpass1');
    cy.get('[class="a-button a-button--block a-button--lg a-button--primary"]').click();
    cy.contains('Цей email не зареєстрований.').should('exist');
  }); 
});
