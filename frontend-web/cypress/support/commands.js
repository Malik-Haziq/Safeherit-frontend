// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
import "cypress-intercept-formdata";
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
    cy.visit('https://testing-safeherit.web.app/login');
    cy.wait(2000);
    // Fill in the username
    cy.get('[data-cy="email-input-field"]').should('be.visible')
      .type(username);

    // Fill in the password
    cy.get('[data-cy="password-input-field"]').should('be.visible')
      .type(password);

    // Click on the login button
    cy.get('[data-cy="login-button"]').click();
    cy.wait(3000); // Wait for the login process to complete

    // cy.get('#headlessui-menu-button-\\:r1\\:').should('be.visible');
});
Cypress.Commands.add('importPrivateKey', ()=>{
    // Click on the import private key button
    const filePath = 'Naseer_privateKey.txt';
    cy.get('[data-cy="login-as-owner-button"]').click()
    cy.wait(3000);
    cy.get('[data-cy="import-private-key-button"]').should('be.visible').click(); 
    cy.get('._modal_15tvw_12').should('be.visible');

    // Click on the browse private key button
    cy.get('[data-cy="browse-private-key-button"]').click();

    // Wait for the file dialog to open (adjust wait time as needed)
    // cy.get('.go1888806478').should('be.visible');    
    // Attach the file to the file input element
    cy.fixture(filePath).then(fileContent => {
      cy.get('input[type="file"]').should('have.length', 1).attachFile({
        fileContent: fileContent,
        fileName: filePath,
        mimeType: 'text/csv' // Adjust the MIME type if necessary
      });
    });
    // cy.get('#notistack-snackbar').should('be.visible');
    cy.wait(3000);
    // Click on the load private key button
    cy.get('[data-cy="load-private-key-button"]').click();
});
Cypress.Commands.add('setLocalStorage', ()=>{
  cy.window().then((window) => {
    window.localStorage.setItem('privateKey', '0nkCeZUrbRMWYQOJrtKtshLgzOKOUuZBMoo6MtAHrqWKt8eVfvTkSgKyw0oYchSx3s1jOPvoSQOY6L6mB2YRn/4eCXUz+B33ZXYYJuhHcJcK8idwRZfWBUWUI9ACtQDP71uZhdmifvbUNPLXXxxbghiW+2H+q12ovpR+m8HnVvhUetL61hEVNAGKLi38ibq6ubEoWxHc+VmGpeIIH+mhEexCsbQYHwVwQqsRCdhZYJRH/3ycnWxopneHgMjIXzYJDvMmqPD6+49hG6j/v/zRlZxXOsSxuvU9kJhHbyFautGsqhV8oVjOWJV7ZI4Bd3zJ1V/0OMmIGvM1nJlk/MxJIhnQobRviaRJLmF5+RjI4rknQrZ1QBoQ39WqjMnWlaYCcrQOnZ3O8bO1r5nFxyk4FXbGQZCNZBe8hzYDKmmiF+4aPhIXChEtjtrqdHli9aLR6HIzJDcDGOv3b/7/N0O4QqTg1doo9X/udf5Dorg1zlhLJ3yMko8QHmoiLI8HyW6bQ6yVoJL3Ktra0ClCsI54Lrj8VTvliBgwxn8lk4uGoJM8PMM9gG4DogBpr5v6Qwb12WJwiyy1wDiSQ6Pxx41U6GB+xmi78lgiIpef5dwBJiWEw4Gu5/NjkkgUZZ8FUH59L8AtOS55wYsuhsM83kyl4myoLpc3a6YQ5gZpFjDNu9/nB+FejvQRV/gfPPil6NqFDEd6lX9blij+b+0vFOaqxSUgy2GUiDXIE8LgafRhhHeeDXKJwARG0lJRh7Oyz4MUgMHNRP6o9Jh08e9+p6Bf9vif6zVE4hdnQKGRiOJPcM668wNG7kzi1fMuaDjOXGAULJSjxeYuNczUDJ3j4yFhYh8fSR7/u+oY0EFH/QWJXEqx5tFjTyc1gOxq9VtaAmwvnKb9XWs++SqrN+HwyglgRGv6PJeCccYQOzMiwmVaqCgZbxz1kxRRPrWu4wanbj26eZ2ivCkgMNAgfsfYxxX+QGQvumET4kKZVCyBjmUDmBQuMoJBXH6G6dJyP1uA6jlsW+cwO1FGq991Io1P1w5I9clLniGevR7zo0MMgKNNDoDWoC2Y9Hl74qQj4l0VmhiJWwkNo+nEWvTqBBMKyWmgch+rK6LxYuI+a/m4C7kJFoOkf2dTd6umN5USkNKprFzxCZ5qbopXJFERJ5/0QuAcijdZ/sqzyp8i5mYBq4GIdtvRkLHhlk0oWnrDBFjmiJ9LVk6by+xtMZRJvhWPx2AwBOCq6oiVQF2Eoyra4nuhz2IBPBQMyr1MzhcjQfb3Vvpt3AJUMWgOWhWzuVNTS6VIuoBRVb5nkWqm+U7hIDRY6BEiS/LEnxHJTTWl8ELj8/kDCvMhAofBw1YvyyZNSlDyvchkPi5W/uvgoD6w1HZJ2Hz8CXlq+1UBhDcmIs5uB1COj5KUUfLx0c65q9L6LmCKjaxvsJPle9VlhznfCmHgDjdOBcNh2m6LRcapMvtvUZ24y6KibySSwq0j6CvGij82JIHieMvGrRhkOtEBM1L6GEW6dyZB4mS0JWKyIpuF/1yHGzq4JToIt9TKlaHG409I+n+w4jPPhVHN4mtM24D8gXK2/FXUQztr6vZfwlsBcBg9ltltc3p2pst/tFOZZ/7iUFecrP7iyYdOSJw3RvRt/yYEeL1Q35nr/ua/S4nIqrPVRGNhPN9amwD2/A2FWvELftLS3v+4Vt9SQZzivN/Fc79wSdFhaPVJYdvDrJQoT8dG6pCkxZEQaMvXPmDHQSmNdCGhvT0dhMjuO0UQDFcyNx5RCNCDNFvtaAJ1+DC8wRL306lXsTyyxxFzo1u1kIMTP1qwqGo0KzzDDJ4qiXm+9vc61qWd10pxqCDT9dxgCyujpCqHQb7w1lFoOyT4RKER+YxCnGcSAFE4/4lJ5F55mbuT0O7iEcp7pokOvlWvEMaWZG+fF4bp6EiALLruGnnHzos0A5KmUORDVQyQ02fRQJPF0M5VtO6PX1LuzoZKhjcdyjuTNdWFsn8JxQp6BJOB/3Hc5lAP6kOEjb6t6edVYzeGFpjc8SJGNMgqtAqsGS+QVsvi3y5i5xk3KqhbBBxIU+rF3qd+SNsk450QCt+itRBPWBLioZkCEwsCqM92Rsjg8VDzPDHJ0L99xYmC16QUry9SbL6IEvTrlM7l9JxHD58i9BCawrpIIDAuzjgdcWA3vfv9636uint0txHjK5SryMdr7ejKl6eOlgAXsH3SemE5jYXDe+usP6vgUZjEB1oFaXnYEHD51iR/r5a4xDuLBHQvTJ4gDQUXvvRVmGFm398=')
    window.localStorage.setItem('role', 'b3duZXI=');
    window.localStorage.setItem('_privateKey', '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')

  })
})
