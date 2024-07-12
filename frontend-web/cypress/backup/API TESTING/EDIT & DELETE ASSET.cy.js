describe('Your Test Suite', () => {
  let authToken = ''; // Replace with your actual token

  it('Edit Asset', () => {
    const formData = new FormData();
    formData.append('id', '');// Place the ID Here and fill out the date which needs to update
    formData.append('category', 'Real Estate');
    formData.append('assignedBeneficiaryId', '');// Editing asset add BENEFICARY ID HERE
    formData.append('data', '{ body: "temp" }');
    //formData.append('asset_file', '  ');


    cy.request({
      method: 'PUT',
      url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset',
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then(response => {
      //expect(response.status).to.equal(200);
      console.log('asset updated successfully:', response.body);
    });
    cy.request({
      method: 'DELETE',
      url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-asset?id=j7OAsPmr6OwvPji78E09', //Place the ID Here 
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then(response => {
      //expect(response.status).to.equal(200);
      console.log('asset Deleted successfully:', response.body);
    });
  });
});