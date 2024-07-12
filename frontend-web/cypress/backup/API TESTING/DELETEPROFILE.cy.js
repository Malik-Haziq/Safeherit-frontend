describe('Delete Profile', () => {
  it('Delete profile', () => {

    cy.request({
      method: 'DELETE',
      url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/',
      headers: {
        'Authorization':'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBkMGU4NmJkNjQ3NDBjYWQyNDc1NjI4ZGEyZWM0OTZkZjUyYWRiNWQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiQWhtZWQiLCJpc0FkbWluIjpmYWxzZSwiaXNTdXBlckFkbWluIjpmYWxzZSwiYWNjb3VudFN0YXR1cyI6IkFjdGl2ZSIsInBheW1lbnRTdGF0dXMiOiJQZW5kaW5nIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3NhZmVoZXJpdC00MzFjNCIsImF1ZCI6InNhZmVoZXJpdC00MzFjNCIsImF1dGhfdGltZSI6MTY5ODE3NjQwMCwidXNlcl9pZCI6ImxoWTdRZ0xscVpWQVVuZlk3cVBmNXV4OTd0OTIiLCJzdWIiOiJsaFk3UWdMbHFaVkFVbmZZN3FQZjV1eDk3dDkyIiwiaWF0IjoxNjk4MTc2NDAwLCJleHAiOjE2OTgxODAwMDAsImVtYWlsIjoiYWo3MDA5NSsxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhajcwMDk1KzFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.DSfLDHy3R2Qy6FVTQ8ZmOJ7iZuikgaWTSzJJNJFgcd5Y5SPXTPlD7zHSuZo3FAB461sz3f_NSHDVufFo_FLzfOedWCaRUGlzUKF8KgQk6wOQYdY_kLytJN0BjxvxaOfqt7r64oeSUNnE6d84dJPnF7wWO8hCa8Y-g1yo4_oQaOPMxWJBu2Gh5I7k7uWvVMRWNEGwU7eLMf4pfzKPQIKe8p8IzVIrjhtsb00pC5PPhF19AfvZ8pO5DzIT3FpXfI__z1jkRODA4BInEa-R8R6d0vXQQUtaiQRscQC1rc2TLRvczDgsyaJd7k5rnSaJT0T1CzzymX390qpPEpOlo8yGBA',
      },
    }).then((response) => {
      expect(response.status).to.equal(200); 
      cy.log('Profile deleted',response.body);

      
    });
  });
});