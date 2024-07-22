describe('Your Test Suite', () => {
  let authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyZTgyNzMyYjk3MWExMzVjZjE0MTZlOGI0NmRhZTA0ZDgwODk0ZTciLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQm95a2ExMCIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9zYWZlaGVyaXQtNDMxYzQiLCJhdWQiOiJzYWZlaGVyaXQtNDMxYzQiLCJhdXRoX3RpbWUiOjE2OTcwMzU2MzcsInVzZXJfaWQiOiJpNU84UkZzS1dRVThCaUJ1SDNkODk4ZzFDbGgyIiwic3ViIjoiaTVPOFJGc0tXUVU4QmlCdUgzZDg5OGcxQ2xoMiIsImlhdCI6MTY5NzAzNTYzNywiZXhwIjoxNjk3MDM5MjM3LCJlbWFpbCI6ImFqNzAwOTVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFqNzAwOTVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gIbCrw9DZCkqZdAtZkOQsynrQty_qesuJj-ZkwProqvzQoO413NdDaLLqwg4QOLaySON0ULkQ3Qw7FiQyRIy5_iv717WOndCjmwpX7iosp8cvm9opP4bq7M62FKyPfTQ83fxpYN82aFk-1dYHxNrJYr7_pEkHPCWwUlGVBLpMbo4kCO22TK5vDexENu2rtUeisL0kyHPP6dzQgOwGN-tGyCMXuQNV75A7SSfbg-FjGSbCwbZokO4eWB3ch-QXarqmDhe0sVXQg0xf4_hS6ABhtC_wck4Px48reFJlr8kHamhLw2Ns1OT863_esEf60-6UhdpA5mZNWFDEpanhb4Ixg '
  it('Add validator', () => {
    const formData = new FormData();
    formData.append('id', '');
    formData.append('name', '99');
    formData.append('primary_email', 'ahmed1222@gmail.com');
    formData.append('backup_email', 'waseem11122113@gmail.com');
    formData.append('backup_email2', 'backup512@email.com');
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
        url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-validator',
        body: formData,
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
          
        },
        responseType: 'json',

      }).then((response) => {
        // Check if the response is in JSON format
        // if (response.headers['content-type'].includes('application/json')) {
        // Parse the response body as JSON
        var str = new TextDecoder().decode(response.body)
        var json = JSON.parse(str)
        cy.log(response)
        const responseBody = response.body;

        // Assuming the response contains the ID
        const id = responseBody;

        // Log the ID
        cy.log('ID:', json.data.id);

        // } else {
        //   // Handle non-JSON response here
        //   cy.log('Response is not in JSON format');
        // }
      });
    } catch (err) {
      cy.log(err)
    }
  });
});
