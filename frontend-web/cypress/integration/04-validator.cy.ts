import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';
import { faker } from '@faker-js/faker';

describe('Open Website, Login, and Fill Username and Password', () => {

  const dataFiller = () => {
    const randomEmail = faker.internet.email();
    const randomName = faker.person.fullName();
    cy.wait(1000);
    cy.get(':nth-child(4) > .rounded-3xl').type(randomName);
    cy.get(':nth-child(5) > .rounded-3xl').type(randomEmail);
    cy.get(':nth-child(6) > .rounded-3xl').type(randomEmail);
    cy.get(':nth-child(7) > .rounded-3xl').type(randomEmail);
    cy.get(':nth-child(8) > :nth-child(1) > [data-cy="select-country-codes"]').click(); // Open the dropdown
    cy.get('#react-select-2-listbox').contains('+92').click();  // Click on the item with text "+92" from the dropdown list
    cy.get('[data-cy="validator-phone-number"]').first().type("3244484651");
    cy.get('[data-cy="submit-validator-modal-one-button"]').click();

    cy.get('[data-cy="validator-facebook-link-input-field"]').type("https://www.facebook.com/zuck/");
    cy.get('[data-cy="validator-instagram-link-input-field"]').type("https://www.instagram.com/zuck/?hl=en");
    cy.get('[data-cy="validator-twitter-link-input-field"]').type("https://twitter.com/finkd?lang=en");
    cy.get('[data-cy="submit-validator-modal-two-button"]').click();
    cy.get('[data-cy="validator-personalized-message"]').type("hello I am not here gemme");
    cy.get('[data-cy="submit-validator-modal-three-button"]').click();
    cy.wait(2000);
    cy.visit('https://testing-safeherit.web.app/dashboard/validators');
  }
  const createByOptionA = () => {
    cy.get('[data-cy="dashboard-view-validators-button"]').click();
    cy.wait(4000);
    cy.get('[data-cy="register-validator-button"]').click();
    cy.get('.mb-10 > [data-cy="register-validator-button"]').click();
    dataFiller();
  }
  const createByOptionB = ()=>{
    cy.get('[data-cy="dashboard-view-validators-button"]').click();
    cy.wait(4000);
    cy.get('#cy-add-validator-button').click();
    dataFiller();
  }
  const createValidator = () => {
    cy.wait(3000);
    cy.get('.mt-11 > :nth-child(1) > .px-auto').click();
    cy.wait(1000);
    // Select the element
    cy.get(':nth-child(3) > .flex-col').invoke('text').then((value) => {
      // Convert the extracted value to an integer
      const validatorCount = parseInt(value, 10);
      console.log(validatorCount+' validator count')
      // Conditionally run the appropriate function
      if (validatorCount > 0) {
        createByOptionB(); // Call the custom function if validators already exist
      } else {
        createByOptionA(); // Call the custom function if validators don't exist,we would create for first time
      }
    });
    
  };
  const editValidator = () => {
    const randomEmail = faker.internet.email();
    const randomName = faker.person.fullName();
    cy.wait(1000)
    cy.get('[data-cy="beneficiary-drop-down-button"]').first().click()
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
    cy.get('.primary-btn').click()
  };
  const deleteValidator = () => {
    cy.wait(5000)
    cy.get('[data-cy="beneficiary-drop-down-button"]').first().click()
    cy.get('[data-cy="drop-down-delete-button"]').click()
    cy.wait(2000)
    cy.get("[data-cy='confirm-button'").click()

  }
  // Test case
  it('Visits the website, logs in, and performs the testing of beneficiary module', () => {
    cy.login('naseerhunter5@gmail.com', 'Naseerhunter5@gmail.com');
    cy.importPrivateKey();
    createValidator();
    editValidator();
    deleteValidator();
  });
});
