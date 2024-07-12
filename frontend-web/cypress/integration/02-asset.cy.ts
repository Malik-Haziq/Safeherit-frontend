import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';

describe('Automated Test for Asset create, edit or delete', () => {

    const dataFiller = () => {
        
        cy.get('[data-cy="asset-types-list"] > .absolute')
        cy.wait(4000);
        cy.get('.css-b62m3t-container').click();
        cy.get('#react-select-2-listbox').contains('Bank Account').click();
        cy.get('input[placeholder="Asset Name"]').type('my asset')

        cy.get(':nth-child(5) > .rounded-3xl').type('swiss');
        cy.get(':nth-child(6) > .rounded-3xl').type('florida');
        cy.get(':nth-child(7) > .rounded-3xl > .absolute').click();
        cy.get('#react-select-3-option-1').click();
        cy.get(':nth-child(8) > .rounded-3xl').type('345678990');
        cy.get('[data-cy="submit-asset-modal-one-button"]').click();

        cy.get(':nth-child(4) > .rounded-3xl').type('12345');
        cy.get(':nth-child(5) > .rounded-3xl').type('13');
        cy.get(':nth-child(6) > .rounded-3xl').type('15');
        cy.get(':nth-child(7) > .rounded-3xl').type('67');
        cy.get('.rounded-3xl > .absolute').click();
        cy.get('#react-select-5-option-0').click();
        cy.get(':nth-child(9) > .rounded-3xl').type('heya');
        cy.get('[data-cy="submit-asset-modal-two-button"]').click();
        cy.wait(1000);
        cy.contains('Done').click();
      
    };
    const OldAssets = () => {
        cy.get('[data-cy="dashboard-view-my-assets-button"]').should('be.visible').click();
        cy.wait(2000);
        cy.get('#cy-add-asset-button').click();
        dataFiller();
    };
    const NewAssets = () => {
        cy.get('[data-cy="dashboard-view-my-assets-button"]').should('be.visible').click();
        cy.wait(2000);
        cy.get('.primary-btn').click();
        cy.contains('Create Assets').click();
        dataFiller();
        cy.wait(1000);
    };
    const createAsset = () => {
        cy.wait(2000);
        cy.get('[data-cy="total-assets"]').invoke('text').then((value) => {
            // Convert the extracted value to an integer
            const intValue = parseInt(value, 10);
            // Conditionally run the appropriate function
            if (intValue > 0) {
            OldAssets(); // Call the custom Cypress command
            } else {
            NewAssets(); // Call the custom Cypress command
            }
        });
    };
    const deleteAsset = () => {
        cy.get('[data-cy="delete-asset-button"]').eq(0).click();
        cy.get('[data-cy="confirm-button"]').click();
        cy.wait(2000);
    };
    const editAsset = ()=>{
        cy.get('[data-cy="edit-asset-button"]').first().click()
        cy.get(':nth-child(4) > .rounded-3xl').clear().type('12345');
        cy.get(':nth-child(5) > .rounded-3xl').clear().type('13');
        cy.get(':nth-child(6) > .rounded-3xl').clear().type('15');
        cy.get("input[name='Balance']").clear().type('670000')      
        cy.get("input[name='Debit Card PIN']").clear().type('5416')
        cy.get("[data-cy='submit-asset-modal-one-button']").click()
        cy.get('input[name="Website"]').clear().type('executers.surge.sh')
        cy.get("input[name='Login']").clear().type('1241324213')
        cy.get('input[name="Password"]').clear().type('83649386491')
        cy.get('input[name="Others (OTP, 2FA etc)"]').clear().type('my opa')
        cy.get('input[name="Notes"]').clear().type('no notes')
        cy.get('[data-cy="submit-asset-modal-two-button"]').click()
    }
    it('should execute the automated test', () => {
        // Use the static username and password for login
        cy.login('naseerhunter5@gmail.com', 'Naseerhunter5@gmail.com');
        cy.importPrivateKey();
        createAsset();
        editAsset();
        deleteAsset();
    });
});