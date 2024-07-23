describe('Your Test Suite', () => {
  let authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyZTgyNzMyYjk3MWExMzVjZjE0MTZlOGI0NmRhZTA0ZDgwODk0ZTciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUmVlZSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9zYWZlaGVyaXQtNDMxYzQiLCJhdWQiOiJzYWZlaGVyaXQtNDMxYzQiLCJhdXRoX3RpbWUiOjE2OTY4Njg0NDksInVzZXJfaWQiOiJCZVd5T3FzODdUUjVsSGs2Rk84aER0STR5MkoyIiwic3ViIjoiQmVXeU9xczg3VFI1bEhrNkZPOGhEdEk0eTJKMiIsImlhdCI6MTY5Njg2ODQ0OSwiZXhwIjoxNjk2ODcyMDQ5LCJlbWFpbCI6InJlZWVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJlZWVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.mSXwWEl9L2BOPS2Y6dLdQfR1zMsOreX3KnteD1EE-z6FSDCoiCDKCsfC74tQyxIYXgG-8mO6GHwNid8MKCxbrlsGj2FOGCFpXHLSSFOqrzfpUg6TI8laGhZ3FNIgB-xqNVPlgxMuqoMVokeXVeCrJetciOGoTWKKTmzCjLzMPEs6u_000MvTmAPiOXaCD2mL_sS_b3Py-BgnN-EFYTUuElkPzZQwZ-XF8jk1H9DfbwfwJitfJk8fLw-JcSt_P94LWu2QYW-NO2N-h4MPel39NYg9nUlbjMyKortD29Q18dtu1gbb14yF0k4tx1Nwb7maR74XBavOwbEO7Y_Bd1lsZg'; // Replace with your actual auth token
  it('Add validator', () => {
    // const addValidatorUrl = 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator';
    const formData = new FormData();
    //formData.append('id', 'kaSp8FtwG9OFFBgy4pEUZsK33hI2');
    formData.append('name', '99');
    formData.append('primary_email', '14_backup1@email.com');
    formData.append('backup_email', '16backup1@email.com');
    formData.append('backup_email2', '12backup2@email.com');
    formData.append('phone_number', '9996555894');
    formData.append('backup_phone_number', '4545454');
    formData.append('facebook_link', 'https://www.facebook.com/username');
    formData.append('instagram_username', 'username');
    formData.append(' twitter_username', 'username');
    formData.append('profile_image', ' ');
    formData.append('personalized_message', 'new');

    cy.request({
      timeeout : 20000,
      method: 'POST',
      url : 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator',
      body : formData,
        headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      //expect(response.status).to.equal(200).to.equal(201);
      cy.log('Created', JSON.parse(response.body))
    })
  //formData.append('name', '8');
  //formData.append('primary_email', '7_backup1@email.com');
//   cy.request({
//     method: 'PUT',
//     url : 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator',
//     body: formData,
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//       'Content-Type': 'multipart/form-data',
//     }
//   }).then(response => {
//     //expect(response.status).to.equal(200);
//     console.log('validotr updated successfully:', response.body);
//   });
// });

// cy.request({
//   method: 'DELETE',
//   url : 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator?id=j7OAsPmr6OwvPji78E09',
//   headers: {
//     Authorization: `Bearer ${authToken}`,
//     'Content-Type': 'multipart/form-data',
//   }
// }).then(response => {
//   //expect(response.status).to.equal(200);
//   console.log('validotr updated successfully:', response.body);
// });
});

});
