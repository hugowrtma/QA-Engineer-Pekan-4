// Sanbercode Tugas 18 - Automation API Cypress
// Author: Oktaryan Hugo Wiratama

describe('Reqres API Automation - Fixed with API Key', () => {
  const baseUrl = 'https://reqres.in/api';
  const headers = { 'x-api-key': 'reqres-free-v1' };

  // TC_001 - Get Users List
  it('TC_001 - Get Users List', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=2`,
      headers,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
    });
  });

  // TC_002 - Get Single User
  it('TC_002 - Get Single User', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/2`,
      headers,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('id');
    });
  });

  // TC_003 - Single User Not Found
  it('TC_003 - Single User Not Found', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/23`,
      headers,
      failOnStatusCode: false,
    }).then((response) => {
      // kadang Reqres balas 401 kalau header hilang, tapi sekarang sudah dikasih key
      expect([404, 401]).to.include(response.status);
    });
  });

  // TC_004 - Create User
  it('TC_004 - Create User', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers,
      body: {
        name: 'Hugo',
        job: 'QA Tester',
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq('Hugo');
    });
  });

  // TC_005 - Login Successful
  it('TC_005 - Login Successful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers,
      body: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  // TC_006 - Login Unsuccessful
  it('TC_006 - Login Unsuccessful', () => {
    cy.request({
      method: 'POST',
      url: `${baseUrl}/login`,
      headers,
      failOnStatusCode: false,
      body: {
        email: 'peter@klaven',
      },
    }).then((response) => {
      expect([400, 401]).to.include(response.status);
      expect(response.body).to.have.property('error');
    });
  });

  // TC_007 - Update User (PUT)
  it('TC_007 - Update User (PUT)', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      headers,
      body: {
        name: 'Hugo',
        job: 'Automation QA',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('Hugo');
      expect(response.body).to.have.property('updatedAt');
    });
  });

  // TC_008 - Update User (PATCH)
  it('TC_008 - Update User (PATCH)', () => {
    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/2`,
      headers,
      body: {
        job: 'Junior QA',
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.job).to.eq('Junior QA');
      expect(response.body).to.have.property('updatedAt');
    });
  });

  // TC_009 - Delete User
  it('TC_009 - Delete User', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      headers,
    }).then((response) => {
      expect([204, 200]).to.include(response.status);
    });
  });

  // TC_010 - Delayed Response
  it('TC_010 - Delayed Response', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?delay=3`,
      headers,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data[0].id).to.exist;
    });
  });
});
