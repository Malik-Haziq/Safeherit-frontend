describe('Beneficiary Unit Testing', () => {

    beforeEach(() => {
        cy.clearLocalStorage();
        // Set local storage in commands.js
        cy.setLocalStorage()
    });
    const benefObj = {
        "facebook_link": "https://www.facebook.com/zuck/",
        "twitter_username": "https://twitter.com/finkd?lang=en",
        "backup_email2": "w@gmail.com",
        "backup_phone_number": "+92 3244444441",
        "backup_email": "s@gmail.com",
        "personalized_message": "hello I am not here",
        "name": "Naseer 12",
        "phone_number": "+92 3244484651",
        "primary_email": "naseer12@yahoo.com",
        "instagram_username": "https://www.instagram.com/zuck/?hl=en"
    }
    const dataFillerForEdit = ()=>{
        cy.get("input[name='name']").clear().type(benefObj.name);
        cy.get("input[name='primary_email']").clear()
        .type(benefObj.primary_email);
        cy.get("input[name='backup_email']").clear()
        .type(benefObj.backup_email);
        cy.get("input[name='backup_email2']").clear()
        .type(benefObj.backup_email2);
        cy.get("input[name='phone_number']").clear()
        .type(benefObj.phone_number);
        cy.get("input[name='backup_phone_number']").clear()
        .type(benefObj.backup_phone_number);
        cy.get("input[name='facebook_link']").clear()
        .type(benefObj.facebook_link);
        cy.get("input[name='instagram_username']").clear()
        .type(benefObj.instagram_username);
        cy.get("input[name='twitter_username']").clear()
        .type(benefObj.twitter_username);
        cy.get("textarea[name='personalized_message']").clear()
        .type(benefObj.personalized_message);
        cy.get('.gap-1 > .flex > .primary-btn').click()
        cy.get('aside.flex > :nth-child(4)').click()
    }
    const dataFillerForCreate = () => {
        cy.get('[data-cy="generate-public/private-key-button"]').click();
        cy.get('[data-cy="register-generated-public-key-button"]').click();
        cy.get('[data-cy="beneficiary-name-input-field"]').click();
        cy.get('[data-cy="beneficiary-name-input-field"]').type(benefObj.name);
        cy.get('[data-cy="beneficiary-primary-email-input-field"]').click();
        cy.get('[data-cy="beneficiary-primary-email-input-field"]').type(benefObj.primary_email);
    
        cy.get('[data-cy="beneficiary-backup-email-input-field"]').click();
        cy.get('[data-cy="beneficiary-backup-email-input-field"]').type(benefObj.backup_email);
        cy.get('[data-cy="beneficiary-backup-email-2-input-field"]').click();
        cy.get('[data-cy="beneficiary-backup-email-2-input-field"]').type(benefObj.backup_email2);
        cy.get('#react-select-2-input').type('+92');
    
        // Open the dropdown
        cy.get(':nth-child(8) > :nth-child(1) > [data-cy="select-country-codes"]').click();
    
        // Click on the item with text "+92" from the dropdown list
        cy.get('#react-select-2-listbox').contains('+92').click();
        cy.get('[data-cy="beneficiary-phone-number"]').first().should('be.visible').type("3244484651")
    
    
        cy.get(':nth-child(9) > :nth-child(1) > [data-cy="select-country-codes"] > .css-b62m3t-container > .css-15gvdpi-control > .css-hlgwow > .css-19bb58m').click(); 
        cy.get('#react-select-3-listbox').contains('+92').click();
        cy.get('[data-cy="beneficiary-backup-phone-number"]').first().type("3244444441");
        cy.get('.w-5 > .w-full').click();
        cy.get('[data-cy="submit-beneficiary-modal-one-button"]').click();
    
        cy.get('[data-cy="beneficiary-facebook-link-input-field"]').type(benefObj.facebook_link);
        cy.get('[data-cy="beneficiary-instagram-link-input-field"]').type(benefObj.instagram_username);
        cy.get('[data-cy="beneficiary-twitter-link-input-field"]').type(benefObj.twitter_username);
        cy.get('[data-cy="submit-beneficiary-modal-two-button"]').click();
        cy.get('[data-cy="beneficiary-personalized-message"]').type(benefObj.personalized_message);
        cy.get('[data-cy="submit-beneficiary-modal-three-button"]').click();
    }
    // Test cases
    it('List beneficiary with success 200 verify loaded data on frontend', () => {
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
        cy.fixture('beneficiaryList.json').then((beneficiaryData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryData
            }
            }).as('benefList');
            cy.visit('https://testing-safeherit.web.app/dashboard/beneficiaries');
            cy.wait("@sessionActive").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@apiAuth").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@benefList").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.get('[data-cy="number-of-beneficiaries"]').contains('3')
            cy.get('[data-cy="view-beneficiary-details-button"]').contains(beneficiaryData[0].name)
            cy.get('[data-cy="beneficiary-email"]').contains(beneficiaryData[0].primary_email)
            cy.get('[data-cy="beneficiary-phone-number"]').contains(beneficiaryData[0].phone_number)
            cy.get('[data-cy="beneficiary-backup-phone-number"]').contains(beneficiaryData[0].backup_phone_number)
            cy.get('[data-cy="view-beneficiary-details-button"]').contains(beneficiaryData[1].name)
            cy.get('[data-cy="beneficiary-email"]').contains(beneficiaryData[1].primary_email)
            cy.get('[data-cy="beneficiary-phone-number"]').contains(beneficiaryData[1].phone_number)
            cy.get('[data-cy="beneficiary-backup-phone-number"]').contains(beneficiaryData[1].backup_phone_number)
            cy.get('[data-cy="view-beneficiary-details-button"]').contains(beneficiaryData[2].name)
            cy.get('[data-cy="beneficiary-email"]').contains(beneficiaryData[2].primary_email)
            cy.get('[data-cy="beneficiary-phone-number"]').contains(beneficiaryData[2].phone_number)
            cy.get('[data-cy="beneficiary-backup-phone-number"]').contains(beneficiaryData[2].backup_phone_number)
        });
        
    });
    it('Create beneficiary with success 200 ', () => {
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
        cy.fixture('beneficiary.json').then((beneficiaryData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [beneficiaryData]
            }
            }).as('benefList');
            cy.intercept({
                method: 'POST',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryData
                }
            }).as('benefCreate');
            cy.visit('https://testing-safeherit.web.app/dashboard/beneficiaries');
            cy.wait("@sessionActive").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@apiAuth").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@benefList").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            
            cy.get('#cy-add-beneficiary-button').click();
            dataFillerForCreate();

            cy.wait("@benefCreate")
             .interceptFormData((formData) => {
                expect(formData["name"]).to.eq(benefObj.name);
                expect(formData["primary_email"]).to.eq(benefObj.primary_email);
                expect(formData["backup_email"]).to.eq(benefObj.backup_email);
                expect(formData["backup_email2"]).to.eq(benefObj.backup_email2);
                expect(formData["phone_number"]).to.eq(benefObj.phone_number);
                expect(formData["backup_phone_number"]).to.eq(benefObj.backup_phone_number);
                expect(formData["facebook_link"]).to.eq(benefObj.facebook_link);
                expect(formData["instagram_username"]).to.eq(benefObj.instagram_username);
                expect(formData["twitter_username"]).to.eq(benefObj.twitter_username);
            }).then((intercept)=>{
                assert(intercept.response.statusCode == 200);
                cy.get('#notistack-snackbar').should('be.visible').contains("creating beneficiary");
                
            })
            
        });
        
    });
    it('Create beneficiary with unauthorized 401 ', () => {
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
            cy.intercept({
                method: 'POST',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary',
            }, {
                statusCode: 401,
                body: {
                    "success": false,
                    "message": "Unauthorized"
                }
            }).as('benefCreate');
            
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/beneficiaries');
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@benefList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.get('#cy-add-beneficiary-button').click();
        
        dataFillerForCreate();
        cy.wait("@benefCreate").then((intercept) => {
            assert(intercept.response.statusCode == 401);
            cy.get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar').should('exist').contains("Please login again to continue");
        });
    });
    it('Data retrived during Edit beneficiary with success 200 ', () => {
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
        cy.fixture('beneficiary.json').then((beneficiaryData) => {
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": [beneficiaryData]
            }
            }).as('benefList');
            
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=avVocyJpWBrYg0txEIso',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryData
                }
            }).as('getBenefById');
            cy.visit('https://testing-safeherit.web.app/dashboard/beneficiaries');

            cy.wait("@sessionActive").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@apiAuth").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.wait("@benefList").then((intercept)=>{
                expect(intercept.response.statusCode ).to.equal(200);
            })
            cy.get('[data-cy="beneficiary-drop-down-button"]').eq(0).click();
            cy.get('[data-cy="drop-down-edit-button"]').click()
            cy.wait("@getBenefById").then((intercept) => {
                assert(intercept.response.statusCode == 200);
            });
            cy.get("input[value='" + beneficiaryData.name + "']").should('be.visible');
            cy.get("input[value='" + beneficiaryData.primary_email + "']").should('be.visible');
            cy.get("input[value='" + beneficiaryData.backup_email + "']").should('be.visible');
            cy.get("input[value='" + beneficiaryData.backup_email2 + "']").should('be.visible');
            cy.get("input[value='" + beneficiaryData.phone_number + "']").should('be.visible');
            cy.get("input[value='" + beneficiaryData.backup_phone_number + "']").should('be.visible');
            cy.get("input[value='" + beneficiaryData.facebook_link + "']").should('be.visible');
            cy.get("input[value='" + beneficiaryData.instagram_username + "']").should('be.visible');
            cy.get("input[value='" + beneficiaryData.twitter_username + "']").should('be.visible');
            cy.get("textarea[name='personalized_message']").contains(beneficiaryData.personalized_message);

        });
        

    });
    it('Edit beneficiary with success 200 ', () => {
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
            
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=avVocyJpWBrYg0txEIso',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryListData
                }
            }).as('getBenefById');
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryListData
                }
            }).as('updateBenef');
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/beneficiaries');

        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@benefList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.log('Deleting beneficary with unauthorized');
        cy.get('[data-cy="beneficiary-drop-down-button"]').eq(0).click();
        cy.get('[data-cy="drop-down-edit-button"]').click()
        cy.wait("@getBenefById").then((intercept) => {
            assert(intercept.response.statusCode == 200);
        });
        dataFillerForEdit();
        cy.wait("@updateBenef")
            .interceptFormData((formData) => {
            expect(formData["name"]).to.eq(benefObj.name);
            expect(formData["primary_email"]).to.eq(benefObj.primary_email);
            expect(formData["backup_email"]).to.eq(benefObj.backup_email);
            expect(formData["backup_email2"]).to.eq(benefObj.backup_email2);
            expect(formData["phone_number"]).to.eq(benefObj.phone_number);
            expect(formData["backup_phone_number"]).to.eq(benefObj.backup_phone_number);
            expect(formData["facebook_link"]).to.eq(benefObj.facebook_link);
            expect(formData["instagram_username"]).to.eq(benefObj.instagram_username);
            expect(formData["twitter_username"]).to.eq(benefObj.twitter_username);
        }).then((intercept)=>{
            assert(intercept.response.statusCode == 200);
            cy.get('#notistack-snackbar').should('be.visible').contains("Updating Beneficiary");
            
        })

    });
    it('Edit beneficiary with unauthorized 401 ', () => {
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
            
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=avVocyJpWBrYg0txEIso',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryListData
                }
            }).as('getBenefById');
            cy.intercept({
                method: 'PUT',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary',
            }, {
                statusCode: 401,
                body: {
                    "success": false,
                    "message": "Unauthorized"
                }
            }).as('updateBenef401');
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/beneficiaries');

        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@benefList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.log('Deleting beneficary with unauthorized');
        cy.get('[data-cy="beneficiary-drop-down-button"]').eq(0).click();
        cy.get('[data-cy="drop-down-edit-button"]').click()
        cy.wait("@getBenefById").then((intercept) => {
            assert(intercept.response.statusCode == 200);
        });
        dataFillerForEdit();
        cy.wait("@updateBenef401").then((intercept) => {
            assert(intercept.response.statusCode == 401);
            cy.get(':nth-child(2) > .notistack-CollapseWrapper > .notistack-Snackbar > .go1888806478 > #notistack-snackbar').should('exist').contains("Please login again to continue");
        });

    });
    it('Delete beneficiary with success 200', () => {
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
            
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=avVocyJpWBrYg0txEIso',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryListData
                }
            }).as('getBenefById');
            cy.intercept({
                method: 'DELETE',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=avVocyJpWBrYg0txEIso',
            }, {
                statusCode: 200,
                body: {"success":true,"message":"Beneficiary deleted"}
            }).as('deleteBenef');
        });
        cy.visit('https://testing-safeherit.web.app/dashboard/beneficiaries');

        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.log('Deleting beneficary with success');
        cy.get('[data-cy="dashboard-view-beneficiaries-button"]').click();
        cy.wait("@benefList").then((intercept) => {
            expect(intercept.response.statusCode ).to.equal(200);
        });
        cy.get('[data-cy="beneficiary-drop-down-button"]').click();
        cy.get('[data-cy="drop-down-delete-button"]').click()
        cy.wait("@getBenefById").then((intercept) => {
            assert(intercept.response.statusCode ==200);
        });
        cy.get('[data-cy="confirm-button"]').click();
        cy.wait("@deleteBenef").then((intercept) => {
            assert(intercept.response.statusCode ==200);
            cy.get('#notistack-snackbar').should('be.visible').contains("deleting Beneficiary Clifton Sipes");
        });
    });
    it('Delete beneficiary with server error 500 ', () => {
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
            
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=avVocyJpWBrYg0txEIso',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryListData
                }
            }).as('getBenefById');
            cy.intercept('DELETE', 
            'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=avVocyJpWBrYg0txEIso', (req) => {
                req.reply({
                statusCode: 500
                })
            }).as('deleteRequest500');
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
        cy.visit('https://testing-safeherit.web.app/dashboard/beneficiaries');

        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@benefList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.log('Deleting beneficary with server error');
        
        cy.get('[data-cy="dashboard-view-beneficiaries-button"]').click();
        cy.get('[data-cy="beneficiary-drop-down-button"]').eq(0).click();
        cy.get('[data-cy="drop-down-delete-button"]').click();
        cy.wait("@getBenefById").then((intercept) => {
            assert(intercept.response.statusCode == 200);
        });
        
        cy.get('[data-cy="confirm-button"]').click();
        cy.wait("@deleteRequest500").then((intercept) => {
            assert(intercept.response.statusCode == 500);
            cy.get('#notistack-snackbar').should('exist').contains("deleting Beneficiary Clifton Sipes");
        });
    });
    it('Delete beneficiary with unauthorized 401 ', () => {
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
            
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=avVocyJpWBrYg0txEIso',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryListData
                }
            }).as('getBenefById');
            cy.intercept('DELETE', 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=avVocyJpWBrYg0txEIso', (req) => {
                req.reply({
                statusCode: 401,
                body: {
                    "success": false,
                    "message": "Unauthorized"
                }
                })
            }).as('deleteRequest401');
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
        cy.visit('https://testing-safeherit.web.app/dashboard/beneficiaries');

        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@benefList").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.log('Deleting beneficary with unauthorized');
        cy.get('[data-cy="beneficiary-drop-down-button"]').eq(0).click();
        cy.get('[data-cy="drop-down-delete-button"]').click();
        cy.wait("@getBenefById").then((intercept) => {
            assert(intercept.response.statusCode == 200);
        });
        
        cy.get('[data-cy="confirm-button"]').click();
        cy.wait("@deleteRequest401").then((intercept) => {
            assert(intercept.response.statusCode == 401);
            cy.get('#notistack-snackbar').should('exist').contains("deleting Beneficiary Clifton Sipes");

        });

    });
     
     
});
