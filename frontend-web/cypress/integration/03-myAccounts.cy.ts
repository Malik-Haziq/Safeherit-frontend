import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';

describe('Open Website, Login, and Fill Username and Password', () => {
  beforeEach(() => {
    // Visit the website
    cy.visit('https://testing-safeherit.web.app/');
  });

  const editUserProfile = (newName) => {
    // Click on the edit user profile button
    // cy.get('.mt-12 > :nth-child(1) > .px-auto').should('be.visible').click();
    // cy.get('._AppView_7c5ev_6 > .relative').should('be.visible');
    cy.get('[data-cy="dashboard-view-my-account-button"]').click();
    // cy.get('[data-cy="dashboard-view-button"]').click();
    cy.wait(2000);

    cy.get('[data-cy="edit-user-profile-button"]').click();

    // Clear the input field
    cy.get('[data-cy="edit-user-name-field"]').should('be.visible');
    cy.get('[data-cy="edit-user-name-field"]').clear();

    // Type the new name into the input field
    cy.get('[data-cy="edit-user-name-field"]').should('be.visible')
      .type(newName)
      .should('have.value', newName);

    // Click on the save button
    cy.get('[data-cy="select-language-list"] > .absolute').should('be.visible').click();
    cy.get('[data-cy="select-language-list"] > .absolute').should('be.visible').click();
    cy.get('[data-cy="save-changes-of-user-details-button"]').should('be.visible').click();
    cy.get(':nth-child(1) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar').should('be.visible');

    //  cy.get('._modal_15tvw_12 > :nth-child(2)').should('be.visible').click();
    // cy.wait(2000)
    // cy.get('[data-cy="edit-key-icon"]').should('be.visible').click();

    // cy.get('[data-cy="generate-public/private-key-button"]').should('be.visible').click();
    // cy.get('.go1888806478').should('be.visible');
    // cy.wait(2000);
    // cy.get('[data-cy="download-private-key-button"] > span').should('be.visible').click();
    // cy.get('.go1888806478').should('be.visible');
    // cy.wait(2000);
    // cy.get('[data-cy="register-generated-public-key-button"]').should('be.visible').click();
    // cy.wait(5000) 
    // cy.get('.go1888806478').should('be.visible');

    cy.get('[data-cy="dashboard-view-my-account-button"]').click();
  };  

// Assuming you have an input element for uploading a picture with data-cy="upload-picture-input"

  const deleteAccount = () => {
    // Click on the delete account button
    cy.get('[data-cy="delete-account-button"]').click();
    // cy.wait(5000);
    cy.get('[data-cy="confirm-button"]').should('be.visible').click();
  };

  // Test case
  it('Visits the website, logs in, and performs various actions', () => {
    cy.login('naseerhunter5@gmail.com', 'Naseerhunter5@gmail.com');
    cy.importPrivateKey();
    editUserProfile('NewName');
    // deleteAccount();
  });
});
