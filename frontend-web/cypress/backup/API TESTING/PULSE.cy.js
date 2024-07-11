
  it('Add pulse check', () => {
    const formData = new FormData();
    formData.append('pulseCheckDays', '30');
    formData.append('pulseCheckEmail1', 'waseemsabir2000@gmail.com');
    formData.append('pulseCheckEmail2', 'waseemsabir2001@gmail.com');
    formData.append('pulseCheckEmail3', 'waseemsabir2003@gmail.com');
    formData.append('pulseCheckPhone1', '+923151156034');
    formData.append('pulseCheckPhone2', '+923151156035');
    formData.append('backup_email', '16backup1@email.com');
    formData.append('backup_email2', '12backup2@email.com');
    formData.append('phone_number1', '9996555894');
    formData.append('backup_phone_number2', '4545454');
    formData.append('pulseCheckValidationRequired', 'true');
    formData.append('pulseCheckNonValidationMonths', '3');
  
    cy.request({
      method: 'PUT',
      url: 'https://us-central1-safeherit-431c4.cloudfunctions.net/api-pulseCheck/',
      body: formData,
      headers: {
        Authorization: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0OWU0N2ZiZGQ0ZWUyNDE0Nzk2ZDhlMDhjZWY2YjU1ZDA3MDRlNGQiLCJ0eXAiOiJKV1QifQ.eyJpc0FkbWluIjpmYWxzZSwiaXNTdXBlckFkbWluIjpmYWxzZSwiYWNjb3VudFN0YXR1cyI6IkFjdGl2ZSIsInBheW1lbnRTdGF0dXMiOiJQZW5kaW5nIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3NhZmVoZXJpdC00MzFjNCIsImF1ZCI6InNhZmVoZXJpdC00MzFjNCIsImF1dGhfdGltZSI6MTY5OTQ2NDQ1NSwidXNlcl9pZCI6IldPUzlLaFZRUG1OVUhBcExhTXU5WjFwaWNlZTIiLCJzdWIiOiJXT1M5S2hWUVBtTlVIQXBMYU11OVoxcGljZWUyIiwiaWF0IjoxNjk5NDY0NDU1LCJleHAiOjE2OTk0NjgwNTUsImVtYWlsIjoiYWhtZWRjaGF1aGRyeTk3KzFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFobWVkY2hhdWhkcnk5NysxQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.CRrq1uAKoMigkzjcQKtfOHr0f_Ngbw0e66vMJthW6CSt5w9cDB66dL_DITF0BjSaRhugek1IN_JCnz0feZHm092SwpIxUi2G9dSWtEWLfCmXfaAOBVh4ZFslpqsk1H3pnKPY6bMv3CoPE1l0yYcOQNTodHmzECLrmW-c-D2hECthAMFGTOC9JD1cI2Tma3KwEBBDsidAHg8kOcmY9HownJCACSvQEAfbkVrlYE1IL-Wx5JbdSVhTYfq78az7zzFaJZSkG3YCPoOnozL_52Lh5XF2jpIPYnqKX_07mmapvc_9JCnVY5xiJYpx0_Nm6P8vZq3waNbHuoRAtMB0cN2aLw',
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => {
      // You can add your assertions here
      expect(response.status).to.eq(200); // Adjust the status code as needed
    });
  });