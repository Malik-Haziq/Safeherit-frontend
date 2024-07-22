describe('Your Test Suite', () => {
  let authToken = ''; // Replace with your actual token

  it('Add validator', () => {
    const formData = new FormData();
    formData.append('id', '');// Place the ID Here and fill out the date which needs to update
    formData.append('name', '99');
    formData.append('primary_email', '14_backup1@email.com');
    formData.append('backup_email', '16backup1@email.com');
    formData.append('backup_email2', '12backup2@email.com');
    formData.append('phone_number', '9996555894');
    formData.append('backup_phone_number', '4545454');
    formData.append('facebook_link', 'https://www.facebook.com/username');
    formData.append('instagram_username', 'username');
    formData.append('twitter_username', 'username');
    formData.append('profile_image', ' ');
    formData.append('personalized_message', 'new');

    // cy.request({
    //   method: 'PUT',
    //   url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator',
    //   body: formData,
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //     'Content-Type': 'multipart/form-data',
    //   }
    // }).then(response => {
    //   //expect(response.status).to.equal(200);
    //   console.log('Validator updated successfully:', response.body);
    // });
    cy.request({
      method: 'DELETE',
      url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator?id=QwhSR61GH09Q6yHKXMFW', //Place the ID Here 
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then(response => {
      //expect(response.status).to.equal(200);
      console.log('Validator Deleted successfully:', response.body);
    });
  });
});