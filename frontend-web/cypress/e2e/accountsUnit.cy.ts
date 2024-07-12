describe('My Accounts unit testing',()=>{
    beforeEach(() => {
        cy.clearLocalStorage();
        // Set local storage in commands.js
        cy.setLocalStorage()
    });

    it('should validate the name change',()=>{
        cy.fixture('auth.json').then((authData) => {
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
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": authData
                }
            }).as('apiAuthUpdate')
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/sessionActive',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": {
                      "isSessionActive": true
                    }
                }
            }).as('sessionActive');
        })

        cy.visit('https://testing-safeherit.web.app/dashboard/account');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.get('[data-cy="edit-user-profile-button"]').click();

        // // Clear the input field
        cy.get('[data-cy="edit-user-name-field"]').should('be.visible').clear();
        // Type the new name into the input field
        cy.get('[data-cy="edit-user-name-field"]').should('be.visible')
        .type('naseer12')
        .should('have.value', 'naseer12');

        // Click on the save button
        cy.get('[data-cy="select-language-list"] > .absolute').should('be.visible').click();
        cy.get('[data-cy="select-language-list"] > .absolute').should('be.visible').click();
        cy.get('[data-cy="save-changes-of-user-details-button"]').should('be.visible').click();
        cy.wait("@apiAuthUpdate").interceptFormData((formData)=>{
            expect(formData["displayName"]).to.eq('naseer12');
        }).then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
            cy.get('#notistack-snackbar').should('be.visible').contains("Updating user information");
        })

    })
    it('should validate the public/private key change',()=>{
        cy.fixture('auth.json').then((authData) => {
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
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/sessionActive',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": {
                      "isSessionActive": true
                    }
                }
            }).as('sessionActive');
        })
        cy.fixture('asset.json').then((assetData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [assetData]
                }
            }).as('assetList')
            Cypress.on('uncaught:exception', (err, runnable, promise) => {
                // when the exception originated from an unhandled promise
                // rejection, the promise is provided as a third argument
                // you can turn off failing the test in this case
                console.log('Running in exception');
                if (promise) {
                    console.log('Running in promise');
                    return false
                }
                // we still want to ensure there are no other unexpected
                // errors, so we let them fail the test
            })
        })
        cy.intercept({
            method: 'PUT',
            url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/public-key',
        }, {
            statusCode: 200,
            body: {
                "success": true,
                "data": {
                  "isSessionActive": true
                }
            }
        }).as('uploadKey');
        cy.visit('https://testing-safeherit.web.app/dashboard/account');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        

        cy.get('[data-cy="edit-key-icon"]').click();
        cy.get('[data-cy="generate-public/private-key-button"]').should('be.visible').click();
        
        cy.get('.go1888806478').should('contain', 'Generating Public/Private Key');
        cy.get('[data-cy="download-private-key-button"] > span').should('be.visible').click();
        cy.get('.go1888806478').should('contain', 'Keys Generated');
        cy.get('[data-cy="register-generated-public-key-button"]').should('be.visible').click();
        cy.wait("@uploadKey").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
            cy.get('.go1888806478').should('be.visible');
        })
        cy.visit('https://testing-safeherit.web.app/dashboard/account');
    })

})