describe('Signup Unit Test Cases Validation', () => {
    beforeEach(() => {
      // Visit the website before each test
      cy.visit('https://testing-safeherit.web.app/signup');
    });
  
    it('should validate mismatched password and confirm password', () => {
        const validName = 'AmmazB';
        const validEmail = `testuser${Math.floor(Math.random() * 100000)}@example.com`;
        const password = 'password123!@#$%^^';
        const confirmPassword = '#$%^UNIQUEPassword....!!!'; // Password and confirm password don't match
  
        // Proceed with the signup
        cy.get('input[name="name"]').clear().type(validName);
        cy.get('input[name="email"]').clear().type(validEmail);
        cy.get('input[name="password"]').clear().type(password);
        cy.get(':nth-child(4) > .bg-safe-gray').clear().type(confirmPassword);
        cy.get('.mr-2').click();
        cy.get('.flex-col > .primary-btn').click();
        cy.get('#notistack-snackbar').should('be.visible').contains('password must match');
        cy.log('Password and confirm password do not match');
    });
    it('should validate password requirements', () => {
        const validName = 'AmmazB';
        const validEmail = `testuser${Math.floor(Math.random() * 100000)}@example.com`;
        const password = 'password123!';
        const confirmPassword = 'password123!'; // Password and confirm password don't match
  
        // Proceed with the signup
        cy.get('input[name="name"]').clear().type(validName);
        cy.get('input[name="email"]').clear().type(validEmail);
        cy.get('input[name="password"]').clear().type(password);
        cy.get(':nth-child(4) > .bg-safe-gray').clear().type(confirmPassword);
        cy.get('.mr-2').click();
        cy.get('.flex-col > .primary-btn').click();
        cy.get('.text-red-500 > :nth-child(1)').should('be.visible').contains('password must be 8 or more characters length.');
        cy.get('.text-red-500 > :nth-child(2)').should('be.visible').contains('password must contain 1 or more uppercase characters.');
        cy.get('.text-red-500 > :nth-child(3)').should('be.visible').contains('password must contain 1 or more digit characters.');
        cy.get('.text-red-500 > :nth-child(4)').should('be.visible').contains('password must contain 1 or more spacial characters.');
        cy.log('Password and confirm password do not match');
    });
    it('should validate invalid email format', () => {
        const validName = 'Bob';
        const existingEmail = 'naseerhuntergmail.com'; // Email that already exists
        const password = 'newPassword@12'
  
        // Proceed with the signup
        cy.get('input[name="name"]').clear().type(validName);
        cy.get('input[name="email"]').clear().type(existingEmail);
        cy.get('input[name="password"]').clear().type(password);
        cy.get(':nth-child(4) > .bg-safe-gray').clear().type(password);
        cy.get('.mr-2').click();
        cy.get('.flex-col > .primary-btn').click();
        cy.log('Invalid Email');
    });
    it('should validate invalid email (Email already exist)', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/signup',
          }, {
              statusCode: 400,
              
              body: {
                "success": false,
                "message": "The email address is already in use by another account."
            }
          }).as('signup')
        const validName = 'Bob';
        const existingEmail = 'naseerhunter5@gmail.com'; // Email that already exists
        const password = 'newPassword@12'
  
        // Proceed with the signup
        cy.get('input[name="name"]').clear().type(validName);
        cy.get('input[name="email"]').clear().type(existingEmail);
        cy.get('input[name="password"]').clear().type(password);
        cy.get(':nth-child(4) > .bg-safe-gray').clear().type(password);
        cy.get('.mr-2').click();
        cy.get('.flex-col > .primary-btn').click();
        cy.wait("@signup").interceptFormData((formData)=>{
            expect(formData["email"]).to.eq(existingEmail);
            expect(formData["password"]).to.eq(password);
            expect(formData["displayName"]).to.eq(validName);
        }).then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(400);
            cy.get(':nth-child(1) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar')
            .should('be.visible').contains('The email address is already in use by another account.');
        })
    });
    it('should validate empty required fields', () => {
      // Attempt to sign up by leaving all fields empty
      cy.get('.mr-2').click();
      cy.get('.flex-col > .primary-btn').click();
      cy.log('Required input fields are empty');
    });
    it('should validate signup without accepting terms and conditions', () => {
        const validName = 'BhattiJOB';
        const validEmail = `testuser${Math.floor(Math.random() * 100000)}@example.com`;
        const password = 'password123';
        // Proceed with the signup without accepting terms and conditions
        cy.get('input[name="name"]').clear().type(validName);
        cy.get('input[name="email"]').clear().type(validEmail);
        cy.get('input[name="password"]').clear().type(password);
        cy.get(':nth-child(4) > .bg-safe-gray').clear().type(password);
        cy.get('.flex-col > .primary-btn').click();
        cy.log('User cannot sign up without accepting terms and conditions');
    });
    it('should validate invalid email (Email already exist)', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/signup',
          }, {
              statusCode: 200,
              
              body: {
                "success":true,
                "message":"User created"
            }
          }).as('signup')
        const validName = 'Bob';
        const existingEmail = 'naseerhunter@gmail.com'; // Email that already exists
        const password = 'newPassword@12'
  
        // Proceed with the signup
        cy.get('input[name="name"]').clear().type(validName);
        cy.get('input[name="email"]').clear().type(existingEmail);
        cy.get('input[name="password"]').clear().type(password);
        cy.get(':nth-child(4) > .bg-safe-gray').clear().type(password);
        cy.get('.mr-2').click();
        cy.get('.flex-col > .primary-btn').click();
        cy.wait("@signup").interceptFormData((formData)=>{
            expect(formData["email"]).to.eq(existingEmail);
            expect(formData["password"]).to.eq(password);
            expect(formData["displayName"]).to.eq(validName);
        }).then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
            cy.get('#notistack-snackbar').should('be.visible').contains("User created");
        })
    });
  });