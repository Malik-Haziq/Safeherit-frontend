describe('Validator unit testing',()=>{
    beforeEach(() => {
        cy.clearLocalStorage();
        // Set local storage in commands.js
        cy.setLocalStorage()
    });
    const validatorObj = {
        "facebook_link": "https://www.facebook.com/zuck/",
        "twitter_username": "https://twitter.com/finkd?lang=en",
        "backup_email2": "w@gmail.com",
        "backup_email": "s@gmail.com",
        "personalized_message": "hello I am not here",
        "name": "Naseer 12",
        "phone_number": "+92 3244484651",
        "primary_email": "naseer12@yahoo.com",
        "instagram_username": "https://www.instagram.com/zuck/?hl=en"
    }
    const dataFillerForCreate = () => {
        const randomEmail = 'naseer12@gmail.com';
        const randomName = 'naseer12';
        cy.get(':nth-child(4) > .rounded-3xl').type(validatorObj.name);
        cy.get(':nth-child(5) > .rounded-3xl').type(validatorObj.primary_email);
        cy.get(':nth-child(6) > .rounded-3xl').type(validatorObj.backup_email);
        cy.get(':nth-child(7) > .rounded-3xl').type(validatorObj.backup_email2);
        cy.get(':nth-child(8) > :nth-child(1) > [data-cy="select-country-codes"]').click(); // Open the dropdown
        cy.get('#react-select-2-listbox').contains('+92').click();  // Click on the item with text "+92" from the dropdown list
        cy.get('[data-cy="validator-phone-number"]').first().type("3244484651");
        cy.get('[data-cy="submit-validator-modal-one-button"]').click();
    
        cy.get('[data-cy="validator-facebook-link-input-field"]').type(validatorObj.facebook_link);
        cy.get('[data-cy="validator-instagram-link-input-field"]').type(validatorObj.instagram_username);
        cy.get('[data-cy="validator-twitter-link-input-field"]').type(validatorObj.twitter_username);
        cy.get('[data-cy="submit-validator-modal-two-button"]').click();
        cy.get('[data-cy="validator-personalized-message"]').type(validatorObj.personalized_message);
        cy.get('[data-cy="submit-validator-modal-three-button"]').click();
    }
    const dataFillerForEdit = () => {
        cy.get("input[name='name']").clear()
        .type(validatorObj.name)
        cy.get("input[name='primary_email']").clear()
        .type(validatorObj.primary_email)
        cy.get("input[name='backup_email']").clear()
        .type(validatorObj.backup_email)
        cy.get("input[name='backup_email2']").clear()
        .type(validatorObj.backup_email2)
        cy.get("input[name='phone_number']").clear()
        .type(validatorObj.phone_number)
        cy.get("input[name='backup_phone_number']").clear()
        .type('+92 3255115998')
        cy.get("input[name='facebook_link']").clear()
        .type(validatorObj.facebook_link)
        cy.get("input[name='instagram_username']").clear()
        .type(validatorObj.instagram_username)
        cy.get("input[name='twitter_username']").clear()
        .type(validatorObj.twitter_username)
        cy.get("textarea[name='personalized_message']").clear()
        .type(validatorObj.personalized_message)
        cy.get('.primary-btn').click()
    };

    it.only('List beneficiary with success 200 verify loaded data on frontend', () => {
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
        cy.fixture('validatorList.json').then((validatorData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": validatorData
            }
            }).as('validatorList');
            cy.visit('https://testing-safeherit.web.app/dashboard/validators');
            cy.wait("@sessionActive").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@apiAuth").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@validatorList").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.get('[data-cy="total-validators"]').contains('2')
            cy.get(':nth-child(2) > .items-center > [data-cy="view-validator-button"]').contains(validatorData[0].name)
            cy.get(':nth-child(2) > [data-cy="validator-email"]').contains(validatorData[0].primary_email)
            cy.get('[data-cy="validator-phone-number"]').contains(validatorData[0].phone_number)
            cy.get(':nth-child(3) > .items-center > [data-cy="view-validator-button"]').contains(validatorData[1].name)
            cy.get(':nth-child(3) > [data-cy="validator-email"]').contains(validatorData[1].primary_email)
            cy.get('[data-cy="validator-phone-number"]').contains(validatorData[1].phone_number)
        });
        
    });
    it('create validator with success 200',()=>{

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
        cy.fixture('validator.json').then((validatorData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [validatorData]
            }
            }).as('validatorList');
            cy.intercept({
                method: 'POST',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": validatorData
                }
            }).as('validatorCreate');
            
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/validators');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })

        cy.get('#cy-add-validator-button').click();
        dataFillerForCreate();
        cy.wait("@validatorCreate")
            .interceptFormData((formData) => {
            expect(formData["name"]).to.eq(validatorObj.name);
            expect(formData["primary_email"]).to.eq(validatorObj.primary_email);
            expect(formData["backup_email"]).to.eq(validatorObj.backup_email);
            expect(formData["backup_email2"]).to.eq(validatorObj.backup_email2);
            expect(formData["phone_number"]).to.eq(validatorObj.phone_number);
            expect(formData["facebook_link"]).to.eq(validatorObj.facebook_link);
            expect(formData["instagram_username"]).to.eq(validatorObj.instagram_username);
            expect(formData["twitter_username"]).to.eq(validatorObj.twitter_username);
            expect(formData["personalized_message"]).to.eq(validatorObj.personalized_message);
        }).then((intercept)=>{
            assert(intercept.response.statusCode == 200);
            cy.get('#notistack-snackbar').should('be.visible').contains("Creating validator");
            
        })
    })
    it('create validator with unauthorized 401',()=>{

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
        cy.fixture('validator.json').then((validatorData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [validatorData]
            }
            }).as('validatorList');
            cy.intercept({
                method: 'POST',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator',
            }, {
                statusCode: 401,
                body: {
                    "success": false,
                    "message": "Unauthorized"
                }
            }).as('validatorCreate');
            
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/validators');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })

        cy.get('#cy-add-validator-button').click();
        dataFillerForCreate();
        cy.wait("@validatorCreate").then((intercept) => {
            assert(intercept.response.statusCode == 401);
            cy.get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar').should('exist').contains("Please login again to continue");
        });
    })
    it('Data retrived during Edit validator with success 200 ', () => {
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
        cy.fixture('validator.json').then((validatorData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [validatorData]
            }
            }).as('validatorList');
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator?id=EbOkABLHwV5P4csyIFiR',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": validatorData
                }
            }).as('getValidatorById');
            cy.visit('https://testing-safeherit.web.app/dashboard/validators');
            cy.wait("@sessionActive").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@apiAuth").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })

            cy.get('body > div:nth-child(2) > div:nth-child(1) > section:nth-child(2) > div:nth-child(2) > section:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)').click()
            cy.get('[data-cy="drop-down-edit-button"]').click()
            cy.wait("@getValidatorById").then((intercept) => {
                assert(intercept.response.statusCode == 200);
            });
            cy.get("input[value='" + validatorData.name + "']").should('be.visible');
            cy.get("input[value='" + validatorData.primary_email + "']").should('be.visible');
            cy.get("input[value='" + validatorData.backup_email + "']").should('be.visible');
            cy.get("input[value='" + validatorData.backup_email2 + "']").should('be.visible');
            cy.get("input[value='" + validatorData.phone_number + "']").should('be.visible');
            cy.get("input[value='" + validatorData.facebook_link + "']").should('be.visible');
            cy.get("input[value='" + validatorData.instagram_username + "']").should('be.visible');
            cy.get("input[value='" + validatorData.twitter_username + "']").should('be.visible');
            cy.get("textarea[name='personalized_message']").contains(validatorData.personalized_message);

        });
        

    });
    it('Edit validator with success 200',()=>{

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
        cy.fixture('validator.json').then((validatorData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [validatorData]
            }
            }).as('validatorList');
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator?id=EbOkABLHwV5P4csyIFiR',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": validatorData
                }
            }).as('getValidatorById');
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": validatorData
                }
            }).as('validatorEdit');
            
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/validators');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })

        cy.get('body > div:nth-child(2) > div:nth-child(1) > section:nth-child(2) > div:nth-child(2) > section:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)').click()
        cy.get('[data-cy="drop-down-edit-button"]').click()
        cy.wait("@getValidatorById").then((intercept) => {
            assert(intercept.response.statusCode == 200);
        });
        dataFillerForEdit();
        cy.wait("@validatorEdit")
            .interceptFormData((formData) => {
            expect(formData["name"]).to.eq(validatorObj.name);
            expect(formData["primary_email"]).to.eq(validatorObj.primary_email);
            expect(formData["backup_email"]).to.eq(validatorObj.backup_email);
            expect(formData["backup_email2"]).to.eq(validatorObj.backup_email2);
            expect(formData["phone_number"]).to.eq(validatorObj.phone_number);
            expect(formData["facebook_link"]).to.eq(validatorObj.facebook_link);
            expect(formData["instagram_username"]).to.eq(validatorObj.instagram_username);
            expect(formData["twitter_username"]).to.eq(validatorObj.twitter_username);
            expect(formData["personalized_message"]).to.eq(validatorObj.personalized_message);
        }).then((intercept)=>{
            assert(intercept.response.statusCode == 200);
            cy.get('#notistack-snackbar').should('be.visible').contains("Updating validator");
            
        })
    })
    it('Edit validator unauthorized 401',()=>{

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
        cy.fixture('validator.json').then((validatorData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [validatorData]
            }
            }).as('validatorList');
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator?id=EbOkABLHwV5P4csyIFiR',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": validatorData
                }
            }).as('getValidatorById');
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator',
            }, {
                statusCode: 401,
                body:{
                    "success": false,
                    "message": "Unauthorized"
                }
            }).as('validatorEdit');
            
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/validators');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })

        cy.get('body > div:nth-child(2) > div:nth-child(1) > section:nth-child(2) > div:nth-child(2) > section:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)').click()
        cy.get('[data-cy="drop-down-edit-button"]').click()
        cy.wait("@getValidatorById").then((intercept) => {
            assert(intercept.response.statusCode == 200);
        });
        dataFillerForEdit();
        cy.wait("@validatorEdit").then((intercept) => {
            assert(intercept.response.statusCode == 401);
            cy.get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar').should('be.visible')
            .contains("Please login again to continue")
        });
    })
    it('Delete validator with success 200', () => {
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
        cy.fixture('validator.json').then((validatorData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [validatorData]
            }
            }).as('validatorList');
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator?id=EbOkABLHwV5P4csyIFiR',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": validatorData
                }
            }).as('getValidatorById');
            cy.intercept({
                method: 'DELETE',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator?id=EbOkABLHwV5P4csyIFiR',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "message": "Validator deleted"
                }
            }).as('deleteValidator');
            
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/validators');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.log('Deleting Validator with success');
        cy.get('body > div:nth-child(2) > div:nth-child(1) > section:nth-child(2) > div:nth-child(2) > section:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)').click()
        cy.get('[data-cy="drop-down-delete-button"]').click()
        cy.wait("@getValidatorById").then((intercept) => {
            assert(intercept.response.statusCode ==200);
        });
        cy.get("[data-cy='confirm-button'").click()
        cy.wait("@deleteValidator").then((intercept) => {
            assert(intercept.response.statusCode ==200);
            // cy.get('#notistack-snackbar').should('be.visible').contains("deleting Beneficiary Joshua Reichert");
        });
        
    });
    it('Delete validator with unauthorized 401', () => {
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
        cy.fixture('validator.json').then((validatorData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [validatorData]
            }
            }).as('validatorList');
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator?id=EbOkABLHwV5P4csyIFiR',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": validatorData
                }
            }).as('getValidatorById');
            cy.intercept({
                method: 'DELETE',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator?id=EbOkABLHwV5P4csyIFiR',
            }, {
                statusCode: 401,
                body: {
                    "success": false,
                    "message": "Unauthorized"
                }
            }).as('deleteValidator');
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
        cy.visit('https://testing-safeherit.web.app/dashboard/validators');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.log('Deleting Validator with success');
        cy.get('body > div:nth-child(2) > div:nth-child(1) > section:nth-child(2) > div:nth-child(2) > section:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(5) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > img:nth-child(1)').click()
        cy.get('[data-cy="drop-down-delete-button"]').click()
        cy.wait("@getValidatorById").then((intercept) => {
            assert(intercept.response.statusCode ==200);
        });
        cy.get("[data-cy='confirm-button'").click()
        cy.wait("@deleteValidator").then((intercept) => {
            assert(intercept.response.statusCode == 401);
        });
        
    });





})