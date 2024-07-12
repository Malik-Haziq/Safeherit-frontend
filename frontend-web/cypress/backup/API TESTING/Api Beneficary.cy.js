
describe('Your Test Suite', () => {
  let authToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2MDI3MTI2ODJkZjk5Y2ZiODkxYWEwMzdkNzNiY2M2YTM5NzAwODQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTmV3TmFtZSIsImlzQWRtaW4iOmZhbHNlLCJpc1N1cGVyQWRtaW4iOmZhbHNlLCJhY2NvdW50U3RhdHVzIjoiQWN0aXZlIiwicGF5bWVudFN0YXR1cyI6IlBhaWQiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2FmZWhlcml0LTQzMWM0IiwiYXVkIjoic2FmZWhlcml0LTQzMWM0IiwiYXV0aF90aW1lIjoxNzE0NzEyODQ1LCJ1c2VyX2lkIjoiVUVLYzdrSlF6V1VoUFFtUDRIb0FVRndGZ25TMiIsInN1YiI6IlVFS2M3a0pReldVaFBRbVA0SG9BVUZ3RmduUzIiLCJpYXQiOjE3MTQ3MTI4NDUsImV4cCI6MTcxNDcxNjQ0NSwiZW1haWwiOiJuYXNlZXJodW50ZXI1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5hc2Vlcmh1bnRlcjVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.HTN3WuTe0g4eEcFN-1J5xeTaG1fPV2dsthhUtcMVkK3bzmk3Vk0a7CdNhf7eS7SohEOs04HFuGz41lsGGukgEvJVN5EFBpgv_xiDff7Z2TRrt22UNOTNJHhh2SCA7_BESI7kA5-uSTv764CFBw0I_1qqK0yGEY7pRdNLMX7aMWqjLj8e1--AO3h4iDdmnQqK_yKZw8k_FzqZavK_i2VNink4zjRktNtHbu3gdBl6Y9oiXGoKtnm4HcTRX_5xoZkFkxt33csN7qWYcGoMnGgJnCFMP1xcLEsNA4Z0NG_kEcgYk8CIlgbxPIR_pZcpqLIrFY0HT7vzlVuYR0b5iuxjug';
  let beneficiaryIdToDelete;
  const session = 'session=eyJhbGciOiJSUzI1NiIsImtpZCI6IkUwSVZUUSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS9zYWZlaGVyaXQtNDMxYzQiLCJuYW1lIjoiTmV3TmFtZSIsImlzQWRtaW4iOmZhbHNlLCJpc1N1cGVyQWRtaW4iOmZhbHNlLCJhY2NvdW50U3RhdHVzIjoiQWN0aXZlIiwicGF5bWVudFN0YXR1cyI6IlBhaWQiLCJhdWQiOiJzYWZlaGVyaXQtNDMxYzQiLCJhdXRoX3RpbWUiOjE3MTUwNTQyNDcsInVzZXJfaWQiOiJVRUtjN2tKUXpXVWhQUW1QNEhvQVVGd0ZnblMyIiwic3ViIjoiVUVLYzdrSlF6V1VoUFFtUDRIb0FVRndGZ25TMiIsImlhdCI6MTcxNTA1NDI0NywiZXhwIjoxNzE1MDU3ODQ3LCJlbWFpbCI6Im5hc2Vlcmh1bnRlcjVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibmFzZWVyaHVudGVyNUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Mq9wo2RTdPEqMjutSeKLT7l4kgfmb7l4kD3PZ75yylyM7KjigJR0M0bqZqamGPr1gw5SlR1SaPaJoTfo9bZbOcEdHSp0cfQ1r1-b-lRA09P5rVSEx9uy7xIsRouQ5eZbqrl4Gn8To_aCA50uHnJYY-6mGD9d_KJtqpPATSjJkFrU3Zy9IIoi9syYW3Ws9IHY9qM19vgJRtPXx225ODI5UUVn3nB1YIzhS_o-DONWbD-4XcHAXnI9IpHT7yos-PI3GcC4S_Y0F-A6ULrYEz9ylH1L5d78ir-yPk7801BdiyJqtiaCPla3WPcEjPMm3KOvDUz4QUpjdRvynII-IKky3g';


  

  // it('login', () => {
  //   const loginUrl = 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/login';
  //   const email = 'naseerhunter5@gmail.com';
  //   const password = 'naseerhunter5@gmail.comV';
  //   // var FormData = require('form-data');
  //   const formData = {
  //     // Pass a simple key-value pair
  //     email: email,
  //     password: password,
  //     rememberMe: 'false'
  //   }
  //   const formData2 = new FormData();
  //   formData2.append('email', 'naseerhunter5@gmail.com');
  //   formData2.append('password', 'naseerhunter5@gmail.comV');
  //   formData2.append('rememberMe', 'false');
    
  //   cy.request({
  //     timeout: 20000,
  //     method: 'POST',
  //     url: loginUrl,
  //     headers: {
  //       // Authorization: 'Bearer '+authToken,
  //       'Content-Type': 'multipart/form-data',
  //       Cookie: 'session=eyJhbGciOiJSUzI1NiIsImtpZCI6Il9PQzZaZyJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS9zYWZlaGVyaXQtNDMxYzQiLCJuYW1lIjoiTmV3TmFtZSIsImlzQWRtaW4iOmZhbHNlLCJpc1N1cGVyQWRtaW4iOmZhbHNlLCJhY2NvdW50U3RhdHVzIjoiQWN0aXZlIiwicGF5bWVudFN0YXR1cyI6IlBhaWQiLCJhdWQiOiJzYWZlaGVyaXQtNDMxYzQiLCJhdXRoX3RpbWUiOjE3MTQ5NDc2NDEsInVzZXJfaWQiOiJVRUtjN2tKUXpXVWhQUW1QNEhvQVVGd0ZnblMyIiwic3ViIjoiVUVLYzdrSlF6V1VoUFFtUDRIb0FVRndGZ25TMiIsImlhdCI6MTcxNDk0NzY0MiwiZXhwIjoxNzE0OTUxMjQyLCJlbWFpbCI6Im5hc2Vlcmh1bnRlcjVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibmFzZWVyaHVudGVyNUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.lqlAEJy0YIddo1tHRYLtPTAu90dwvB9b2VgFFRC3LuhSPeAjW5p9iuj5p3VWHuL3DTjAromX3txTpSJntQp2zS7nZpMFKncVjQVHFfPN7sYg5aRju4YDvFiwJhXgtZoZrgDk9ARrYn7xxacVf7BsGWD3yqwL1O1qzgQ6mJmgnUZDmfH1Kqfb2D6Om_qUIYjRjHN66jFIX2d25Zzcpnb7rz1ONL3upUmL8VFCvLIN08GgpvKnTnEhb424xilQnTDs24Q3PvRCKfRlCz7xdbuAmJ0JbQg6JJuWhiL1uymcldt7VSUk7BzBB5I3UJAi0ZNZkg04q7KaqdwdNDK9m6SojQ; Max-Age=3600; Path=/; Expires=Sun, 05 May 2024 23:20:42 GMT; HttpOnly; Secure; SameSite=None',
  //     },
  //     body: formData

  //   }).then((response) => {
  //     //expect(response.status).to.equal(200).to.equal(201);
  //     expect(response.status).to.eq(200);
  //     // Assert response body properties
  //     // expect(response.body).to.have.property('success').to.be.true;
  //     // expect(response.body).to.have.property('data').to.be.an('object');
  //     cy.log('Created', response);
  //     console.log('login Response status : ' , response.status);
  //     console.log('login Response : ' , response);
  //     console.log('login Response body : ' , response.body);
  //   })
  // });
  it('Session active', () => {
    const url = 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-auth/sessionActive';
    cy.intercept({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data',
        Cookie: session,
      }
    }, {
        statusCode: 200
    }).as('getSessionData');

    cy.wait("@getSessionData").then((interception) => {
      assert(interception.response.statusCode == 200)
    })
    // cy.request({
    //     timeout: 20000,
    //     method: 'GET',
    //     url: url,
    //     headers: {
    //       // Authorization: 'Bearer '+authToken,
    //       'Content-Type': 'multipart/form-data',
    //       Cookie: session,
    //     },
    // }).then((response) => {
    //     expect(response.status).to.equal(200);
    //     console.log('Session response : ' ,response);
    //     console.log('Session response body: ' ,response.body);
    //     cy.log('Session response body: '+ response.body);
    // });
    
  });
  it('Get all beneficiaries',()=>{
    const url='https://us-central1-safeherit-431c4.cloudfunctions.net/api-beneficiary/list';

    cy.request({
      timeout: 20000,
      method: 'GET',
      url: url,
      headers: {
        // Authorization: 'Bearer '+authToken,
        'Content-Type': 'multipart/form-data',
        Cookie: 'session=eyJhbGciOiJSUzI1NiIsImtpZCI6Il9PQzZaZyJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS9zYWZlaGVyaXQtNDMxYzQiLCJuYW1lIjoiTmV3TmFtZSIsImlzQWRtaW4iOmZhbHNlLCJpc1N1cGVyQWRtaW4iOmZhbHNlLCJhY2NvdW50U3RhdHVzIjoiQWN0aXZlIiwicGF5bWVudFN0YXR1cyI6IlBhaWQiLCJhdWQiOiJzYWZlaGVyaXQtNDMxYzQiLCJhdXRoX3RpbWUiOjE3MTQ5NDc2NDEsInVzZXJfaWQiOiJVRUtjN2tKUXpXVWhQUW1QNEhvQVVGd0ZnblMyIiwic3ViIjoiVUVLYzdrSlF6V1VoUFFtUDRIb0FVRndGZ25TMiIsImlhdCI6MTcxNDk0NzY0MiwiZXhwIjoxNzE0OTUxMjQyLCJlbWFpbCI6Im5hc2Vlcmh1bnRlcjVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibmFzZWVyaHVudGVyNUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.lqlAEJy0YIddo1tHRYLtPTAu90dwvB9b2VgFFRC3LuhSPeAjW5p9iuj5p3VWHuL3DTjAromX3txTpSJntQp2zS7nZpMFKncVjQVHFfPN7sYg5aRju4YDvFiwJhXgtZoZrgDk9ARrYn7xxacVf7BsGWD3yqwL1O1qzgQ6mJmgnUZDmfH1Kqfb2D6Om_qUIYjRjHN66jFIX2d25Zzcpnb7rz1ONL3upUmL8VFCvLIN08GgpvKnTnEhb424xilQnTDs24Q3PvRCKfRlCz7xdbuAmJ0JbQg6JJuWhiL1uymcldt7VSUk7BzBB5I3UJAi0ZNZkg04q7KaqdwdNDK9m6SojQ; session=eyJhbGciOiJSUzI1NiIsImtpZCI6IkUwSVZUUSJ9.eyJpc3MiOiJodHRwczovL3Nlc3Npb24uZmlyZWJhc2UuZ29vZ2xlLmNvbS9zYWZlaGVyaXQtNDMxYzQiLCJuYW1lIjoiTmV3TmFtZSIsImlzQWRtaW4iOmZhbHNlLCJpc1N1cGVyQWRtaW4iOmZhbHNlLCJhY2NvdW50U3RhdHVzIjoiQWN0aXZlIiwicGF5bWVudFN0YXR1cyI6IlBhaWQiLCJhdWQiOiJzYWZlaGVyaXQtNDMxYzQiLCJhdXRoX3RpbWUiOjE3MTUwNTIzMjYsInVzZXJfaWQiOiJVRUtjN2tKUXpXVWhQUW1QNEhvQVVGd0ZnblMyIiwic3ViIjoiVUVLYzdrSlF6V1VoUFFtUDRIb0FVRndGZ25TMiIsImlhdCI6MTcxNTA1MjMyNywiZXhwIjoxNzE1MDU1OTI3LCJlbWFpbCI6Im5hc2Vlcmh1bnRlcjVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibmFzZWVyaHVudGVyNUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.ixV46tLfVkUM1L8metb8lcNPPVyXhiCfcZ7tBv6_vYdHy-PE8iz0F0g3baOWD6mm1pMMcVi0U6yr1-wopGR_PeYbr-t-MFX_cs2YpreUGLYryrDGnRVFCgig-THMiXcFma92Hnf1AvUb93rm7PAdS5OdM0XC2dh3KiTCN8zgBAKjqSMPJxXfyUPMR96Izj50X4e0fsGWnvVtB9EvK6faADDQmttnv4vjXS2rn85GsEBUnAN3-gH88i5lPyHgXVXTvY8l34CmOYsVVXog8anctCMXSgDjJTPot_AmqvZP6ewHNJxFc4jEp1vcOq7Wkl00YHTr1kuylkJjyFb5VLCTTA',
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      console.log('benef response : ' ,response);
      console.log('benef response body: ' ,response.body);
      cy.log('benef response body: '+ response.body);
    });
  })
  // it('Add beneficiary', () => {
  //   const addBeneficiaryUrl = 'https://testing-safeherit.web.app/api-beneficiaries';
  //   const newBeneficiaryData = {
  //     name: "Ali",
  //     primary_email: "example@email.com",
  //     backup_email: "example2@email.com",
  //     backup_email2: "example2@email.com",
  //     phone_number: "1234567890",
  //     backup_phone_number: "1234567890",
  //     facebook_link: "https://www.facebook.com/username",
  //     instagram_username: "username",
  //     twitter_username: "username",
  //     personalized_message: "This is a demo message"
  //   };

  //   cy.request({
  //     method: 'POST',
  //     url: addBeneficiaryUrl,
  //     body: newBeneficiaryData,
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,
  //     }
  //   }).then(response => {
  //     expect(response.status).to.equal(200);
  //     console.log('Beneficiary added successfully:', response.body);
  //     beneficiaryIdToDelete = response.body.beneficiaryId;
  //   });
  // });

  // it('Edit beneficiary', () => {
  //   const editBeneficiaryUrl = `https://testing-safeherit.web.app/api-beneficiaries/${beneficiaryIdToDelete}`;
  
  //   const updatedBeneficiaryData = {
  //     name: "Updated Name",
  //     // Include other beneficiary properties as needed
  //   };
  
  //   cy.request({
  //     method: 'PUT',
  //     url: editBeneficiaryUrl,
  //     body: updatedBeneficiaryData,
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,
  //     }
  //   }).then(response => {
  //     expect(response.status).to.equal(200);
  //     console.log('Beneficiary updated successfully:', response.body);
  //   });
  // });

  // it('Delete beneficiary', () => {
  //   const deleteBeneficiaryUrl = `https://testing-safeherit.web.app/api-beneficiaries/${beneficiaryIdToDelete}`;
  
  //   cy.request({
  //     method: 'DELETE',
  //     url: deleteBeneficiaryUrl,
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,
  //     }
  //   }).then(response => {
  //     expect(response.status).to.equal(200);
  //     console.log('Beneficiary deleted successfully');
  //   });
  // });
});