describe('Adding Validator', () => {
  it('should log in and add validator', () => {
    // Set the viewport to a laptop screen size
    cy.viewport('macbook-15');
    // Visit the website's login page
    cy.visit('https://testing-safeherit.web.app/login');
    // Input email and password
    cy.get(':nth-child(1) > .text-safe-text-black > .bg-safe-white').type('hesaqadi@mailinator.com');
    cy.get(':nth-child(2) > .text-safe-text-black > .bg-safe-white').type('12121212');
    // Click the login button
    cy.get('.primary-btn').click();
    cy.wait(5000);
    cy.get('.primary-btn').click();
    cy.wait(3000)
    cy.get('.bg-\\[\\#04477B\\]').click()
    cy.get('.flex > .text-safe-text-black-tint').click();cy.wait(4000)
    cy.get('.bg-\\[\\#47B29E\\]').click()
    cy.wait(6000)
    cy.get('.bg-\\[\\#0971AA\\]').click()
    cy.get('.mt-12 > :nth-child(1) > .px-auto').click(0)
    cy.wait(6000)
    cy.get('.p-5.rounded-2xl > .justify-between > .primary-btn').click()
    cy.get(':nth-child(3) > .rounded-3xl').type('updated')
    cy.get('._buttonStyle_1kpr8_49').click()
    cy.wait(2000)
    cy.get(':nth-child(3) > .justify-between > .primary-btn').click();cy.wait(4000)
    cy.visit('https://testing-safeherit.web.app/dashboard/account');cy.wait(4000)
    cy.get('.p-6 > :nth-child(4) > .p-5 > .primary-btn').click();cy.wait(2000)
   // cy.get(':nth-child(1) > .mx-auto').click()
  


  })
});