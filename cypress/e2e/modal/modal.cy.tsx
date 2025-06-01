///<reference types="cypress"/>

describe('Modal window test', function() {
    this.beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000/');
    })

    it('Ingredient modal window is opened', function () {
        cy.get('[data-cy=modal]').should('not.exist');
        cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click();
        cy.get('[data-cy=modal]').contains('Ингредиент_1').should('exist');
    })

    it('Ingredient modal window is closed', function() {
        cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click();
        cy.get('[data-cy=close_icon]').click();
        cy.get('[data-cy=modal]').should('not.exist');
    })

    it('Ingredient modal window is closed by overlay cloick', function () {
        cy.get('[data-cy=bun_ingredients]').contains('Ингредиент_1').click();
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=overlay]').should('exist').click('topRight', {force : true});
        cy.get('[data-cy=modal]').should('not.exist');
    })
})