// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
import "cypress-intercept-formdata";
const key = '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'
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://testing-safeherit.web.app/login');
    cy.wait(2000);
    // Fill in the username
    cy.get('[data-cy="email-input-field"]').should('be.visible')
      .type(username);

    // Fill in the password
    cy.get('[data-cy="password-input-field"]').should('be.visible')
      .type(password);

    // Click on the login button
    cy.get('[data-cy="login-button"]').click();
    cy.wait(3000); // Wait for the login process to complete

    // cy.get('#headlessui-menu-button-\\:r1\\:').should('be.visible');
});
Cypress.Commands.add('importPrivateKey', ()=>{
    // Click on the import private key button
    const filePath = 'Naseer_privateKey.txt';
    cy.get('[data-cy="login-as-owner-button"]').click()
    cy.wait(3000);
    cy.get('[data-cy="import-private-key-button"]').should('be.visible').click(); 
    cy.get('._modal_15tvw_12').should('be.visible');

    // Click on the browse private key button
    cy.get('[data-cy="browse-private-key-button"]').click();

    // Wait for the file dialog to open (adjust wait time as needed)
    // cy.get('.go1888806478').should('be.visible');    
    // Attach the file to the file input element
    cy.fixture(filePath).then(fileContent => {
      cy.get('input[type="file"]').should('have.length', 1).attachFile({
        fileContent: fileContent,
        fileName: filePath,
        mimeType: 'text/csv' // Adjust the MIME type if necessary
      });
    });
    // cy.get('#notistack-snackbar').should('be.visible');
    cy.wait(3000);
    // Click on the load private key button
    cy.get('[data-cy="load-private-key-button"]').click();
});
Cypress.Commands.add('setLocalStorage', ()=>{
  cy.setCookie('defaultCurrency', 'USD');
  cy.setCookie('session', 'eyJhbGciOiJSUzI1NiIsImtpZCI6InlyeHEtUSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS9zYWZlaGVyaXQtNDMxYzQiLCJuYW1lIjoiTmV3TmFtZSIsImlzQWRtaW4iOnRydWUsImlzU3VwZXJBZG1pbiI6dHJ1ZSwiYWNjb3VudFN0YXR1cyI6IkFjdGl2ZSIsInBheW1lbnRTdGF0dXMiOiJDYW5jZWxsZWQiLCJhdWQiOiJzYWZlaGVyaXQtNDMxYzQiLCJhdXRoX3RpbWUiOjE3MjE4Mzc4NzIsInVzZXJfaWQiOiJlaTJQVU01TktJZ3FUVXhtWERZcTBjTUQ4elgyIiwic3ViIjoiZWkyUFVNNU5LSWdxVFV4bVhEWXEwY01EOHpYMiIsImlhdCI6MTcyMTgzNzg3MiwiZXhwIjoxNzIzMDQ3NDcyLCJlbWFpbCI6Im5hc2Vlcmh1bnRlcjVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5hc2Vlcmh1bnRlcjVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.pAWP-Mlxmq2M06asP77yBX5Ye_gPHSyCaSE5leYoglWBGR-KM8TvRrz-XERgPN6SZYV7vC9y24NbWiqgBNQencrSvrGVRfpglF3Vl4-2IM9cyY80C0cL26kSe7g4skogzGDMIJHiGk9MSE3KAz18TuSRVQH5UJGk6ZtfrnMrptf5isOvQaMWyeNc7ExZXjySnZo4TFheeNctHfrcI4KMRNwgKnLd4-QH9yRkssTmIAbX04OdY38IkM_3hO2BSHm0VXVpcF-Kjp_Zs-gxPC67I_hEb8aw7PhpPPbzeuMhlXbL8Z0150pnTn85JuWZEROXK9bHbUuyJUHMaMLTt3rLWg');

  cy.window().then((window) => {
    window.localStorage.setItem('privateKey', key)
    window.localStorage.setItem('role', 'b3duZXI=');
    window.localStorage.setItem('_privateKey', key)
  })
})
