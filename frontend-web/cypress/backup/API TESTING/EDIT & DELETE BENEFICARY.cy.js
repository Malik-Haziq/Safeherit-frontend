describe('Your Test Suite', () => {
  let authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyZTgyNzMyYjk3MWExMzVjZjE0MTZlOGI0NmRhZTA0ZDgwODk0ZTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2FmZWhlcml0LTQzMWM0IiwiYXVkIjoic2FmZWhlcml0LTQzMWM0IiwiYXV0aF90aW1lIjoxNjk3MDQ4MzAyLCJ1c2VyX2lkIjoiTUdxREdzVWwwRFpIOE02ejI5SDFtcVBmcm1ZMiIsInN1YiI6Ik1HcURHc1VsMERaSDhNNnoyOUgxbXFQZnJtWTIiLCJpYXQiOjE2OTcwNDgzMDIsImV4cCI6MTY5NzA1MTkwMiwiZW1haWwiOiJhajcwMDk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhajcwMDk1QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.REDiLZhWlJZNqcsO9R4FEBLGwDEX54K55EFViMK3MnzVbe7Dt2wO15iRqJBVvenDzvu3qKNMf5vmKkg7t81W4cZ83V0yUfaA4g1UEZFi2VjWGwl3H9mJRDLaZgZSjpaz20_8O7KrtYALf1rLXUWl-d0rpqNmSF0hFeGNZ0syqq2ebtX35qQEjsI7wKItLd8-h_U0NKhVdiZrc3fOIXkpAQ0BRRvPMqcAUs_O9eApBYME3VsQfX7hhAfnEp_HzrkQm-cf0SyDJA_Ro-2r_flR20qfqwf3bCvj4TuymVPmHn5-E7dXLvZTDSn2aWflD9iZDYCXKU-T4b2xuvHChaNQSQ'; // Replace with your actual token

  it('Edit beneficiaries', () => {
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
    //   url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiaries',
    //   body: formData,
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //     'Content-Type': 'multipart/form-data',
    //   }
    // }).then(response => {
    //   //expect(response.status).to.equal(200);
    //   console.log('beneficiaries updated successfully:', response.body);
    // });
    cy.request({
      method: 'DELETE',
      url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiaries?id=NyjZQOdesDsWW36AWFle', //Place the ID Here 
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then(response => {
      //expect(response.status).to.equal(200);
      console.log('beneficiaries Deleted successfully:', response.body);
    });
  });
});