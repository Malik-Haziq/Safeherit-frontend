
import '../support/commands';
import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';

describe('Open Website, Login, and Fill Username and Password', () => {

    beforeEach(() => {
        // Visit the website
        // cy.login('naseerhunter5@gmail.com', 'naseerhunter5@gmail.comV');
        // cy.importPrivateKey(); // we have to faked every api for login and import key.
    });

    const dataFillerForEdit = ()=>{
        cy.get("input[name='name']").clear().type('hasnat')
        cy.get("input[name='primary_email']").clear()
        .type('hasnat12@gmail.com')
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
    }
    const editBenef = ()=>{
        const editUrl = 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary';
        cy.fixture('beneficiaryList.json').then((beneficiaryListData) => {

            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary/list',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryListData
                }
            }).as('getSessionData');
            cy.intercept({
                method: 'PUT',
                url: editUrl,
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryListData
                }
            }).as('updateBenef');
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=4B1PO9Jroz8eXtoi0Vwa',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryListData
                }
            }).as('getBenefById');
            cy.intercept('PUT', editUrl, (req) => {
                req.reply({
                  statusCode: 500
                });
            }).as('editRequest500');
            cy.intercept('PUT', editUrl, (req) => {
                req.reply({
                    statusCode: 401,
                    body: {
                    "success": false,
                    "message": "Unauthorized"
                    },
                });
            }).as('editRequest401');
        });
        // ----------------------------Edit success----------------------------;
        cy.get('[data-cy="dashboard-view-beneficiaries-button"]').click();
        cy.wait(5000);
        cy.wait("@getSessionData").then((intercept) => {
            expect(intercept.response.statusCode ).to.equal(200);
        });

        cy.get('[data-cy="beneficiary-drop-down-button"]').eq(0).click();
        cy.get('[data-cy="drop-down-edit-button"]').click()
        dataFillerForEdit();
        cy.wait("@updateBenef").then((intercept) => {
            assert(intercept.response.statusCode ==200);
            cy.get('#notistack-snackbar').should('be.visible').contains("Updating Beneficiary");
        });
        // ----------------------------Edit as Server error----------------------------;
        cy.log('Edit beneficary with server error');
        cy.get('[data-cy="beneficiary-drop-down-button"]').eq(0).click();
        cy.get('[data-cy="drop-down-edit-button"]').click()
        dataFillerForEdit();
        cy.wait("@editRequest500").then((intercept) => {
            assert(intercept.response.statusCode == 500);
        });
        // ----------------------------Edit as unauthorized----------------------------;
        cy.log('Edit beneficary with unauthorized');


    }
    const deleteBenef = () => {
        cy.fixture('beneficiaryList.json').then((beneficiaryListData) => {
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
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": {
                        "createdByAdmin": false,
                        "passwordStrengthScore": 30,
                        "isSuperAdmin": false,
                        "language": "en",
                        "isAdmin": false,
                        "accountStatus": "Active",
                        "uid": "UEKc7kJQzWUhPQmP4HoAUFwFgnS2",
                        "createdAt": {
                            "_seconds": 1714524126,
                            "_nanoseconds": 432000000
                        },
                        "isOwner": true,
                        "pulseCheckActive": false,
                        "email": "naseerhunter5@gmail.com",
                        "isBeneficiary": false,
                        "isValidator": false,
                        "stripeCustomerId": "cus_P8KP5eRA4ya46g",
                        "periodStart": 1714524253,
                        "periodEnd": 1746060253,
                        "subscriptionLogs": [
                            {
                                "id": "sub_1PBRHNH6SmmOycjmKb97AgxV",
                                "object": "subscription",
                                "application": null,
                                "application_fee_percent": null,
                                "automatic_tax": {
                                    "enabled": false,
                                    "liability": null
                                },
                                "billing_cycle_anchor": 1714524253,
                                "billing_cycle_anchor_config": null,
                                "billing_thresholds": null,
                                "cancel_at": null,
                                "cancel_at_period_end": false,
                                "canceled_at": null,
                                "cancellation_details": {
                                    "comment": null,
                                    "feedback": null,
                                    "reason": null
                                },
                                "collection_method": "charge_automatically",
                                "created": 1714524253,
                                "currency": "usd",
                                "current_period_end": 1746060253,
                                "current_period_start": 1714524253,
                                "customer": "cus_P8KP5eRA4ya46g",
                                "days_until_due": null,
                                "default_payment_method": null,
                                "default_source": null,
                                "default_tax_rates": [],
                                "description": null,
                                "discount": null,
                                "discounts": [],
                                "ended_at": null,
                                "invoice_settings": {
                                    "account_tax_ids": null,
                                    "issuer": {
                                        "type": "self"
                                    }
                                },
                                "items": {
                                    "object": "list",
                                    "data": [
                                        {
                                            "id": "si_Q1UFwAJ5hyfWPz",
                                            "object": "subscription_item",
                                            "billing_thresholds": null,
                                            "created": 1714524254,
                                            "discounts": [],
                                            "metadata": {},
                                            "plan": {
                                                "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                                "object": "plan",
                                                "active": true,
                                                "aggregate_usage": null,
                                                "amount": 19900,
                                                "amount_decimal": "19900",
                                                "billing_scheme": "per_unit",
                                                "created": 1701478693,
                                                "currency": "usd",
                                                "interval": "year",
                                                "interval_count": 1,
                                                "livemode": false,
                                                "metadata": {},
                                                "meter": null,
                                                "nickname": null,
                                                "product": "prod_P6vNk5LPKa2C3M",
                                                "tiers_mode": null,
                                                "transform_usage": null,
                                                "trial_period_days": null,
                                                "usage_type": "licensed"
                                            },
                                            "price": {
                                                "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                                "object": "price",
                                                "active": true,
                                                "billing_scheme": "per_unit",
                                                "created": 1701478693,
                                                "currency": "usd",
                                                "custom_unit_amount": null,
                                                "livemode": false,
                                                "lookup_key": "yearly",
                                                "metadata": {},
                                                "nickname": null,
                                                "product": "prod_P6vNk5LPKa2C3M",
                                                "recurring": {
                                                    "aggregate_usage": null,
                                                    "interval": "year",
                                                    "interval_count": 1,
                                                    "meter": null,
                                                    "trial_period_days": null,
                                                    "usage_type": "licensed"
                                                },
                                                "tax_behavior": "unspecified",
                                                "tiers_mode": null,
                                                "transform_quantity": null,
                                                "type": "recurring",
                                                "unit_amount": 19900,
                                                "unit_amount_decimal": "19900"
                                            },
                                            "quantity": 1,
                                            "subscription": "sub_1PBRHNH6SmmOycjmKb97AgxV",
                                            "tax_rates": []
                                        }
                                    ],
                                    "has_more": false,
                                    "total_count": 1,
                                    "url": "/v1/subscription_items?subscription=sub_1PBRHNH6SmmOycjmKb97AgxV"
                                },
                                "latest_invoice": "in_1PBRHNH6SmmOycjm9dBBZqMG",
                                "livemode": false,
                                "metadata": {},
                                "next_pending_invoice_item_invoice": null,
                                "on_behalf_of": null,
                                "pause_collection": null,
                                "payment_settings": {
                                    "payment_method_options": {
                                        "acss_debit": null,
                                        "bancontact": null,
                                        "card": {
                                            "network": null,
                                            "request_three_d_secure": "automatic"
                                        },
                                        "customer_balance": null,
                                        "konbini": null,
                                        "sepa_debit": null,
                                        "us_bank_account": null
                                    },
                                    "payment_method_types": null,
                                    "save_default_payment_method": "off"
                                },
                                "pending_invoice_item_interval": null,
                                "pending_setup_intent": null,
                                "pending_update": null,
                                "plan": {
                                    "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                    "object": "plan",
                                    "active": true,
                                    "aggregate_usage": null,
                                    "amount": 19900,
                                    "amount_decimal": "19900",
                                    "billing_scheme": "per_unit",
                                    "created": 1701478693,
                                    "currency": "usd",
                                    "interval": "year",
                                    "interval_count": 1,
                                    "livemode": false,
                                    "metadata": {},
                                    "meter": null,
                                    "nickname": null,
                                    "product": "prod_P6vNk5LPKa2C3M",
                                    "tiers_mode": null,
                                    "transform_usage": null,
                                    "trial_period_days": null,
                                    "usage_type": "licensed"
                                },
                                "quantity": 1,
                                "schedule": null,
                                "start_date": 1714524253,
                                "status": "incomplete",
                                "test_clock": null,
                                "transfer_data": null,
                                "trial_end": null,
                                "trial_settings": {
                                    "end_behavior": {
                                        "missing_payment_method": "create_invoice"
                                    }
                                },
                                "trial_start": null
                            },
                            {
                                "id": "sub_1PBRHNH6SmmOycjmKb97AgxV",
                                "object": "subscription",
                                "application": null,
                                "application_fee_percent": null,
                                "automatic_tax": {
                                    "enabled": false,
                                    "liability": null
                                },
                                "billing_cycle_anchor": 1714524253,
                                "billing_cycle_anchor_config": null,
                                "billing_thresholds": null,
                                "cancel_at": null,
                                "cancel_at_period_end": false,
                                "canceled_at": null,
                                "cancellation_details": {
                                    "comment": null,
                                    "feedback": null,
                                    "reason": null
                                },
                                "collection_method": "charge_automatically",
                                "created": 1714524253,
                                "currency": "usd",
                                "current_period_end": 1746060253,
                                "current_period_start": 1714524253,
                                "customer": "cus_P8KP5eRA4ya46g",
                                "days_until_due": null,
                                "default_payment_method": "pm_1PBRHMH6SmmOycjmBbJaMjhc",
                                "default_source": null,
                                "default_tax_rates": [],
                                "description": null,
                                "discount": null,
                                "discounts": [],
                                "ended_at": null,
                                "invoice_settings": {
                                    "account_tax_ids": null,
                                    "issuer": {
                                        "type": "self"
                                    }
                                },
                                "items": {
                                    "object": "list",
                                    "data": [
                                        {
                                            "id": "si_Q1UFwAJ5hyfWPz",
                                            "object": "subscription_item",
                                            "billing_thresholds": null,
                                            "created": 1714524254,
                                            "discounts": [],
                                            "metadata": {},
                                            "plan": {
                                                "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                                "object": "plan",
                                                "active": true,
                                                "aggregate_usage": null,
                                                "amount": 19900,
                                                "amount_decimal": "19900",
                                                "billing_scheme": "per_unit",
                                                "created": 1701478693,
                                                "currency": "usd",
                                                "interval": "year",
                                                "interval_count": 1,
                                                "livemode": false,
                                                "metadata": {},
                                                "meter": null,
                                                "nickname": null,
                                                "product": "prod_P6vNk5LPKa2C3M",
                                                "tiers_mode": null,
                                                "transform_usage": null,
                                                "trial_period_days": null,
                                                "usage_type": "licensed"
                                            },
                                            "price": {
                                                "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                                "object": "price",
                                                "active": true,
                                                "billing_scheme": "per_unit",
                                                "created": 1701478693,
                                                "currency": "usd",
                                                "custom_unit_amount": null,
                                                "livemode": false,
                                                "lookup_key": "yearly",
                                                "metadata": {},
                                                "nickname": null,
                                                "product": "prod_P6vNk5LPKa2C3M",
                                                "recurring": {
                                                    "aggregate_usage": null,
                                                    "interval": "year",
                                                    "interval_count": 1,
                                                    "meter": null,
                                                    "trial_period_days": null,
                                                    "usage_type": "licensed"
                                                },
                                                "tax_behavior": "unspecified",
                                                "tiers_mode": null,
                                                "transform_quantity": null,
                                                "type": "recurring",
                                                "unit_amount": 19900,
                                                "unit_amount_decimal": "19900"
                                            },
                                            "quantity": 1,
                                            "subscription": "sub_1PBRHNH6SmmOycjmKb97AgxV",
                                            "tax_rates": []
                                        }
                                    ],
                                    "has_more": false,
                                    "total_count": 1,
                                    "url": "/v1/subscription_items?subscription=sub_1PBRHNH6SmmOycjmKb97AgxV"
                                },
                                "latest_invoice": "in_1PBRHNH6SmmOycjm9dBBZqMG",
                                "livemode": false,
                                "metadata": {},
                                "next_pending_invoice_item_invoice": null,
                                "on_behalf_of": null,
                                "pause_collection": null,
                                "payment_settings": {
                                    "payment_method_options": {
                                        "acss_debit": null,
                                        "bancontact": null,
                                        "card": {
                                            "network": null,
                                            "request_three_d_secure": "automatic"
                                        },
                                        "customer_balance": null,
                                        "konbini": null,
                                        "sepa_debit": null,
                                        "us_bank_account": null
                                    },
                                    "payment_method_types": null,
                                    "save_default_payment_method": "off"
                                },
                                "pending_invoice_item_interval": null,
                                "pending_setup_intent": null,
                                "pending_update": null,
                                "plan": {
                                    "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                    "object": "plan",
                                    "active": true,
                                    "aggregate_usage": null,
                                    "amount": 19900,
                                    "amount_decimal": "19900",
                                    "billing_scheme": "per_unit",
                                    "created": 1701478693,
                                    "currency": "usd",
                                    "interval": "year",
                                    "interval_count": 1,
                                    "livemode": false,
                                    "metadata": {},
                                    "meter": null,
                                    "nickname": null,
                                    "product": "prod_P6vNk5LPKa2C3M",
                                    "tiers_mode": null,
                                    "transform_usage": null,
                                    "trial_period_days": null,
                                    "usage_type": "licensed"
                                },
                                "quantity": 1,
                                "schedule": null,
                                "start_date": 1714524253,
                                "status": "active",
                                "test_clock": null,
                                "transfer_data": null,
                                "trial_end": null,
                                "trial_settings": {
                                    "end_behavior": {
                                        "missing_payment_method": "create_invoice"
                                    }
                                },
                                "trial_start": null
                            }
                        ],
                        "paymentStatus": "Paid",
                        "plan": "yearly",
                        "paymentLogs": [
                            {
                                "id": "cs_test_a1LJ72M4rnCt8LNMMVfx3yXPWFl9LBN7FP34LGtZjpyroRqBfke3C6s7sb",
                                "object": "checkout.session",
                                "after_expiration": null,
                                "allow_promotion_codes": null,
                                "amount_subtotal": 19900,
                                "amount_total": 19900,
                                "automatic_tax": {
                                    "enabled": false,
                                    "liability": null,
                                    "status": null
                                },
                                "billing_address_collection": "auto",
                                "cancel_url": "https://testing-safeherit.web.app/pricing?success=false",
                                "client_reference_id": null,
                                "client_secret": null,
                                "consent": null,
                                "consent_collection": null,
                                "created": 1714524200,
                                "currency": "usd",
                                "currency_conversion": null,
                                "custom_fields": [],
                                "custom_text": {
                                    "after_submit": null,
                                    "shipping_address": null,
                                    "submit": null,
                                    "terms_of_service_acceptance": null
                                },
                                "customer": "cus_P8KP5eRA4ya46g",
                                "customer_creation": null,
                                "customer_details": {
                                    "address": {
                                        "city": null,
                                        "country": "PK",
                                        "line1": null,
                                        "line2": null,
                                        "postal_code": null,
                                        "state": null
                                    },
                                    "email": "naseerhunter5@gmail.com",
                                    "name": "ahmed",
                                    "phone": null,
                                    "tax_exempt": "none",
                                    "tax_ids": []
                                },
                                "customer_email": null,
                                "expires_at": 1714610599,
                                "invoice": "in_1PBRHNH6SmmOycjm9dBBZqMG",
                                "invoice_creation": null,
                                "livemode": false,
                                "locale": null,
                                "metadata": {
                                    "user_email": "naseerhunter5@gmail.com",
                                    "plan": "yearly",
                                    "mode": "subscription"
                                },
                                "mode": "subscription",
                                "payment_intent": null,
                                "payment_link": null,
                                "payment_method_collection": "always",
                                "payment_method_configuration_details": null,
                                "payment_method_options": {
                                    "card": {
                                        "request_three_d_secure": "automatic"
                                    }
                                },
                                "payment_method_types": [
                                    "card"
                                ],
                                "payment_status": "paid",
                                "phone_number_collection": {
                                    "enabled": false
                                },
                                "recovered_from": null,
                                "saved_payment_method_options": {
                                    "allow_redisplay_filters": [
                                        "always"
                                    ],
                                    "payment_method_save": null
                                },
                                "setup_intent": null,
                                "shipping_address_collection": null,
                                "shipping_cost": null,
                                "shipping_details": null,
                                "shipping_options": [],
                                "status": "complete",
                                "submit_type": null,
                                "subscription": "sub_1PBRHNH6SmmOycjmKb97AgxV",
                                "success_url": "https://testing-safeherit.web.app/pricing?success=true",
                                "total_details": {
                                    "amount_discount": 0,
                                    "amount_shipping": 0,
                                    "amount_tax": 0
                                },
                                "ui_mode": "hosted",
                                "url": null
                            }
                        ],
                        "welcomeEmailSent": true,
                        "welcomeEmailSentAt": {
                            "_seconds": 1714524258,
                            "_nanoseconds": 669000000
                        },
                        "startupWizardCompleted": true,
                        "displayName": "NewName",
                        "publicKey": "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlkiV2fz3Luyw9ShccBYD\r\nIY3QI1l47UlUk75vKiCz5CkHeoH/RulMFUU6S6KIREjh1Cq8uRq2aTyQydio3HEU\r\n9sBF8zj2DIDgRI8YasCsae6Wy363eqemzsLGgj+7szZVtX7jX+MAOxt+E300SI9k\r\nF+H8dvtZ4PGia40/uZuqJbIDlcuRrhmgzDi1sN29KkqDclMW42UpcvtndoCYCv95\r\n0AOTmV3LPb0tgr6zt9XRXJKQsAt3Q8BAFT7OknYVAOH8FjY6BDPkzLB0KAhB1No2\r\noJfQu0xWPO0KtS0VP5JHQnWm3AGL+e2/P0Iay9rVoRWxaLNCF+9CijnT27/lFRs4\r\nwQIDAQAB\r\n-----END PUBLIC KEY-----\r\n",
                        "numOfValidatorOfUser": 4
                    }
                }
            }).as('apiAuth');
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
            cy.intercept({
                method: 'POST',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/sessionLogin',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": {
                        "createdByAdmin": false,
                        "passwordStrengthScore": 30,
                        "isSuperAdmin": false,
                        "language": "en",
                        "isAdmin": false,
                        "accountStatus": "Active",
                        "uid": "UEKc7kJQzWUhPQmP4HoAUFwFgnS2",
                        "createdAt": {
                            "_seconds": 1714524126,
                            "_nanoseconds": 432000000
                        },
                        "isOwner": true,
                        "pulseCheckActive": false,
                        "email": "naseerhunter5@gmail.com",
                        "isBeneficiary": false,
                        "isValidator": false,
                        "stripeCustomerId": "cus_P8KP5eRA4ya46g",
                        "periodStart": 1714524253,
                        "periodEnd": 1746060253,
                        "subscriptionLogs": [
                            {
                                "id": "sub_1PBRHNH6SmmOycjmKb97AgxV",
                                "object": "subscription",
                                "application": null,
                                "application_fee_percent": null,
                                "automatic_tax": {
                                    "enabled": false,
                                    "liability": null
                                },
                                "billing_cycle_anchor": 1714524253,
                                "billing_cycle_anchor_config": null,
                                "billing_thresholds": null,
                                "cancel_at": null,
                                "cancel_at_period_end": false,
                                "canceled_at": null,
                                "cancellation_details": {
                                    "comment": null,
                                    "feedback": null,
                                    "reason": null
                                },
                                "collection_method": "charge_automatically",
                                "created": 1714524253,
                                "currency": "usd",
                                "current_period_end": 1746060253,
                                "current_period_start": 1714524253,
                                "customer": "cus_P8KP5eRA4ya46g",
                                "days_until_due": null,
                                "default_payment_method": null,
                                "default_source": null,
                                "default_tax_rates": [],
                                "description": null,
                                "discount": null,
                                "discounts": [],
                                "ended_at": null,
                                "invoice_settings": {
                                    "account_tax_ids": null,
                                    "issuer": {
                                        "type": "self"
                                    }
                                },
                                "items": {
                                    "object": "list",
                                    "data": [
                                        {
                                            "id": "si_Q1UFwAJ5hyfWPz",
                                            "object": "subscription_item",
                                            "billing_thresholds": null,
                                            "created": 1714524254,
                                            "discounts": [],
                                            "metadata": {},
                                            "plan": {
                                                "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                                "object": "plan",
                                                "active": true,
                                                "aggregate_usage": null,
                                                "amount": 19900,
                                                "amount_decimal": "19900",
                                                "billing_scheme": "per_unit",
                                                "created": 1701478693,
                                                "currency": "usd",
                                                "interval": "year",
                                                "interval_count": 1,
                                                "livemode": false,
                                                "metadata": {},
                                                "meter": null,
                                                "nickname": null,
                                                "product": "prod_P6vNk5LPKa2C3M",
                                                "tiers_mode": null,
                                                "transform_usage": null,
                                                "trial_period_days": null,
                                                "usage_type": "licensed"
                                            },
                                            "price": {
                                                "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                                "object": "price",
                                                "active": true,
                                                "billing_scheme": "per_unit",
                                                "created": 1701478693,
                                                "currency": "usd",
                                                "custom_unit_amount": null,
                                                "livemode": false,
                                                "lookup_key": "yearly",
                                                "metadata": {},
                                                "nickname": null,
                                                "product": "prod_P6vNk5LPKa2C3M",
                                                "recurring": {
                                                    "aggregate_usage": null,
                                                    "interval": "year",
                                                    "interval_count": 1,
                                                    "meter": null,
                                                    "trial_period_days": null,
                                                    "usage_type": "licensed"
                                                },
                                                "tax_behavior": "unspecified",
                                                "tiers_mode": null,
                                                "transform_quantity": null,
                                                "type": "recurring",
                                                "unit_amount": 19900,
                                                "unit_amount_decimal": "19900"
                                            },
                                            "quantity": 1,
                                            "subscription": "sub_1PBRHNH6SmmOycjmKb97AgxV",
                                            "tax_rates": []
                                        }
                                    ],
                                    "has_more": false,
                                    "total_count": 1,
                                    "url": "/v1/subscription_items?subscription=sub_1PBRHNH6SmmOycjmKb97AgxV"
                                },
                                "latest_invoice": "in_1PBRHNH6SmmOycjm9dBBZqMG",
                                "livemode": false,
                                "metadata": {},
                                "next_pending_invoice_item_invoice": null,
                                "on_behalf_of": null,
                                "pause_collection": null,
                                "payment_settings": {
                                    "payment_method_options": {
                                        "acss_debit": null,
                                        "bancontact": null,
                                        "card": {
                                            "network": null,
                                            "request_three_d_secure": "automatic"
                                        },
                                        "customer_balance": null,
                                        "konbini": null,
                                        "sepa_debit": null,
                                        "us_bank_account": null
                                    },
                                    "payment_method_types": null,
                                    "save_default_payment_method": "off"
                                },
                                "pending_invoice_item_interval": null,
                                "pending_setup_intent": null,
                                "pending_update": null,
                                "plan": {
                                    "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                    "object": "plan",
                                    "active": true,
                                    "aggregate_usage": null,
                                    "amount": 19900,
                                    "amount_decimal": "19900",
                                    "billing_scheme": "per_unit",
                                    "created": 1701478693,
                                    "currency": "usd",
                                    "interval": "year",
                                    "interval_count": 1,
                                    "livemode": false,
                                    "metadata": {},
                                    "meter": null,
                                    "nickname": null,
                                    "product": "prod_P6vNk5LPKa2C3M",
                                    "tiers_mode": null,
                                    "transform_usage": null,
                                    "trial_period_days": null,
                                    "usage_type": "licensed"
                                },
                                "quantity": 1,
                                "schedule": null,
                                "start_date": 1714524253,
                                "status": "incomplete",
                                "test_clock": null,
                                "transfer_data": null,
                                "trial_end": null,
                                "trial_settings": {
                                    "end_behavior": {
                                        "missing_payment_method": "create_invoice"
                                    }
                                },
                                "trial_start": null
                            },
                            {
                                "id": "sub_1PBRHNH6SmmOycjmKb97AgxV",
                                "object": "subscription",
                                "application": null,
                                "application_fee_percent": null,
                                "automatic_tax": {
                                    "enabled": false,
                                    "liability": null
                                },
                                "billing_cycle_anchor": 1714524253,
                                "billing_cycle_anchor_config": null,
                                "billing_thresholds": null,
                                "cancel_at": null,
                                "cancel_at_period_end": false,
                                "canceled_at": null,
                                "cancellation_details": {
                                    "comment": null,
                                    "feedback": null,
                                    "reason": null
                                },
                                "collection_method": "charge_automatically",
                                "created": 1714524253,
                                "currency": "usd",
                                "current_period_end": 1746060253,
                                "current_period_start": 1714524253,
                                "customer": "cus_P8KP5eRA4ya46g",
                                "days_until_due": null,
                                "default_payment_method": "pm_1PBRHMH6SmmOycjmBbJaMjhc",
                                "default_source": null,
                                "default_tax_rates": [],
                                "description": null,
                                "discount": null,
                                "discounts": [],
                                "ended_at": null,
                                "invoice_settings": {
                                    "account_tax_ids": null,
                                    "issuer": {
                                        "type": "self"
                                    }
                                },
                                "items": {
                                    "object": "list",
                                    "data": [
                                        {
                                            "id": "si_Q1UFwAJ5hyfWPz",
                                            "object": "subscription_item",
                                            "billing_thresholds": null,
                                            "created": 1714524254,
                                            "discounts": [],
                                            "metadata": {},
                                            "plan": {
                                                "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                                "object": "plan",
                                                "active": true,
                                                "aggregate_usage": null,
                                                "amount": 19900,
                                                "amount_decimal": "19900",
                                                "billing_scheme": "per_unit",
                                                "created": 1701478693,
                                                "currency": "usd",
                                                "interval": "year",
                                                "interval_count": 1,
                                                "livemode": false,
                                                "metadata": {},
                                                "meter": null,
                                                "nickname": null,
                                                "product": "prod_P6vNk5LPKa2C3M",
                                                "tiers_mode": null,
                                                "transform_usage": null,
                                                "trial_period_days": null,
                                                "usage_type": "licensed"
                                            },
                                            "price": {
                                                "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                                "object": "price",
                                                "active": true,
                                                "billing_scheme": "per_unit",
                                                "created": 1701478693,
                                                "currency": "usd",
                                                "custom_unit_amount": null,
                                                "livemode": false,
                                                "lookup_key": "yearly",
                                                "metadata": {},
                                                "nickname": null,
                                                "product": "prod_P6vNk5LPKa2C3M",
                                                "recurring": {
                                                    "aggregate_usage": null,
                                                    "interval": "year",
                                                    "interval_count": 1,
                                                    "meter": null,
                                                    "trial_period_days": null,
                                                    "usage_type": "licensed"
                                                },
                                                "tax_behavior": "unspecified",
                                                "tiers_mode": null,
                                                "transform_quantity": null,
                                                "type": "recurring",
                                                "unit_amount": 19900,
                                                "unit_amount_decimal": "19900"
                                            },
                                            "quantity": 1,
                                            "subscription": "sub_1PBRHNH6SmmOycjmKb97AgxV",
                                            "tax_rates": []
                                        }
                                    ],
                                    "has_more": false,
                                    "total_count": 1,
                                    "url": "/v1/subscription_items?subscription=sub_1PBRHNH6SmmOycjmKb97AgxV"
                                },
                                "latest_invoice": "in_1PBRHNH6SmmOycjm9dBBZqMG",
                                "livemode": false,
                                "metadata": {},
                                "next_pending_invoice_item_invoice": null,
                                "on_behalf_of": null,
                                "pause_collection": null,
                                "payment_settings": {
                                    "payment_method_options": {
                                        "acss_debit": null,
                                        "bancontact": null,
                                        "card": {
                                            "network": null,
                                            "request_three_d_secure": "automatic"
                                        },
                                        "customer_balance": null,
                                        "konbini": null,
                                        "sepa_debit": null,
                                        "us_bank_account": null
                                    },
                                    "payment_method_types": null,
                                    "save_default_payment_method": "off"
                                },
                                "pending_invoice_item_interval": null,
                                "pending_setup_intent": null,
                                "pending_update": null,
                                "plan": {
                                    "id": "price_1OIhX7H6SmmOycjmw1bIEfTm",
                                    "object": "plan",
                                    "active": true,
                                    "aggregate_usage": null,
                                    "amount": 19900,
                                    "amount_decimal": "19900",
                                    "billing_scheme": "per_unit",
                                    "created": 1701478693,
                                    "currency": "usd",
                                    "interval": "year",
                                    "interval_count": 1,
                                    "livemode": false,
                                    "metadata": {},
                                    "meter": null,
                                    "nickname": null,
                                    "product": "prod_P6vNk5LPKa2C3M",
                                    "tiers_mode": null,
                                    "transform_usage": null,
                                    "trial_period_days": null,
                                    "usage_type": "licensed"
                                },
                                "quantity": 1,
                                "schedule": null,
                                "start_date": 1714524253,
                                "status": "active",
                                "test_clock": null,
                                "transfer_data": null,
                                "trial_end": null,
                                "trial_settings": {
                                    "end_behavior": {
                                        "missing_payment_method": "create_invoice"
                                    }
                                },
                                "trial_start": null
                            }
                        ],
                        "paymentStatus": "Paid",
                        "plan": "yearly",
                        "paymentLogs": [
                            {
                                "id": "cs_test_a1LJ72M4rnCt8LNMMVfx3yXPWFl9LBN7FP34LGtZjpyroRqBfke3C6s7sb",
                                "object": "checkout.session",
                                "after_expiration": null,
                                "allow_promotion_codes": null,
                                "amount_subtotal": 19900,
                                "amount_total": 19900,
                                "automatic_tax": {
                                    "enabled": false,
                                    "liability": null,
                                    "status": null
                                },
                                "billing_address_collection": "auto",
                                "cancel_url": "https://testing-safeherit.web.app/pricing?success=false",
                                "client_reference_id": null,
                                "client_secret": null,
                                "consent": null,
                                "consent_collection": null,
                                "created": 1714524200,
                                "currency": "usd",
                                "currency_conversion": null,
                                "custom_fields": [],
                                "custom_text": {
                                    "after_submit": null,
                                    "shipping_address": null,
                                    "submit": null,
                                    "terms_of_service_acceptance": null
                                },
                                "customer": "cus_P8KP5eRA4ya46g",
                                "customer_creation": null,
                                "customer_details": {
                                    "address": {
                                        "city": null,
                                        "country": "PK",
                                        "line1": null,
                                        "line2": null,
                                        "postal_code": null,
                                        "state": null
                                    },
                                    "email": "naseerhunter5@gmail.com",
                                    "name": "ahmed",
                                    "phone": null,
                                    "tax_exempt": "none",
                                    "tax_ids": []
                                },
                                "customer_email": null,
                                "expires_at": 1714610599,
                                "invoice": "in_1PBRHNH6SmmOycjm9dBBZqMG",
                                "invoice_creation": null,
                                "livemode": false,
                                "locale": null,
                                "metadata": {
                                    "user_email": "naseerhunter5@gmail.com",
                                    "plan": "yearly",
                                    "mode": "subscription"
                                },
                                "mode": "subscription",
                                "payment_intent": null,
                                "payment_link": null,
                                "payment_method_collection": "always",
                                "payment_method_configuration_details": null,
                                "payment_method_options": {
                                    "card": {
                                        "request_three_d_secure": "automatic"
                                    }
                                },
                                "payment_method_types": [
                                    "card"
                                ],
                                "payment_status": "paid",
                                "phone_number_collection": {
                                    "enabled": false
                                },
                                "recovered_from": null,
                                "saved_payment_method_options": {
                                    "allow_redisplay_filters": [
                                        "always"
                                    ],
                                    "payment_method_save": null
                                },
                                "setup_intent": null,
                                "shipping_address_collection": null,
                                "shipping_cost": null,
                                "shipping_details": null,
                                "shipping_options": [],
                                "status": "complete",
                                "submit_type": null,
                                "subscription": "sub_1PBRHNH6SmmOycjmKb97AgxV",
                                "success_url": "https://testing-safeherit.web.app/pricing?success=true",
                                "total_details": {
                                    "amount_discount": 0,
                                    "amount_shipping": 0,
                                    "amount_tax": 0
                                },
                                "ui_mode": "hosted",
                                "url": null
                            }
                        ],
                        "welcomeEmailSent": true,
                        "welcomeEmailSentAt": {
                            "_seconds": 1714524258,
                            "_nanoseconds": 669000000
                        },
                        "startupWizardCompleted": true,
                        "displayName": "NewName",
                        "publicKey": "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlkiV2fz3Luyw9ShccBYD\r\nIY3QI1l47UlUk75vKiCz5CkHeoH/RulMFUU6S6KIREjh1Cq8uRq2aTyQydio3HEU\r\n9sBF8zj2DIDgRI8YasCsae6Wy363eqemzsLGgj+7szZVtX7jX+MAOxt+E300SI9k\r\nF+H8dvtZ4PGia40/uZuqJbIDlcuRrhmgzDi1sN29KkqDclMW42UpcvtndoCYCv95\r\n0AOTmV3LPb0tgr6zt9XRXJKQsAt3Q8BAFT7OknYVAOH8FjY6BDPkzLB0KAhB1No2\r\noJfQu0xWPO0KtS0VP5JHQnWm3AGL+e2/P0Iay9rVoRWxaLNCF+9CijnT27/lFRs4\r\nwQIDAQAB\r\n-----END PUBLIC KEY-----\r\n",
                        "numOfValidatorOfUser": 4
                    }
                }
            }).as('sessionLogin');
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-dashboard/data',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": {
                        "assetCount": 0,
                        "beneficiaryCount": 1,
                        "validatorCount": 4,
                        "assets": [],
                        "beneficiaries": [
                            {
                                "public_key": "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmkgjdbdY1/1ASaUJCeeC\r\nl1O/gMgXHnT2Tr6Yu7eOAjOrPt67C0vD5FkiuxpEtflqvKMf0mT6tRi1ijKem18M\r\nPTI5whIOwIq52jAVDoNm5f9Q6qlM9WtfSI+/By8i0iOyJEnWqXDy0Hnjto8c2Dew\r\n+uaoYaHm6i/4mz4RbLJidJTBw/EFojJKnA+/om/pHmBi2ORNg7Nv/+dqJv7hG3iD\r\nKF5yQGvA9IZfy7296UBo3dS/OOClSMq5FgH7mzL9th/luTKZ8eF2gJMmrF4tUCui\r\n9yVcmiPJmOp1QF2CfORzHuzY3b9oOCiDKEYPiZtHjkANi/x2PMjDYueupRoPllgw\r\nfwIDAQAB\r\n-----END PUBLIC KEY-----\r\n",
                                "facebook_link": "https://www.facebook.com/zuck/",
                                "twitter_username": "https://twitter.com/finkd?lang=en",
                                "backup_email2": "w@gmail.com",
                                "backup_phone_number": "+92 3244444441",
                                "inform_beneficiary": true,
                                "backup_email": "s@gmail.com",
                                "personalized_message": "hello I am not here gemme",
                                "name": "Joshua Reichert",
                                "phone_number": "+92 3244484651",
                                "primary_email": "Cordell_Kovacek76@yahoo.com",
                                "id": "qd9zW12m2WVXL4ksN1c3",
                                "instagram_username": "https://www.instagram.com/zuck/?hl=en"
                            }
                        ],
                        "validators": [
                            {
                                "backup_email": "Annie.Cole27@hotmail.com",
                                "personalized_message": "hello I am not here gemme",
                                "facebook_link": "https://www.facebook.com/zuck/",
                                "name": "Mrs. Georgia Larson",
                                "twitter_username": "https://twitter.com/finkd?lang=en",
                                "phone_number": "+92 3244484651",
                                "primary_email": "Annie.Cole27@hotmail.com",
                                "id": "EbOkABLHwV5P4csyIFiR",
                                "inform_validator": false,
                                "instagram_username": "https://www.instagram.com/zuck/?hl=en",
                                "backup_email2": "Annie.Cole27@hotmail.com"
                            },
                            {
                                "backup_email": "Arne.Grimes@hotmail.com",
                                "personalized_message": "hello I am not here gemme",
                                "facebook_link": "https://www.facebook.com/zuck/",
                                "name": "Myron Rath MD",
                                "twitter_username": "https://twitter.com/finkd?lang=en",
                                "phone_number": "+92 3244484651",
                                "primary_email": "Arne.Grimes@hotmail.com",
                                "id": "JUZSADCYOntc7M63rDCp",
                                "inform_validator": false,
                                "instagram_username": "https://www.instagram.com/zuck/?hl=en",
                                "backup_email2": "Arne.Grimes@hotmail.com"
                            },
                            {
                                "backup_email": "Roscoe.Corkery@gmail.com",
                                "personalized_message": "hello I am not here gemme",
                                "facebook_link": "https://www.facebook.com/zuck/",
                                "name": "Chris Russel",
                                "twitter_username": "https://twitter.com/finkd?lang=en",
                                "phone_number": "+92 3244484651",
                                "primary_email": "Roscoe.Corkery@gmail.com",
                                "id": "VXnX8fqo9RuG1ExgwY3o",
                                "inform_validator": false,
                                "instagram_username": "https://www.instagram.com/zuck/?hl=en",
                                "backup_email2": "Roscoe.Corkery@gmail.com"
                            },
                            {
                                "backup_email": "Victor_Douglas@gmail.com",
                                "personalized_message": "hello I am not here gemme",
                                "facebook_link": "https://www.facebook.com/zuck/",
                                "name": "Jennifer Herzog",
                                "twitter_username": "https://twitter.com/finkd?lang=en",
                                "phone_number": "+92 3244484651",
                                "primary_email": "Victor_Douglas@gmail.com",
                                "id": "g6dj8AIcGSRK5NUK4csz",
                                "inform_validator": false,
                                "instagram_username": "https://www.instagram.com/zuck/?hl=en",
                                "backup_email2": "Victor_Douglas@gmail.com"
                            }
                        ],
                        "securityRating": {
                            "rating": "Good",
                            "score": 60,
                            "maxAchievableScore": 100,
                            "possibleImprovements": [
                                "Enable two factor authentication",
                                "Add more backup contacts"
                            ],
                            "individualRatings": [
                                {
                                    "name": "Password Strength",
                                    "score": 30,
                                    "maxScore": 30,
                                    "improvement": null
                                },
                                {
                                    "name": "Two-Factor Authentication",
                                    "score": 0,
                                    "maxScore": 30,
                                    "improvement": "Enable two factor authentication"
                                },
                                {
                                    "name": "Number of Validators",
                                    "score": 20,
                                    "maxScore": 20,
                                    "improvement": null
                                },
                                {
                                    "name": "Back up contact information",
                                    "score": 0,
                                    "maxScore": 10,
                                    "improvement": "Add more backup contacts"
                                },
                                {
                                    "name": "Email Verification",
                                    "score": 10,
                                    "maxScore": 10,
                                    "improvement": null
                                }
                            ]
                        }
                    }
                }
            }).as('dashboardData');
            cy.intercept({
                method: 'GET',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=qd9zW12m2WVXL4ksN1c3',
            }, {
                statusCode: 200,
                body: {
                    "success": true,
                    "data": beneficiaryListData
                }
            }).as('getBenefById');
            cy.intercept({
                method: 'DELETE',
                url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=qd9zW12m2WVXL4ksN1c3',
            }, {
                statusCode: 200,
                body: {"success":true,"message":"Beneficiary deleted"}
            }).as('deleteBenef');
            cy.intercept('DELETE', 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=4B1PO9Jroz8eXtoi0Vwa', (req) => {
            req.reply({
              statusCode: 500
            });
            }).as('deleteRequest500');
            cy.intercept('DELETE', 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=4B1PO9Jroz8eXtoi0Vwa', (req) => {
            req.reply({
              statusCode: 401,
              body: {
                "success": false,
                "message": "Unauthorized"
                },
            });
          }).as('deleteRequest401');
          Cypress.on('uncaught:exception', (err, runnable, promise) => {
            // when the exception originated from an unhandled promise
            // rejection, the promise is provided as a third argument
            // you can turn off failing the test in this case
            console.log(' i m in exception');
            if (promise) {
                console.log(' i m in promise');
                return false
            }
            // we still want to ensure there are no other unexpected
            // errors, so we let them fail the test
            })
        });
        cy.login('naseerhunter5@gmail.com', 'naseerhunter5@gmail.comV');
        cy.importPrivateKey();
        cy.wait("@sessionActive").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.clearLocalStorage();
        // Set local storage
        cy.window().then((window) => {
            window.localStorage.setItem('privateKey', '0nkCeZUrbRMWYQOJrtKtshLgzOKOUuZBMoo6MtAHrqWqRMwxOouRbGHKDAhYnWEi5msmmXN/mvLI7ryUUIuJeckP8XuW82lgSP3uWIyd3nlU3Oezf4m+bLWP4ddJqux49tbcMxd2SoxdM1joy1AMKGWtFBXAeWUDf4rxOPFaaJ3sI/CBAO4JxlAogsK7llLHg99vMVnfjRCozJahge2ULDaUpn8ioEDTHhx+EICZAGBDAAEnbPqk4F7hVpGXXAxsd4nAUrOXVZLZhI1XzaxJiyuwKWISDJRVj1BBOKjWcb3dud+yEqL0jxpYxmDREOZfY/+So2yDjJQpd6sv3Rv/vO2wBE6wjbjKejhOJSjddFIWNiuWliF1chF4gJ/hAV/tvVyhEjXKmUhSDmyDh6i+GzxoFX3glRiqt9FgEruyGP6uvYz+IiPAAXkUCkhWcil8boXEGZU5uQ78Z5qNPac/N0USwiG3ZWGBWebz4rVLqh/Uo9pbWdC8rK1NspLEvwBXD9HvIUh2rXYy4P3glwhd1egHM8CoVDDU9eBibN/IY8bj4SfA17oMOejIbbDT9+xgfBY2NkhS1vHuegrQ/md0bcLM0B0MHVlnvn8lAY/FXuc1HaAQ8vHQZlH/6//y7dnVZqy30r5pClwuGUeX/pKZIYUbB+pr9fTzCEvNmpCGFZzywQXYgo5zbIQwjBqzSg4Jw7VBRO50vtxi+RjkrEGn8NBTCi434icwMUFeUoY6Ld2SGS/TLCyY3p0NpsZ3DIdMzwQrUuHrcqxQAAND6JdAwTWosWG3gSEoY9XCJosMYZb3m96STm/DbRJRnKUgX7uCKYdl48HW45PZUu30Yk+cexDxBb4/sdUx9yo0aQ5nH6904rpGrlWomUmwkHAyt49aPUT7EwlOgoLZsFOnyjTPy8PT2eaQWrMDaJVNuThihbi1oI2FKVOgMrgTHC5WjmoQNp4ci+N3n4/tbMKpv3jmD66fGrvBcnFtsUkU7hbiBMmu1qR3gQD4AzHd2wbLLWvt6EbSZqEOqli1LSfO5N1Qx+BK57BM+K535dLaVuwWgxnCV+XiImmO1jQqNOx15FTq/x5dmZ1KbP7phGlCtkFtukqqJdpL4/CQaZ/teBuLSaccJu+SB+PmGz3E0Eq4uL/GbHcN28epX7H5kw3I+kK0ZAQDr5rD9eAp7PwL4F7czL6g4wh2OnqaOU0DTXnkTgjKn9joEg/PqONtoIhdt1jBWqrUUvOZa0MZyzKp+0gcc3TPVKNlNwtewnVCNYHfmfOhaHEfCj7yliAkanOjwZehy7aWci2f3xmolB1GhlFS90LQy0YwPMys2XpuLPYQiSbJIFH4XTFN0ppRe4aEIMu7LgKOzzjLjRM8ooZ11LdTmNbZTAuy1DK877NXZXJX76RJbZ1SxK8CZ4Y13F1OkfaQ9HxYdsUYJMlhfbcL2Z7xK2iDhkwgx3iFlwj+k4CMP+XIcN3mfvDqrj4LS9ihjkCbG777RzXU2Nnw/YtUMe6qL4OKbwe2aJvTjcvaoxMnR+WapzFmxTD8sa4Q2oIzKf08YfKVAetzpbNaCR86cJSpsNI42FLznCMHcHyBrcHeJvPMgcweVwuSt8iNKjhdvi4jNL3OOAN60gHvy9zkR1fSHT5yCKpX0TfY08l+8RNPVbeEhY/AOYnqMc1aBIzPijePoOWNWeojoneB+LJqeZ4uVpmm2dO2H+raDNibgAWmKdJmJyG5V9NvLyxs/CASYIiVnPNrlQtNjoJ+pS1PuP63ASKnWsIiebAYSOgAZbjdLaxm/CrQLPrTMxM7mZVofmZkKTuR0EPqptzBiw1Cx/8ZivwutKaOyonG2+lA04Tp4WNyga8Q1abvX+N5GGb59+sIPXq/kywUZJb2UY7TrjelpXxfcu0u3RbFYHBQiIuCqvi6kzTQ1LMWGEP6xQmYvqZe/Zz1ZtmoR4LFgAr4NMK5+PcEHOSj7v/O0yfnr9Br1nJL+yrsRgBp22ZilijGMvEacOIu0yPEFLMve9xlm5fZwLetNuOglAXG1Dqno3p59v5LKPCvQwpl1j/uiZJxrl9IRgJ9rxUqKrtwj3QQ+F29gZxHHLFUzgzO6JZIMIFsN/KmHTAfodyvJUzecqDh1mIAqGGCy0y4UcyyBeZvrnOtQUsEvWjkefKSEMjXC1D2y9eON72CBZyz4AIraKBVJjNlTVGt7iMKZtGt8TfSiyA5+DJjtvXo8a8omDO81J2ElPAsJRo7f4MlFmXgTPCLPNPLHmnTym8NtG40AF66s7AQjDQ=');
            window.localStorage.setItem('role', 'b3duZXI=');
        });
        cy.wait("@sessionLogin").then((intercept) => {
            expect(intercept.response.statusCode ).to.equal(200);
        });
        cy.wait("@apiAuth").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        cy.wait("@dashboardData").then((intercept)=>{
            expect(intercept.response.statusCode ).to.equal(200);
        })
        
        // ----------------------------Delete success----------------------------;
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
            cy.get('#notistack-snackbar').should('be.visible').contains("deleting Beneficiary ok");
        });
        // ----------------------------Delete with server error----------------------------;
        // cy.log('Deleting beneficary with server error');
        
        // cy.get('[data-cy="dashboard-view-beneficiaries-button"]').click();
        // cy.get('[data-cy="beneficiary-drop-down-button"]').eq(0).click();
        // cy.get('[data-cy="drop-down-delete-button"]').click();
        // cy.wait("@getBenefById").then((intercept) => {
        //     assert(intercept.response.statusCode == 200);
        // });
        
        // cy.get('[data-cy="confirm-button"]').click();
        // cy.wait("@deleteRequest500").then((intercept) => {
        //     assert(intercept.response.statusCode == 500);
        //     cy.get('#notistack-snackbar').should('exist').contains('please login again');
        // });
        // // ----------------------------Delete as unauthorized----------------------------;
        // cy.log('Deleting beneficary with unauthorized');
        
        // cy.visit('http://localhost:5173/dashboard/beneficiaries');
        // cy.wait(3000);
        // cy.get('[data-cy="beneficiary-drop-down-button"]').eq(0).click();
        // cy.get('[data-cy="drop-down-delete-button"]').click();
        // cy.wait("@getBenefById").then((intercept) => {
        //     assert(intercept.response.statusCode == 200);
        // });
        // cy.wait(5000);
        
        
        // cy.get('[data-cy="confirm-button"]').click();
        // cy.wait("@deleteRequest401").then((intercept) => {
        //     assert(intercept.response.statusCode == 401);
        //     cy.get('#notistack-snackbar').should('exist').contains('please login again');

        // });
        


    };
    
    // Test case
    it('Testing of Edit beneficiary ', () => {
        editBenef();
    });
    it.only('Testing of Deleting beneficiary ', () => {
        // cy.visit('https://testing-safeherit.web.app/dashboard/beneficiaries');
        deleteBenef();
    });
});
