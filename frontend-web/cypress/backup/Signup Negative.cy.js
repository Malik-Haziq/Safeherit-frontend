it('should open safeherit', () => {
    // Visit safeherit.com
    cy.visit('https://testing-safeherit.web.app/')
  
    // Log the page content
    cy.log('Page content:', Cypress.$('html').html());
    cy.wait(2000);
    // Generate a random email address
    const randomEmail = `testuser${Math.floor(Math.random() * 100000)}@example.com`;
    // Click the button with class 'primary-btn'
    cy.get('button.primary-btn').click();
    cy.wait(2000);
  
  //Sign-up 
    cy.get('.text-safe-text-dark-link-blue').click();
  
    //Entering wrong input in the name field
     cy.get('input[name="name"]').clear().type('12345');
     cy.get('input[name="email"]').clear().type(randomEmail);
     cy.get('input[name="password"]').clear().type('xyz123');
     cy.get(':nth-child(4) > .bg-safe-gray').clear().type('xyz123');
     cy.get('.mr-2').click();
     cy.get('.flex-col > .primary-btn').click();
     cy.log('System is signing up the account with the wrong input in the name field');
     cy.wait(1000);
     cy.reload();
     //Entering invalid email format
     cy.get('input[name="name"]').clear().type('Den');
     cy.get('input[name="email"]').clear().type('xyzgmail.com');
     cy.get('input[name="password"]').clear().type('xyz1234');
     cy.get(':nth-child(4) > .bg-safe-gray').clear().type('xyz1234');
     cy.get('.mr-2').click();
     cy.get('.flex-col > .primary-btn').click();
     cy.wait(1000);
     cy.reload();

      //Entering mismatched password and confirm password
     cy.get('input[name="name"]').clear().type('Den');
     cy.get('input[name="email"]').clear().type(randomEmail);
     cy.get('input[name="password"]').clear().type('xyz1234');
     cy.get(':nth-child(4) > .bg-safe-gray').clear().type('den1234');
     cy.get('.mr-2').click();
     cy.get('.flex-col > .primary-btn').click();
     cy.log('Password and confirm password are not matched');
     cy.wait(1000);
     cy.reload();

     //Sign-up with the already existing account
     cy.get('input[name="name"]').clear().type('reee');
     cy.get('input[name="email"]').clear().type('reee@gmail.com');
     cy.get('input[name="password"]').clear().type('reee1234');
     cy.get(':nth-child(4) > .bg-safe-gray').clear().type('reee1234');
     cy.get('.mr-2').click();
     cy.get('.flex-col > .primary-btn').click();
     cy.log('Email already in use');
     cy.wait(1000);
     cy.reload();

     //Attempting to sign up by filling only one field
     cy.get('input[name="name"]').clear().type('hadiyeah');
     cy.get('input[name="email"]').clear();
     cy.get('input[name="password"]').clear();
     cy.get(':nth-child(4) > .bg-safe-gray').clear();
     cy.get('.mr-2').click();
     cy.get('.flex-col > .primary-btn').click();
     cy.log('Required input fields are empty');
     cy.wait(1000);
     cy.reload();

  // Attempt to sign up without accepting the terms and conditions
cy.get('input[name="name"]').clear().type('sim');
cy.get('input[name="email"]').clear().type(randomEmail);
cy.get('input[name="password"]').clear().type('sim1234');
cy.get(':nth-child(4) > .bg-safe-gray').clear().type('sim1234');
cy.get('.flex-col > .primary-btn').click();
  cy.wait(1000);
  // Add a log message
  cy.log('User cannot sign up without accepting terms and conditions');
  })