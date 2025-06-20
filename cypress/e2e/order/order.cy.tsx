///<reference types="cypress"/>
describe('Order test', function () {
    this.beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.intercept('GET', '/api/auth/user', {fixture: 'userData.json'});
        cy.intercept('POST', '/api/orders', {fixture: 'sucessOrder.json'});
        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify('test-refreshToken')
        );

        cy.setCookie('accessToken', 'test-accessToken');

        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000/');

    });

    afterEach(function () {
        cy.clearCookies();
        cy.clearLocalStorage();
    })

   it('Create sucess order test', function() {
    cy.get('[data-cy=bun_ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main_ingredients]').contains('Добавить').click();
    cy.get('[data-cy=souce_ingredients]').contains('Добавить').click();

    cy.get('[data-cy=order_button]').contains('Оформить заказ').should('exist').click();

    cy.get('[data-cy=order_number]').contains('2128506').should('exist');

    cy.get('[data-cy=close_icon]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor]').should('not.contain', 'Ингридиент_1');
    cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Ингридиент_4');
    cy.get('[data-cy=ingredient_constructor]').should('not.contain', 'Ингридиент_2');
   })
})