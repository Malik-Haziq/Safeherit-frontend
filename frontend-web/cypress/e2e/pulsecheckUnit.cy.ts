describe('Pulse check unit testing',()=>{
    beforeEach(() => {
        cy.clearLocalStorage();
        // Set local storage in commands.js
        cy.setLocalStorage()
    });
    it('Create pulse check with success 200',()=>{
        cy.fixture('auth.json').then((authData) => {
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-pulseCheck',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": authData
                }
            }).as('apiPulse')
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
        cy.visit('https://testing-safeherit.web.app/dashboard/pulse');

        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.get('[data-cy="setup-pulse-check-button"]').click()
        cy.get('[data-cy="submit-pulse-modal-one-button"]').click()
        cy.get(':nth-child(11) > :nth-child(1) > [data-cy="select-country-codes"] > ._rightIconStyles_qr9qf_13').click()
        cy.get('#react-select-2-listbox').contains('+92').click()
        cy.get('[data-cy="pulse-check-phone-number"]').type('3270948941')
        cy.get('[data-cy="submit-pulse-modal-two-button"]').click()
        cy.get('[data-cy="submit-pulse-modal-three-button"]').click()
        cy.get('[data-cy="submit-pulse-modal-four-button"]').click()
        cy.get('[data-cy="submit-pulse-success-modal-button"]').click()

        cy.fixture('pulseCheck.json').then((pulseData) => {
            cy.wait("@apiPulse")
                .interceptFormData((formData) => {
                expect(formData["pulseCheckDays"]).to.eq(pulseData.pulseCheckDays.toString());
                expect(formData["pulseCheckEmail1"]).to.eq(pulseData.pulseCheckEmail1);
                expect(formData["pulseCheckPhone1"]).to.eq(pulseData.pulseCheckPhone1);
            }).then((intercept)=>{
                assert(intercept.response.statusCode == 200);
                cy.get('#notistack-snackbar').should('exist').contains("creating pulse check");
                
            })
        })

    })
    it('Create pulse check with unauthorized 401',()=>{
        cy.fixture('auth.json').then((authData) => {
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-pulseCheck',
            }, {
                statusCode: 401,
                body: {
                    "success": false,
                    "message": "Unauthorized"
                }
            }).as('apiPulse')
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
        cy.visit('https://testing-safeherit.web.app/dashboard/pulse');

        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.get('[data-cy="setup-pulse-check-button"]').click()
        cy.get('[data-cy="submit-pulse-modal-one-button"]').click()
        cy.get(':nth-child(11) > :nth-child(1) > [data-cy="select-country-codes"] > ._rightIconStyles_qr9qf_13').click()
        cy.get('#react-select-2-listbox').contains('+92').click()
        cy.get('[data-cy="pulse-check-phone-number"]').type('3270948941')
        cy.get('[data-cy="submit-pulse-modal-two-button"]').click()
        cy.get('[data-cy="submit-pulse-modal-three-button"]').click()
        cy.get('[data-cy="submit-pulse-modal-four-button"]').click()
        cy.wait("@apiPulse").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(401);
            cy.get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar').should('exist').contains("Please login again to continue");
        })

    })
    it('Verify List data of pulse check on frontend',()=>{
        cy.fixture('pulseCheck.json').then((authData) => {
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-pulseCheck',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": authData
                }
            }).as('apiPulse')
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
            cy.visit('https://testing-safeherit.web.app/dashboard/pulse');

            cy.wait("@sessionActive").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@apiAuth").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.get('.justify-center.mb-6 > .justify-between > :nth-child(2)').click()
            cy.get('[data-cy="check-method-Phone"]').click()
            cy.get('.p-5 > :nth-child(1) > :nth-child(2)').should('be.visible').contains(authData.pulseCheckPhone1)
            cy.get('[data-cy="check-method-Email"]').click()
            cy.get('.p-5 > :nth-child(1) > :nth-child(2)').should('be.visible').contains(authData.pulseCheckEmail1)

        })
        
    })
    it('Edit pulse check with success 200',()=>{
        cy.fixture('pulseCheck.json').then((authData) => {
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-pulseCheck',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": authData
                }
            }).as('apiPulse')
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
        cy.visit('https://testing-safeherit.web.app/dashboard/pulse');

        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.get('[data-cy="dashboard-view-pulse-check-button"]').click()
        cy.get('.justify-center.mb-6 > .justify-between > :nth-child(1)').click()
        cy.get('[data-cy="check-method-Phone"]').click()
        cy.get(':nth-child(1) > [data-cy="edit-phone-number-button"]').click()
        cy.get('[data-cy="pulse-check-phone-number"]').clear().type('3270948941')
        cy.get('[data-cy="save-edited-phone-number-button"]').click()
        cy.get('[data-cy="check-method-Email"]').click()
        cy.get(':nth-child(1) > [data-cy="edit-phone-number-button"]').click()
        cy.get('.border-0').clear().type('naseerhunter@gmail.com')
        cy.get('[data-cy="save-edited-phone-number-button"]').click()

        cy.fixture('pulseCheck.json').then((pulseData) => {
            cy.wait("@apiPulse")
                .interceptFormData((formData) => {
                expect(formData["pulseCheckDays"]).to.eq(pulseData.pulseCheckDays.toString());
                expect(formData["pulseCheckValidationRequired"]).to.eq(pulseData.pulseCheckValidationRequired);
            }).then((intercept)=>{
                assert(intercept.response.statusCode == 200);
                cy.get('#notistack-snackbar').should('exist').contains("Pulse check data updated successfully");
                
            })
        })

    })
    it('Edit pulse check with unauthorized 401',()=>{
        cy.fixture('pulseCheck.json').then((authData) => {
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-pulseCheck',
            }, {
                statusCode: 401,
                body: {
                    "success": false,
                    "message": "Unauthorized"
                }
            }).as('apiPulse')
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
        cy.visit('https://testing-safeherit.web.app/dashboard/pulse');

        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.get('[data-cy="dashboard-view-pulse-check-button"]').click()
        cy.get('.justify-center.mb-6 > .justify-between > :nth-child(2)').click()
        cy.wait("@apiPulse").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(401);
            cy.get('#notistack-snackbar').should('exist').contains("Please login again to continue");
        })

    })

})