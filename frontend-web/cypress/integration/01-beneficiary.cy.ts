
import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';
import { faker } from '@faker-js/faker';

describe('Open Website, Login, and Fill Username and Password', () => {

  const dataFiller = () => {
    const randomEmail = faker.internet.email();
    const randomName = faker.person.fullName();
    cy.get('[data-cy="generate-public/private-key-button"]').click();
    cy.wait(1000);
    cy.get('[data-cy="download-private-key-button"] > span').click();
    cy.get('[data-cy="register-generated-public-key-button"]').click();
    cy.wait(1000);
    cy.get('[data-cy="beneficiary-name-input-field"]').click();
    cy.get('[data-cy="beneficiary-name-input-field"]').type(randomName);
    cy.get('[data-cy="beneficiary-primary-email-input-field"]').click();
    cy.get('[data-cy="beneficiary-primary-email-input-field"]').type(randomEmail);

    cy.get('[data-cy="beneficiary-backup-email-input-field"]').click();
    cy.get('[data-cy="beneficiary-backup-email-input-field"]').type("s@gmail.com");
    cy.get('[data-cy="beneficiary-backup-email-2-input-field"]').click();
    cy.get('[data-cy="beneficiary-backup-email-2-input-field"]').type("w@gmail.com");
    cy.get('#react-select-2-input').type('+92');

    // Open the dropdown
    cy.get(':nth-child(8) > :nth-child(1) > [data-cy="select-country-codes"]').click();

    // Click on the item with text "+92" from the dropdown list
    cy.get('#react-select-2-listbox').contains('+92').click();
    cy.get('[data-cy="beneficiary-phone-number"]').first().type("3244484651")


    cy.get(':nth-child(9) > :nth-child(1) > [data-cy="select-country-codes"] > .css-b62m3t-container > .css-15gvdpi-control > .css-hlgwow > .css-19bb58m').click(); 
    cy.get('#react-select-3-listbox').contains('+92').click();
    cy.get('[data-cy="beneficiary-backup-phone-number"]').first().type("3244444441");
    cy.get('.w-5 > .w-full').click();
    cy.get('[data-cy="submit-beneficiary-modal-one-button"]').click();

    cy.get('[data-cy="beneficiary-facebook-link-input-field"]').type("https://www.facebook.com/zuck/");
    cy.get('[data-cy="beneficiary-instagram-link-input-field"]').type("https://www.instagram.com/zuck/?hl=en");
    cy.get('[data-cy="beneficiary-twitter-link-input-field"]').type("https://twitter.com/finkd?lang=en");
    cy.get('[data-cy="submit-beneficiary-modal-two-button"]').click();
    cy.get('[data-cy="beneficiary-personalized-message"]').type("hello I am not here gemme");
    cy.get('[data-cy="submit-beneficiary-modal-three-button"]').click();
    cy.wait(2000);
    cy.get('[data-cy="done-button-after-registering-beneficiary"]').click();
  }
  const createByOptionA = () => {
    cy.get('[data-cy="dashboard-view-beneficiaries-button"]').click();
    cy.wait(4000);
    cy.get('[data-cy="register-beneficiary-button"]').click();
    cy.get('.mb-10 > [data-cy="register-beneficiary-button"]').click();
    dataFiller();
  }
  const createByOptionB = ()=>{
    cy.get('[data-cy="dashboard-view-beneficiaries-button"]').click();
    cy.wait(4000);
    cy.get('#cy-add-beneficiary-button').click();
    // cy.get('button.bg-\\[\\#0971AA\\]').click();
    dataFiller();
  }
  const createBeneficiary = () => {
    cy.wait(3000);
    // Remove the 'it' block from here
    cy.get('.mt-11 > :nth-child(1) > .px-auto').click();
    // cy.wait(1000);
    // Select the element
    cy.get('.gap-5 > :nth-child(2) > .flex-col').invoke('text').then((value) => {
      // Convert the extracted value to an integer
      const benefCount = parseInt(value, 10);
      // Conditionally run the appropriate function
      if (benefCount > 0) {
        createByOptionB(); // Call the custom function
      } else {
        createByOptionA(); // Call the custom function
      }
    });
    
  };
  const editBeneficiary = () => {
    const randomEmail = faker.internet.email();
    const randomName = faker.person.fullName();
    cy.wait(1000)
    cy.get('[data-cy="dashboard-view-beneficiaries-button"]').click();
    cy.wait(4000);
    cy.get('body > div:nth-child(2) > div:nth-child(1) > section:nth-child(2) > div:nth-child(2) > section:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)').click()
    cy.get('[data-cy="drop-down-edit-button"]').click()
    cy.get("input[name='name']").clear()
    .type(randomName)
    cy.get("input[name='primary_email']").clear()
    .type(randomEmail)
    cy.get("input[name='backup_email']").clear()
    .type('hasnaat12@gmail.com')
    cy.get("input[name='backup_email2']").clear()
    .type('haiuqd@gmail.com')
    cy.get("input[name='phone_number']").clear()
    .type('+92 3270948943')
    cy.get("input[name='backup_phone_number']").clear()
    .type('+92 3255115998')
    cy.get("input[name='facebook_link']").clear()
    .type('https://www.facebook.com/hasnat/')
    cy.get("input[name='instagram_username']").clear()
    .type('https://www.instagram.com/hasnat/?hl=en')
    cy.get("input[name='twitter_username']").clear()
    .type('https://twitter.com/hasnat?lang=en')
    cy.get("textarea[name='personalized_message']").clear()
    .type('cypress developer')
    cy.get('.gap-1 > .flex > .primary-btn').click()
    cy.get('aside.flex > :nth-child(4)').click()
  };

  // Test case
  it('Testing of beneficiary module', () => {
    cy.login('naseerhunter5@gmail.com', 'Naseerhunter5@gmail.com');
    cy.importPrivateKey();
    createBeneficiary();
    editBeneficiary();
  });
});
