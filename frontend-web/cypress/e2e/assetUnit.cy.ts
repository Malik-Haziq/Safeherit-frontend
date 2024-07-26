describe('Asset unit testing',()=>{
    beforeEach(() => {
        cy.clearLocalStorage();
        // Set local storage in commands.js
        cy.setLocalStorage()
    });
    const dataFiller = () => {
        
        cy.get('[data-cy="asset-types-list"] > .absolute')
        cy.get('.css-b62m3t-container').click();
        cy.get('#react-select-2-listbox').contains('Bank Account').click();
        cy.get('input[placeholder="Asset Name"]').type('My asset')

        cy.get(':nth-child(5) > .rounded-3xl').type('swiss');
        cy.get(':nth-child(6) > .rounded-3xl').type('florida');
        cy.get(':nth-child(7) > .rounded-3xl > .absolute').click();
        cy.get('#react-select-3-option-1').click();
        cy.get(':nth-child(8) > .rounded-3xl').type('345678990');
        cy.get('#react-select-4-input').type('usd').click()
        cy.get("input[name='Balance']").type('670')      
        cy.get("input[name='Debit Card PIN']").clear().type('5416')
        cy.get('[data-cy="submit-asset-modal-one-button"]').click();

        cy.get(':nth-child(4) > .rounded-3xl').type('12345');
        cy.get(':nth-child(5) > .rounded-3xl').type('13');
        cy.get(':nth-child(6) > .rounded-3xl').type('15');
        cy.get(':nth-child(7) > .rounded-3xl').type('67');
        cy.get('.rounded-3xl > .absolute').click();
        cy.get('#react-select-5-option-0').click();
        cy.get(':nth-child(9) > .rounded-3xl').type('hey This is my Asset');
        cy.get('[data-cy="submit-asset-modal-two-button"]').click();      
    };
    const dataFillerForEdit = ()=>{
        cy.get('[data-cy="edit-asset-button"]').click({multiple:true})
        cy.get(':nth-child(4) > .rounded-3xl').clear().type('12345');
        cy.get(':nth-child(5) > .rounded-3xl').clear().type('13');
        cy.get(':nth-child(6) > .rounded-3xl').clear().type('15');
        cy.get("input[name='Balance']").type('7000')      
        cy.get("input[name='Debit Card PIN']").clear().type('5416')
        cy.get("[data-cy='submit-asset-modal-one-button']").click()
        cy.get('input[name="Website"]').clear().type('executers.surge.sh')
        cy.get("input[name='Login']").clear().type('1241324213')
        cy.get('input[name="Password"]').clear().type('83649386491')
        cy.get('input[name="Others (OTP, 2FA etc)"]').clear().type('my opa')
        cy.get('input[name="Notes"]').clear().type('no notes')
        cy.get('[data-cy="submit-asset-modal-two-button"]').click()
    }

    it('List asset with success 200 verify loaded data on frontend',()=>{

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
        cy.fixture('beneficiary.json').then((beneficiaryListData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [beneficiaryListData]
                }
            }).as('benefList');
            
        });
        cy.fixture('currency.json').then((currencyData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset/currency-rates',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": currencyData
                }
            }).as('currencyList');
            
        });
        cy.fixture('asset.json').then((assetListData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [assetListData]
                }
            }).as('assetList');
            cy.visit('https://testing-safeherit.web.app/dashboard/assets');
            cy.wait("@sessionActive").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@apiAuth").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@benefList").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@currencyList").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@assetList").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.get('[data-cy="number-of-assets"]').contains('1')
            cy.get('[data-cy="view-asset-details-button"]').contains('My Bank Asset')
            cy.get('[data-cy="asset-type"]').contains('Bank Account')
            cy.get('[data-cy="asset-value"]').contains('USD 6,700')
            cy.get('[data-cy="view-asset-details-button-type-icon"]')
            .should('have.attr', 'src', '/assets/bank-80f490d7.svg')
            .should('have.attr', 'alt', 'real estate icon');
        });

    })
    it('create Asset with success 200',()=>{

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
        cy.fixture('beneficiary.json').then((beneficiaryListData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [beneficiaryListData]
                }
            }).as('benefList');
            
        });
        cy.fixture('asset.json').then((assetListData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [assetListData]
                }
            }).as('assetList');
            cy.intercept({
                method: 'POST',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": assetListData
                }
            }).as('assetCreate');
            
        });
        cy.fixture('currency.json').then((currencyData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset/currency-rates',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": currencyData
                }
            }).as('currencyList');
            
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/assets');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@benefList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@currencyList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@assetList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.get('.mt-11 > :nth-child(2) > .px-auto').click();
        cy.get('#cy-add-asset-button').click();
        dataFiller();
        cy.contains('Done').click();
        cy.wait("@assetCreate").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
            cy.get('#notistack-snackbar').should('be.visible').contains("Creating Asset");
        })

    })
    it('create Asset with unauthorized 401',()=>{

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
        cy.fixture('beneficiary.json').then((beneficiaryListData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [beneficiaryListData]
                }
            }).as('benefList');
            
        });
        cy.fixture('asset.json').then((assetListData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [assetListData]
                }
            }).as('assetList');
            cy.intercept({
                method: 'POST',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset',
            }, {
                statusCode: 401,
                body: {
                    "success": false,
                    "message": "Unauthorized"
                }
            }).as('assetCreate');
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
            
        });
        cy.fixture('currency.json').then((currencyData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset/currency-rates',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": currencyData
                }
            }).as('currencyList');
            
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/assets');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@benefList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@currencyList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@assetList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.get('.mt-11 > :nth-child(2) > .px-auto').click();
        cy.get('#cy-add-asset-button').click();
        dataFiller();
        cy.wait("@assetCreate").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(401);
            cy.get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar').should('exist').contains("Please login again to continue");
        })

    })
    it('Edit Asset with success 200',()=>{

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
        cy.fixture('beneficiary.json').then((beneficiaryListData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [beneficiaryListData]
                }
            }).as('benefList');
            
        });
        cy.fixture('asset.json').then((assetListData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [assetListData]
                }
            }).as('assetList');
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset?id=I1d22FwHYtSqR6FxD6q4',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": assetListData
                }
            }).as('assetById');
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": assetListData
                }
            }).as('assetEdit');
            
        });
        cy.fixture('currency.json').then((currencyData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset/currency-rates',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": currencyData
                }
            }).as('currencyList');
            
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/assets');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@benefList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@currencyList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@assetList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.get('.mt-11 > :nth-child(2) > .px-auto').click();
        dataFillerForEdit();
        cy.wait("@assetEdit").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
            cy.get('#notistack-snackbar').should('be.visible').contains("Updating Asset");
        })

    })
    it('Edit Asset with unauthorized 401',()=>{

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
        cy.fixture('beneficiary.json').then((beneficiaryListData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [beneficiaryListData]
                }
            }).as('benefList');
            
        });
        cy.fixture('asset.json').then((assetListData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [assetListData]
                }
            }).as('assetList');
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset?id=I1d22FwHYtSqR6FxD6q4',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": assetListData
                }
            }).as('assetById');
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset',
            }, {
                statusCode: 401,
                body: {
                    "success": false,
                    "message": "Unauthorized"
                }
            }).as('assetEdit');
            
        });
        cy.fixture('currency.json').then((currencyData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset/currency-rates',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": currencyData
                }
            }).as('currencyList');
            
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/assets');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@benefList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@currencyList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@assetList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.get('.mt-11 > :nth-child(2) > .px-auto').click();
        dataFillerForEdit();
        cy.wait("@assetEdit").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(401);
            cy.get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar')
            cy.get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar').should('exist').contains("Please login again to continue");
        })

    })

})