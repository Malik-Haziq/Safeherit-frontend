//BENEFICIARY
 // Import Cypress commands
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
 // Define a custom Cypress command for handling beneficiaries
 Cypress.Commands.add('beneficiaries', () => {
   cy.wait(1000);
   // Remove the 'it' block from here
   cy.get('.mt-11 > :nth-child(1) > .px-auto').click();
   cy.wait(1000);
   // Select the element
   cy.get('.gap-5 > :nth-child(2) > .flex-col').invoke('text').then((value) => {
     // Convert the extracted value to an integer
     const intValue = parseInt(value, 10);
     // Conditionally run the appropriate function
     if (intValue > 0) {
       cy.oldUser(); // Call the custom Cypress command
     } else {
       cy.newUser(); // Call the custom Cypress command
     }
   });
   // Add an assertion to ensure the element is visible
 });
 // Define a custom Cypress command for new user registration
 Cypress.Commands.add('newUser', () => {
  cy.get(':nth-child(3) > .px-auto').click();
  cy.contains('button.primary-btn', 'Register Beneficiaries').click();
  cy.wait(4000); // Wait for 2 seconds, adjust as needed
  cy.get('button.bg-\\[\\#0971AA\\]').contains('Register Beneficiaries').click();
  cy.contains('button.primary-btn', 'I have a Private Key').click();
  //Proceeding without filling form 
  cy.get('.w-5 > .w-full').click();
  cy.get('._buttonStyle_1kpr8_49').click();
  cy.wait(4000);
  cy.log('%cWithout filling the form', 'background: yellow; color: black;');
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
  cy.get('button').contains('Save & Next').click();
  cy.wait(6000);
  cy.log('%ccannot proceed without filling the form', 'background: yellow; color: black;');
 cy.wait(2000);
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
 cy.get('button').contains('Save & Next').click();
 cy.wait(2000);
//Without entering social media
 //  const randomFacebookLink = `https://www.facebook.com/user${Math.floor(Math.random() * 10000)}`;
 //  const randomInstagramLink = `https://www.instagram.com/user${Math.floor(Math.random() * 10000)}`;
 //  const randomTwitterLink = `https://www.twitter.com/user${Math.floor(Math.random() * 10000)}`;
 //  cy.get(':nth-child(4) > .rounded-3xl').type(randomFacebookLink);
 //  cy.get(':nth-child(5) > .rounded-3xl').type(randomInstagramLink);
 //  cy.get(':nth-child(6) > .rounded-3xl').type(randomTwitterLink);
  cy.get('button').contains('Next').click();
  cy.wait(3000);
  cy.log('%cCannot proceed without adding socials', 'background: yellow; color: black;');
  cy.wait(3000);
const randomFacebookLink = `https://www.facebook.com/user${Math.floor(Math.random() * 10000)}`;
   const randomInstagramLink = `https://www.instagram.com/user${Math.floor(Math.random() * 10000)}`;
   const randomTwitterLink = `https://www.twitter.com/user${Math.floor(Math.random() * 10000)}`;
   cy.get(':nth-child(4) > .rounded-3xl').type(randomFacebookLink);
   cy.get(':nth-child(5) > .rounded-3xl').type(randomInstagramLink);
   cy.get(':nth-child(6) > .rounded-3xl').type(randomTwitterLink);
   cy.get('button').contains('Next').click();
  cy.wait(3000);

 //  cy.get('textarea').type('Lorem Ipsum is simply dummy text...');
 //  cy.wait(5000);
 cy.log('%cProceeding without Message', 'background: yellow; color: black;');
  cy.get('button._buttonStyle_1kpr8_49').click();
  cy.wait(3000);
  cy.log('%cCannot proceed without adding message', 'background: yellow; color: black;');
  cy.wait(2000);
  
  cy.get('textarea').type('Lorem Ipsum is simply dummy text...');
  cy.wait(5000);
  cy.get('button._buttonStyle_1kpr8_49').click();
  cy.wait(3000);
  cy.log('New User func called');
  
   cy.get('._icon_1kpr8_37 > .cursor-pointer').click();
  });
 // Define a custom Cypress command for old user registration
 Cypress.Commands.add('oldUser', () => {
   cy.wait(5000);
   cy.get('body').click();
   cy.get(':nth-child(3) > .px-auto').click();
   cy.get('#cy-add-beneficiary-button').click();
   cy.get('button.bg-\\[\\#0971AA\\]').click();
   cy.wait(4000);
   cy.log('%cWithout filling the form', 'background: yellow; color: black;');
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
   cy.get('button').contains('Save & Next').click();
   cy.wait(6000);
   cy.log('%ccannot proceed without filling the form', 'background: yellow; color: black;');
  cy.wait(2000);
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
  cy.get('button').contains('Save & Next').click();
  cy.wait(2000);
//Without entering social media
  //  const randomFacebookLink = `https://www.facebook.com/user${Math.floor(Math.random() * 10000)}`;
  //  const randomInstagramLink = `https://www.instagram.com/user${Math.floor(Math.random() * 10000)}`;
  //  const randomTwitterLink = `https://www.twitter.com/user${Math.floor(Math.random() * 10000)}`;
  //  cy.get(':nth-child(4) > .rounded-3xl').type(randomFacebookLink);
  //  cy.get(':nth-child(5) > .rounded-3xl').type(randomInstagramLink);
  //  cy.get(':nth-child(6) > .rounded-3xl').type(randomTwitterLink);
   cy.get('button').contains('Next').click();
   cy.wait(3000);
   cy.log('%cCannot proceed without adding socials', 'background: yellow; color: black;');
   cy.wait(3000);
 const randomFacebookLink = `https://www.facebook.com/user${Math.floor(Math.random() * 10000)}`;
    const randomInstagramLink = `https://www.instagram.com/user${Math.floor(Math.random() * 10000)}`;
    const randomTwitterLink = `https://www.twitter.com/user${Math.floor(Math.random() * 10000)}`;
    cy.get(':nth-child(4) > .rounded-3xl').type(randomFacebookLink);
    cy.get(':nth-child(5) > .rounded-3xl').type(randomInstagramLink);
    cy.get(':nth-child(6) > .rounded-3xl').type(randomTwitterLink);
    cy.get('button').contains('Next').click();
   cy.wait(3000);

  //  cy.get('textarea').type('Lorem Ipsum is simply dummy text...');
  //  cy.wait(5000);
  cy.log('%cProceeding without Message', 'background: yellow; color: black;');
   cy.get('button._buttonStyle_1kpr8_49').click();
   cy.wait(3000);
   cy.log('%cCannot proceed without adding message', 'background: yellow; color: black;');
   cy.wait(2000);
   
   cy.get('textarea').type('Lorem Ipsum is simply dummy text...');
   cy.wait(5000);
   cy.get('button._buttonStyle_1kpr8_49').click();
   cy.wait(3000);
   cy.log('Old User func called');
   
    cy.get('._icon_1kpr8_37 > .cursor-pointer').click();
 });
 describe('Automated Test', () => {
   it('should execute the automated test', () => {
     cy.login();
     cy.registerSecretKey();
     // Call the beneficiaries command directly in the test case
     cy.beneficiaries();
   });
 });
 