
import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';

describe('Open Website, Login, and Fill Username and Password', () => {
  const deleteBeneficiary = () => {
    cy.get('[data-cy="dashboard-view-beneficiaries-button"]').click();
    cy.wait(4000);
    cy.get('body > div:nth-child(2) > div:nth-child(1) > section:nth-child(2) > div:nth-child(2) > section:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)').click()
    cy.get('[data-cy="drop-down-delete-button"]').click()
    cy.wait(2000)
    cy.get("[data-cy='confirm-button']").click()


  }
  // Test case
  it('Testing of beneficiary module', () => {
    cy.login('naseerhunter5@gmail.com', 'Naseerhunter5@gmail.com');
    cy.importPrivateKey();
    deleteBeneficiary();
  });
});
