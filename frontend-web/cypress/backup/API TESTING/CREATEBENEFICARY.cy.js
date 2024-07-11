describe('Your Test Suite', () => {
  let authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyZTgyNzMyYjk3MWExMzVjZjE0MTZlOGI0NmRhZTA0ZDgwODk0ZTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2FmZWhlcml0LTQzMWM0IiwiYXVkIjoic2FmZWhlcml0LTQzMWM0IiwiYXV0aF90aW1lIjoxNjk3MjI3ODAzLCJ1c2VyX2lkIjoiTUdxREdzVWwwRFpIOE02ejI5SDFtcVBmcm1ZMiIsInN1YiI6Ik1HcURHc1VsMERaSDhNNnoyOUgxbXFQZnJtWTIiLCJpYXQiOjE2OTcyMjc4MDMsImV4cCI6MTY5NzIzMTQwMywiZW1haWwiOiJhajcwMDk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhajcwMDk1QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.N0JirHEiTBoi1yq6I_H_Lt-74MNX43FkJmZdmr0nZ4UrwRD-AgIjrzZ-UIHpCgsbTjZVk6tCAVz0dbx3QlpthNYmQn8oXiU7ktHyS39N8D3hW5LaCONlh6DD_h4W7DHssFwn5whDPomS_p9wKQyc7Ni6HptZy_ySex6HBtwhs2NJGl3FxZifHTlDQA17a47d2ne1iGM0Y27xXZd7DEf9MwpuLKnCYxBWAJ4T8ucSEDqqQH1EnoauUfmo9B74Hwza9mqJy9QlA_gcP_yEfbQl9itpcnUpPkxrWzX66B8dzgauHAcB0TlILEzsPHBISruxTZCyLaBaTt8HxsCc_UkcIQ'; // Replace with your actual auth token
  it('Add beneficiary', () => {
    const formData = new FormData();
    formData.append('name', '99');
    formData.append('primary_email', 'backup1@email.com');
    formData.append('backup_email', 'backup1@email.com');
    formData.append('backup_email2', 'backup2@email.com');
    formData.append('phone_number', '9996555894');
    formData.append('backup_phone_number', '4545454');
    formData.append('facebook_link', 'https://www.facebook.com/username');
    formData.append('instagram_username', 'username');
    formData.append('twitter_username', 'username');
    formData.append('profile_image', ' ');
    formData.append('personalized_message', 'new');

    cy.request({
      timeout: 20000,
      method: 'POST',
      url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary',
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      //expect(response.status).to.equal(200).to.equal(201);
      cy.log('Created beneficiary', response);
    });
  });
});
