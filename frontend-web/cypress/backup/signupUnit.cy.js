import { validateName, validateEmail, validatePassword } from './SignUpUtlis'; // Import client-side validation functions

describe('Signup Unit Test Cases Validation', () => {
  beforeEach(() => {
    // Visit the website before each test
    cy.visit('https://testing-safeherit.web.app/');
    cy.wait(2000);
    // Log the page content
    cy.log('Page content:', Cypress.$('html').html());
    cy.wait(2000);
    // Click the button with class 'primary-btn'
    cy.get('button.primary-btn').click();
    cy.wait(2000);
    // Navigate to the signup form
    cy.get('.text-safe-text-dark-link-blue').click();
  });

  it('should validate mismatched password and confirm password', () => {
    const validName = 'AmmazB';
    const validEmail = `testuser${Math.floor(Math.random() * 100000)}@example.com`;
    const password = 'password123!@#$%^^';
    const confirmPassword = '#$%^UNIQUEPassword....!!!'; // Password and confirm password don't match

    if (!validateName(validName) || !validateEmail(validEmail) || !validatePassword(password, confirmPassword)) {
      cy.log('Validation failed: Mismatched password and confirm password or other fields');
    } else {
      // Proceed with the signup
      cy.get('input[name="name"]').clear().type(validName);
      cy.get('input[name="email"]').clear().type(validEmail);
      cy.get('input[name="password"]').clear().type(password);
      cy.get(':nth-child(4) > .bg-safe-gray').clear().type(confirmPassword);
      cy.get('.mr-2').click();
      cy.get('.flex-col > .primary-btn').click();
      cy.log('Password and confirm password do not match');
      cy.wait(1000);
      cy.reload();
    }
  });

  it('should validate email already in use', () => {
    const validName = 'Bob';
    const existingEmail = 'ammaz11101999!gmail.com'; // Email that already exists

    if (!validateName(validName) || !validateEmail(existingEmail)) {
      cy.log('Validation failed: Email already in use or other fields');
    } else {
      // Proceed with the signup
      cy.get('input[name="name"]').clear().type(validName);
      cy.get('input[name="email"]').clear().type(existingEmail);
      cy.get('input[name="password"]').clear().type('newPassword');
      cy.get(':nth-child(4) > .bg-safe-gray').clear().type('newPassword');
      cy.get('.mr-2').click();
      cy.get('.flex-col > .primary-btn').click();
      cy.log('Email already in use');
      cy.wait(1000);
      cy.reload();
    }
  });

  it('should validate empty required fields', () => {
    // Attempt to sign up by leaving all fields empty
    cy.get('.mr-2').click();
    cy.get('.flex-col > .primary-btn').click();
    cy.log('Required input fields are empty');
    cy.wait(1000);
    cy.reload();
  });

  it('should validate signup without accepting terms and conditions', () => {
    const validName = 'BhattiJOB';
    const validEmail = `testuser${Math.floor(Math.random() * 100000)}@example.com`;
    const password = 'password123';

    if (!validateName(validName) || !validateEmail(validEmail) || !validatePassword(password, password)) {
      cy.log('Validation failed: Terms and conditions not accepted or other fields');
    } else {
      // Proceed with the signup without accepting terms and conditions
      cy.get('input[name="name"]').clear().type(validName);
      cy.get('input[name="email"]').clear().type(validEmail);
      cy.get('input[name="password"]').clear().type(password);
      cy.get(':nth-child(4) > .bg-safe-gray').clear().type(password);
      cy.get('.flex-col > .primary-btn').click();
      cy.log('User cannot sign up without accepting terms and conditions');
      cy.wait(1000);
      cy.reload();
    }
  });

  // Add more test cases for other scenarios
});