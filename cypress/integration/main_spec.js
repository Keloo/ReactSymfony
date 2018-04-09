describe('Main Test', function() {
    it('Test login flow', function() {
        cy.visit('http://localhost:8000/');
        cy.contains('Login').click();
        cy.url().should('include', '/login');
        cy.contains('Username');
        cy.contains('Password');
        cy.contains('Submit').click();
        cy.contains('Username must be at least 4 chars');
    });
    it('Test register flow', function() {
        cy.visit('http://localhost:8000/');
        cy.contains('Register').click();
        cy.url().should('include', '/register');
        cy.contains('Username');
        cy.contains('Email');
        cy.contains('Password');
    })
});