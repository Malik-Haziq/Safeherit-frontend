describe('Adding Validator', () => {
  it('should log in and add validator', () => {
    // Set the viewport to a laptop screen size
    cy.viewport('macbook-15');
    // Visit the website's login page
    cy.visit('https://testing-safeherit.web.app/login');
    // Input email and password
    cy.get(':nth-child(1) > .text-safe-text-black > .bg-safe-white').type('mehran0@ucp.edu.pk');
    cy.get(':nth-child(2) > .text-safe-text-black > .bg-safe-white').type('mehran0@ucp.edu.pk');
    // Click the login button
    cy.get('.primary-btn').click();
    cy.wait(3000);
    cy.get('._modal_1kpr8_12')
    cy.get(':nth-child(2) > :nth-child(1) > .flex-row > .text-\\[\\#0C8AC1\\]').click()
    cy.timeout(9000)
    cy.get('.primary-btn').click()
    function getRandomEmail() {
      const username = Math.random().toString(36).substring(2, 10);
      const domain = 'example.com';
      return `${username}@${domain}`;
    }
    
    function getRandomNumber() {
      const countryCode = '+';
      const randomDigits = Math.floor(10000000000 + Math.random() * 90000000000);
      return countryCode + randomDigits;
    }

    
    // Function to generate a random name
    function getRandomName() {
      const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
      const randomIndex = Math.floor(Math.random() * names.length);
      return names[randomIndex];
    }
    
    // Usage example:
    const randomEmail = getRandomEmail();
    const randomNumber = getRandomNumber(1000, 9999);
    const randomName = getRandomName();
    
    // Now you can use these random values in your Cypress commands:
    cy.get('.mt-7 > .rounded-3xl').eq(0).type(randomEmail);
    cy.get(':nth-child(3) > .rounded-3xl').eq(0).type(randomNumber);
    cy.get(':nth-child(4) > .rounded-3xl').eq(0).type(randomName);
    cy.get('._buttonStyle_1kpr8_49').click()
    cy.timeout(4000)
    cy.get('._icon_1kpr8_37 > .cursor-pointer').click()


  });
});