it('should open safeherit', () => {
  // Visit safeherit.com
  cy.visit('https://testing-safeherit.web.app/')

  // Log the page content
  cy.log('Page content:', Cypress.$('html').html());
  cy.wait(2000);

  // Click the button with class 'primary-btn'
  cy.get('button.primary-btn').click();
  cy.wait(2000);

// Entering invalid email with valid password
cy.get(':nth-child(1) > .text-safe-text-black > .bg-safe-white').clear().type('meesu123@gmail.com');
cy.get(':nth-child(2) > .text-safe-text-black > .bg-safe-white').clear().type('reee1234');
cy.get('.mr-2').click();
cy.get('.primary-btn').click();
// Print the message
cy.log('Due to invalid email, the system is unable to login');
cy.wait(2000);

// Entering valid email with invalid password
cy.get(':nth-child(1) > .text-safe-text-black > .bg-safe-white').clear().type('reee@gmail.com');
cy.get(':nth-child(2) > .text-safe-text-black > .bg-safe-white').clear().type('123rfgd');
cy.get('.mr-2').click();
cy.get('.primary-btn').click();
cy.reload();
// Print the message
cy.log('Due to invalid password, the system is unable to login');

// Entering invalid email with invalid password
cy.get(':nth-child(1) > .text-safe-text-black > .bg-safe-white').clear().type('meesu123@gmail.com');
cy.get(':nth-child(2) > .text-safe-text-black > .bg-safe-white').clear().type('123rfgd');
cy.get('.mr-2').click();
cy.get('.primary-btn').click();
// Print the message
cy.log('Due to invalid email and password, the system is unable to login');
});