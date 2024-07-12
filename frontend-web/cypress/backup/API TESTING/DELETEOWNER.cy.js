
it('Test DELETE request', () => {
  cy.request({
    method: 'DELETE',
    url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/',
    headers: {
      'Authorization': "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0OWU0N2ZiZGQ0ZWUyNDE0Nzk2ZDhlMDhjZWY2YjU1ZDA3MDRlNGQiLCJ0eXAiOiJKV1QifQ.eyJpc0FkbWluIjpmYWxzZSwiaXNTdXBlckFkbWluIjpmYWxzZSwiYWNjb3VudFN0YXR1cyI6IkFjdGl2ZSIsInBheW1lbnRTdGF0dXMiOiJQZW5kaW5nIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3NhZmVoZXJpdC00MzFjNCIsImF1ZCI6InNhZmVoZXJpdC00MzFjNCIsImF1dGhfdGltZSI6MTY5OTM4NDIwNSwidXNlcl9pZCI6IjhabjBiY2gyVjRidWVqNmhxeDdQeW9tVjduZDIiLCJzdWIiOiI4Wm4wYmNoMlY0YnVlajZocXg3UHlvbVY3bmQyIiwiaWF0IjoxNjk5Mzg0MjA1LCJleHAiOjE2OTkzODc4MDUsImVtYWlsIjoiaWhiYXJ6bmpAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImloYmFyem5qQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.VPpsRuOlf2PkrRbfyyLOGLweqvDESBJKk87KbmCpSsEePuRaBH5UtxQuQS-KM7CFFp-0X2Ly8GZVNSXU3frsfEnEdwsK-Sx2iO21IbP_be-z-GK12ziskNCWz-lOIm9RO9mDIvWZ4xkUaA3vU8sma8lCe8qrqfqpgCTlGqU65koe-WOhji9j8rzUWFN96rvTVbztajvE4XPI9KAIHE7UVdqqbBBtcdFPiUESLbEI_N5RvKMRvMSEjVwBRvDJ7ryk3uMTbQab-YQRSuyY2Pn-no9Bp0HJt45_5iIpiMq7sTfDcMDXiwRBDayuzSMsbcAtNknbz6TAyCwHdjuLvi9Iew"
    },
  }).then((response) => {
    // You can assert on the response as needed
    expect(response.status).to.equal(200); // Adjust the status code as per your API's response
    // You can also log the response if needed
    cy.log(response.body);
  });
});