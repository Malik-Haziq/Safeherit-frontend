describe('Your Test Suite', () => {
  let authToken = ''; //ADD TOKEN HERE.

  it('Add asset', () => {
    const formData = new FormData();
    formData.append('category', 'Real Estate');
    formData.append('assignedBeneficiaryId', '');// For creating an asset add BENEFICARY ID HERE
    formData.append('data', '{ body: "temp" }');
    //formData.append('asset_file', '  ');
   
    cy.request({
      timeout: 20000,
      method: 'POST',
      url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset',
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      //expect(response.status).to.equal(200).to.equal(201);
      cy.log('Created Asset', response);
    });
  });
});
