describe('Your Test Suite Description', () => {
  it('Your Test Case Description', () => {
    const formData = new FormData();
    formData.append('displayName', 'Ahmed');
    formData.append('language', 'en');
      const currentFile = 'C:\Users\MBF>"C:\Users\MBF\Desktop\Bit SafeHHerit\safeherit-cypress\API\download (1).png'; // change path here
      cy.readFile(currentFile).then((fileContent) => {
      const modifiedImg = new Blob([fileContent], { type: 'image/png' });
      formData.append('profile_image', modifiedImg, 'C:\Users\MBF>"C:\Users\MBF\Desktop\Bit SafeHHerit\safeherit-cypress\API\download (1).png"'); // change path here 
      cy.request({
        method: 'PUT',
        url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth',
        headers: {
          Authorization: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBkMGU4NmJkNjQ3NDBjYWQyNDc1NjI4ZGEyZWM0OTZkZjUyYWRiNWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2FmZWhlcml0LTQzMWM0IiwiYXVkIjoic2FmZWhlcml0LTQzMWM0IiwiYXV0aF90aW1lIjoxNjk4MTc3NjYxLCJ1c2VyX2lkIjoiMDV4MkVYSE05bFZRVEFNdGFSNGRRazl3Z3loMiIsInN1YiI6IjA1eDJFWEhNOWxWUVRBTXRhUjRkUWs5d2d5aDIiLCJpYXQiOjE2OTgxNzc2NjEsImV4cCI6MTY5ODE4MTI2MSwiZW1haWwiOiJibGFja3Nob3BAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImJsYWNrc2hvcEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.cvT-fHDGeM_6q9L0xHAyrpOXn5Ya0AAHpryBrbjzXdeHnUWZ66GArXAJhnOqfkBwrjAmCdrbySpgJr4rpYHpxJ_H4f_yLa9LYFwYhOrQmCZc-W3ZxUQSnWIB4xKjYB3gdS3WAe4J2aoEmKgfzTGcIYXzbn1uBKO2_0ouSCznEsQ4ObaIEL4lcqgRUzM9zof3vQrdPJW4ko8DM2TRZDsODjJFinrqZALQ_OGCaYKc-zqk0CEwl8VGq10OQ8uwrI3MqBUr2x-gw6Zj0hEgLm2NZPIRpZLwNK3XMHIYZrF93hHa16XVFv8Bp8-xEi7M0qSecZyp4QjoETdehdW7hy2x4g', // Replace with your actual token
          'Content-Type': 'multipart/form-data',
        },
        body: formData, 
      }).then((response) => {
        cy.log(response.body);
      });
    });
  });
});