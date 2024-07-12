import '../../support/commands';
import '@4tw/cypress-drag-drop';
import 'cypress-file-upload';
describe('Open Website, Login, and Fill Username and Password', () => {
    beforeEach(() => {
        // Visit the website
        cy.visit('https://testing-safeherit.web.app/');
    });
    const createPulse = () => {
        cy.get('[data-cy="dashboard-view-pulse-check-button"]').click()
        cy.get('[data-cy="setup-pulse-check-button"]').click()
        cy.get('[data-cy="submit-pulse-modal-one-button"]').click()
        cy.get(':nth-child(11) > :nth-child(1) > [data-cy="select-country-codes"] > ._rightIconStyles_qr9qf_13').click()
        cy.get('#react-select-2-listbox').contains('+92').click()
        cy.get('[data-cy="pulse-check-phone-number"]').type('3270948941')
        cy.get('[data-cy="submit-pulse-modal-two-button"]').click()
        cy.get('[data-cy="submit-pulse-modal-three-button"]').click()
        cy.get('[data-cy="submit-pulse-success-modal-button"]').click()
    }
    const editPulse = () => {
        cy.get('[data-cy="dashboard-view-pulse-check-button"]').click()
        cy.get('.justify-center.mb-6 > .justify-between > :nth-child(2)').click()
        cy.get('[data-cy="check-method-Phone"]').click()
        cy.get(':nth-child(1) > [data-cy="edit-phone-number-button"]').click()
        cy.get('[data-cy="pulse-check-phone-number"]').clear().type('3255115996')
        cy.get('[data-cy="save-edited-phone-number-button"]').click()
        cy.get('[data-cy="check-method-Email"]').click()
        cy.get(':nth-child(1) > [data-cy="edit-phone-number-button"]').click()
        cy.get('.border-0').clear().type('hasnat123@gmail.com')
        cy.get('[data-cy="save-edited-phone-number-button"]').click()
    }
    it('should execute the automated test', () => {
        // Use the static username and password for login
        cy.login('s2022387075@umt.edu.pk', 'k4@aun6HH');
        cy.importPrivateKey();
        // createPulse();
        editPulse();
    });
})