
let authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyZTgyNzMyYjk3MWExMzVjZjE0MTZlOGI0NmRhZTA0ZDgwODk0ZTciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2FmZWhlcml0LTQzMWM0IiwiYXVkIjoic2FmZWhlcml0LTQzMWM0IiwiYXV0aF90aW1lIjoxNjk3MjE3NTU1LCJ1c2VyX2lkIjoiTUdxREdzVWwwRFpIOE02ejI5SDFtcVBmcm1ZMiIsInN1YiI6Ik1HcURHc1VsMERaSDhNNnoyOUgxbXFQZnJtWTIiLCJpYXQiOjE2OTcyMTc1NTUsImV4cCI6MTY5NzIyMTE1NSwiZW1haWwiOiJhajcwMDk1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhajcwMDk1QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.T3MW6PXNPDcO_G8rzQOqWX7WdWSRlvgiGGGcxHpgIwWnk-OBiKU1cE1k5RyNCdDg_By9EOeZtYInqFIgulscfAkZf0uoHhZzN9h-kKkRoRW48mwSQMXDQapnVZgSqEkRE0S54fMCd4-cjDd852b94Xqb-N-E_QWbWtmFsEc3yyFP8iMTB8-7SG56DMbun-2M8TBx0bXtWQ8VVKn7DPvrTFhkUpMy002_QpOEZE_sEhuhShpLxwuhqf7UD3mcXShJEFA5TK28QFDdcdwekmDx0TclWYjlFlTgnr5O9MBq4hdkOl11fc96rWVlgbSzi-3tFXNjV1u2-egVId9KGO2xww'; // Replace with your actual auth token
describe('Your Test Suite', () => {
  // let id; // Variable to hold the extracted ID
  it('Add Beneficiary', () => {
    const formData = new FormData();
    //formData.append('id', '');
    formData.append('name', '99');
    formData.append('primary_email', 'ahmed0205@gmail.com');
    formData.append('backup_email', 'ahmed222@gmail.com');
    formData.append('backup_email2', 'backup5212@email.com');
    formData.append('phone_number', '9996555894');
    formData.append('backup_phone_number', '4545454');
    formData.append('facebook_link', 'https://www.facebook.com/username');
    formData.append('instagram_username', 'username');
    formData.append('twitter_username', 'username');
    formData.append('profile_image', ' ');
    formData.append('personalized_message', 'new');

    try {
      cy.request({
        timeout: 20000,
        method: 'POST',
        url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary',
        body: formData,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',

        },
        responseType: 'json',

      }).then(async (response) => {
        var str = new TextDecoder().decode(response.body)
        var apiData = JSON.parse(str)
        cy.log('Getting the validator which was created')
        cy.wait(4000)
        getUser(apiData?.data?.id)
        cy.log('this is newly created validator',apiData?.data?.id)
        cy.wait(4000)
        await editUser(apiData?.data?.id)
        cy.wait(4000)
        getUseragain(apiData?.data?.id)
        cy.wait(4000)
        deleteUser(apiData?.data?.id)
        cy.log('ID:', apiData);
      });
    } catch (err) {
      cy.log(err)
    }
  });
});

export const getUser = async (id) => {
  cy.request({
    timeout: 20000,
    method: 'GET',
    url: `https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=/${id}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  }).then((response) => {
    // Log the response or perform necessary assertions
    console.log('Beneficiary retrieved successfully:', response.body);
    cy.log('response is ',response.body)
  });
}

export const editUser = async (id) => {
  const formData = new FormData();
  formData.append('id', id);// Place the ID Here and fill out the date which needs to update
  formData.append('name', 'ahmed');
  formData.append('primary_email', 'ahmed0205@gmail.com');
  formData.append('backup_email', 'ahmed22@gmail.com');
  formData.append('backup_email2', 'backup5212@email.com');
  formData.append('phone_number', '54545454');
  formData.append('backup_phone_number', '5454545');
  formData.append('facebook_link', 'https://www.facebook.com/username');
  formData.append('instagram_username', 'username');
  formData.append('twitter_username', 'username');
  formData.append('profile_image', ' ');
  formData.append('personalized_message', 'new');

  cy.request({
    method: 'PUT',
    url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary',
    body: formData,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data',
    }
  }).then(response => {
    //expect(response.status).to.equal(200);
    console.log('Beneficiary updated successfully:', response.body);
  });
}

export const getUseragain = async (id) => {
  cy.request({
    timeout: 20000,
    method: 'GET',
    url: `https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=/${id}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  }).then((response) => {
    // Log the response or perform necessary assertions
    console.log('Beneficiary retrieved successfully:', response.body);
  });
}

export const deleteUser = (id) => {
  cy.request({
    method: 'DELETE',
    url: `https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary?id=${id}`, //Place the ID Here 
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data',
    }
  }).then(response => {
    //expect(response.status).to.equal(200);
    console.log('Beneficiary Deleted successfully:', response.body);
  });
}




