//Validators
 // Import Cypress commands
 import 'cypress-xpath';
 const randomEmail = `testuser${Math.floor(Math.random() * 100000)}@example.com`;
 import '@4tw/cypress-drag-drop';
 // Define a custom Cypress command for highlighting elements
 Cypress.Commands.add('highlightElement', { prevSubject: 'element' }, (element) => {
   cy.get(element).invoke('attr', 'style', 'background: yellow; border: 2px solid red;').wait(1000).invoke('attr', 'style', 'border: 0px;');
 });
 // Define a custom Cypress command for waiting for an element
 Cypress.Commands.add('waitForElement', (selector, timeout = 8000) => {
   return cy.get(selector, { timeout });
 });
 // Define a custom Cypress command for checking if an element is present
 Cypress.Commands.add('isElementPresent', (selector) => {
   return cy.get(selector).should('exist');
 });
 // Define a custom Cypress command for logging in
 Cypress.Commands.add('login', () => {
   const websiteUrl = 'https://testing-safeherit.web.app/';
   cy.visit(websiteUrl).wait(3000);
   // Replace 'YOUR_USERNAME' and 'YOUR_PASSWORD'
   const username = 'gavril.isileli@fixedfor.com';
   const password = 'Abc12345';
   cy.get('nav button').click().wait(3000);
   cy.waitForElement('form div:nth-child(1) label input').type(username);
   cy.waitForElement('form div:nth-child(2) label input').type(password);
   cy.get('form div:nth-child(3) div input').check();
   cy.get('form button').click().wait(5000);
   cy.contains('Login')
  .should('be.visible') // Check if it's visible
  .click();

  });
 // Define a custom Cypress command for registering a secret key
 Cypress.Commands.add('registerSecretKey', () => {
   cy.waitForElement('button').click().wait(2000);
 });
 // Define a custom Cypress command for handling validators
 Cypress.Commands.add('validators', () => {
   cy.wait(1000);
   cy.get('.mt-11 > :nth-child(1) > .px-auto').click();
   cy.wait(1000);
   // Select the element
   cy.get(':nth-child(3) > .flex-col').invoke('text').then((value) => {
     // Convert the extracted value to an integer
     const intValue = parseInt(value, 10);
     // Conditionally run the appropriate function
     if (intValue > 0) {
       cy.oldUser();
      // Call the custom Cypress command
     } else {
       cy.newUser(); // Call the custom Cypress command
     }
   });
 });
 // Define a custom Cypress command for new user registration
 Cypress.Commands.add('newUser', () => {
  cy.wait(5000);
  cy.log("Without filling form of OldUser")
  cy.get('body').click();
  cy.get(':nth-child(4) > .px-auto').click();
  cy.wait(4000);
  cy.get('#cy-add-validator-button').click();
  //Process without filling form
 //  const randomName = `RandomUser${Math.floor(Math.random() * 10000)}`;
 //  cy.get(':nth-child(4) > .rounded-3xl').type(randomName);
 //  const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
 //  cy.get(':nth-child(5) > .rounded-3xl').type(randomEmail);
 //  cy.get(':nth-child(6) > .rounded-3xl').type(randomEmail);
 //  const randomEmail1 = `test${Math.floor(Math.random() * 10000)}@example.com`;
 //  cy.get(':nth-child(7) > .rounded-3xl').type(randomEmail1);
 //  const randomPhoneNumber1 = `0337${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
 //  const randomPhoneNumber2 = `0337${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
 //  cy.get('input').eq(4).type(randomPhoneNumber1);
 //  cy.get('input').eq(5).type(randomPhoneNumber2);
  cy.get('.w-5 > .w-full').click();
  cy.get('._buttonStyle_1kpr8_49').click();
  cy.wait(5000);

  const randomName = `RandomUser${Math.floor(Math.random() * 10000)}`;
  cy.get(':nth-child(4) > .rounded-3xl').type(randomName);
  const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
  cy.get(':nth-child(5) > .rounded-3xl').type(randomEmail);
  cy.get(':nth-child(6) > .rounded-3xl').type(randomEmail);
  const randomEmail1 = `test${Math.floor(Math.random() * 10000)}@example.com`;
  cy.get(':nth-child(7) > .rounded-3xl').type(randomEmail1);
  const randomPhoneNumber1 = `0337${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
  const randomPhoneNumber2 = `0337${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
  cy.get('input').eq(4).type(randomPhoneNumber1);
  cy.get('input').eq(5).type(randomPhoneNumber2);
 cy.get('.w-5 > .w-full').click();
 cy.get('._buttonStyle_1kpr8_49').click();
 cy.wait(5000);
  });
 //Process without filling form for old user registration
 Cypress.Commands.add('oldUser', () => {
   cy.wait(5000);
   cy.log("Without filling form of OldUser")
   cy.get('body').click();
   cy.get(':nth-child(4) > .px-auto').click();
   cy.wait(4000);
   cy.get('#cy-add-validator-button').click();
   //Process without filling form
  //  const randomName = `RandomUser${Math.floor(Math.random() * 10000)}`;
  //  cy.get(':nth-child(4) > .rounded-3xl').type(randomName);
  //  const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
  //  cy.get(':nth-child(5) > .rounded-3xl').type(randomEmail);
  //  cy.get(':nth-child(6) > .rounded-3xl').type(randomEmail);
  //  const randomEmail1 = `test${Math.floor(Math.random() * 10000)}@example.com`;
  //  cy.get(':nth-child(7) > .rounded-3xl').type(randomEmail1);
  //  const randomPhoneNumber1 = `0337${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
  //  const randomPhoneNumber2 = `0337${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
  //  cy.get('input').eq(4).type(randomPhoneNumber1);
  //  cy.get('input').eq(5).type(randomPhoneNumber2);
   cy.get('.w-5 > .w-full').click();
   cy.get('._buttonStyle_1kpr8_49').click();
   cy.wait(5000);

   const randomName = `RandomUser${Math.floor(Math.random() * 10000)}`;
   cy.get(':nth-child(4) > .rounded-3xl').type(randomName);
   const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
   cy.get(':nth-child(5) > .rounded-3xl').type(randomEmail);
   cy.get(':nth-child(6) > .rounded-3xl').type(randomEmail);
   const randomEmail1 = `test${Math.floor(Math.random() * 10000)}@example.com`;
   cy.get(':nth-child(7) > .rounded-3xl').type(randomEmail1);
   const randomPhoneNumber1 = `0337${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
   const randomPhoneNumber2 = `0337${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
   cy.get('input').eq(4).type(randomPhoneNumber1);
   cy.get('input').eq(5).type(randomPhoneNumber2);
  cy.get('.w-5 > .w-full').click();
  cy.get('._buttonStyle_1kpr8_49').click();
  cy.wait(5000);
  //  const randomFacebookLink = `https://www.facebook.com/user${Math.floor(Math.random() * 10000)}`;
  //  const randomInstagramLink = `https://www.instagram.com/user${Math.floor(Math.random() * 10000)}`;
  //  const randomTwitterLink = `https://www.twitter.com/user${Math.floor(Math.random() * 10000)}`;
  //  cy.get(':nth-child(4) > .rounded-3xl').type(randomFacebookLink);
  //  cy.get(':nth-child(5) > .rounded-3xl').type(randomInstagramLink);
  //  cy.get(':nth-child(6) > .rounded-3xl').type(randomTwitterLink);
    cy.get('._buttonStyle_1kpr8_49').click();
    cy.wait(3000)
    // cy.get('textarea[name="personalized_message"]').type('Lorem ipsum dolor sit amet, consecteturadipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodoconsequat.');
    // cy.wait(2000);
    // cy.get('._buttonStyle_1kpr8_49').click();
    // cy.get('._icon_1kpr8_37 > .cursor-pointer').click();
    cy.log('You Cannot proceed further without entering social media links');
    cy.wait(3000)
      const randomFacebookLink = `https://www.facebook.com/user${Math.floor(Math.random() * 10000)}`;
    const randomInstagramLink = `https://www.instagram.com/user${Math.floor(Math.random() * 10000)}`;
    const randomTwitterLink = `https://www.twitter.com/user${Math.floor(Math.random() * 10000)}`;
    cy.get(':nth-child(4) > .rounded-3xl').type(randomFacebookLink);
    cy.get(':nth-child(5) > .rounded-3xl').type(randomInstagramLink);
    cy.get(':nth-child(6) > .rounded-3xl').type(randomTwitterLink);
  cy.get('._buttonStyle_1kpr8_49').click();
  cy.wait(3000);
 });
 
 describe('Automated Test', () => {
   it('should execute the automated test', () => {
     cy.login();
     cy.registerSecretKey();
     // Call the validators command directly in the test case
     cy.validators();
   });
 });