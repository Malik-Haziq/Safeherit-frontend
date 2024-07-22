
describe('Login Unit Tests Validation', () => {
  beforeEach(() => {
    // Visit the website before each test
    cy.visit('https://testing-safeherit.web.app/login');
  });

  it('should validate invalid email with valid password', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/login',
    }, {
        statusCode: 400,
        
        body: {
          "success": false,
          "message": "Invalid email or password."
        }
    }).as('login')
    // Entering invalid email with valid password
    const invalidEmail = 'devil@gmail.com';
    const validPassword = 'Ammazbhatti11101999!';

    // Proceed with the login
    cy.get('[data-cy="email-input-field"]').clear().type(invalidEmail);
    cy.get('[data-cy="password-input-field"]').clear().type(validPassword);
    cy.get('[data-cy="login-button"]').click();
    cy.wait("@login").interceptFormData((formData)=>{
      expect(formData["email"]).to.eq(invalidEmail);
      expect(formData["password"]).to.eq(validPassword);
      expect(formData["rememberMe"]).to.eq('false');
    }).then((intercept)=>{
      expect(intercept.response.statusCode ).to.equal(400);
      cy.get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478').should('be.visible');  
    })  
  })

  it('should validate valid email with invalid password', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/login',
    }, {
        statusCode: 400,
        
        body: {
          "success": false,
          "message": "Invalid email or password."
        }
    }).as('login')
    // Entering valid email with invalid password
    const validEmail = 'ammaz11101999@gmail.com';
    const invalidPassword = '123LmnOp!@#$%^&*()_+';

    // Proceed with the login
    cy.get('[data-cy="email-input-field"]').clear().type(validEmail);
    cy.get('[data-cy="password-input-field"]').clear().type(invalidPassword);
    cy.get('[data-cy="login-button"]').click();   
    // Verify error message for invalid password
    cy.wait("@login").interceptFormData((formData)=>{
      expect(formData["email"]).to.eq(validEmail);
      expect(formData["password"]).to.eq(invalidPassword);
      expect(formData["rememberMe"]).to.eq('false');
    }).then((intercept)=>{
      expect(intercept.response.statusCode ).to.equal(400);
      cy.get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478').should('be.visible');  
    })
   });

  it('should validate invalid email and password', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/login',
    }, {
        statusCode: 400,
        
        body: {
          "success": false,
          "message": "Invalid email or password."
        }
    }).as('login')
    // Entering invalid email with invalid password
    const invalidEmail = 'mheyaaa111@gmail.com';
    const invalidPassword = '123123~!QASDFGHJ';

    // Proceed with the login
    cy.get('[data-cy="email-input-field"]').clear().type(invalidEmail);
    cy.get('[data-cy="password-input-field"]').clear().type(invalidPassword);
    cy.get('[data-cy="login-button"]').click(); 
  
    cy.wait("@login").interceptFormData((formData)=>{
      expect(formData["email"]).to.eq(invalidEmail);
      expect(formData["password"]).to.eq(invalidPassword);
      expect(formData["rememberMe"]).to.eq('false');
    }).then((intercept)=>{
      expect(intercept.response.statusCode ).to.equal(400);
      cy.get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478').should('be.visible');  
    })
  })
  it('should login with valid email and password', () => {
    cy.fixture('auth.json').then((authData) => {
      cy.intercept({
        method: 'POST',
        url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/login',
      }, {
          statusCode: 200,
          
          body: {
            "success": true,
            "data": authData
          }
      }).as('login')
      cy.intercept({
        method: 'GET',
        url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth',
      }, {
          statusCode: 200,
          body: {
              "success": true,
              "data": authData
          }
      }).as('apiAuth')
    })
    
    // Entering valid email and password
    const validEmail = 'Naseerhunter5@gmail.com';
    const validPassword = 'Naseerhunter5@gmail.com';

    // Proceed with the login
    cy.get('[data-cy="email-input-field"]').clear().type(validEmail);
    cy.get('[data-cy="password-input-field"]').clear().type(validPassword);
    cy.get('[data-cy="login-button"]').click(); 
    cy.wait("@login").interceptFormData((formData)=>{
      expect(formData["email"]).to.eq(validEmail);
      expect(formData["password"]).to.eq(validPassword);
      expect(formData["rememberMe"]).to.eq('false');
    }).then((intercept)=>{
      expect(intercept.response.statusCode ).to.equal(200);
      cy.get('#notistack-snackbar').should('be.visible').contains("logging in");
    })
  });
});
