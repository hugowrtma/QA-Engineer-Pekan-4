// Sanbercode Tugas 16 - Intercept
// Author: Oktaryan Hugo Wiratama

// Base URL
const baseUrl = 'https://opensource-demo.orangehrmlive.com/';

describe('OrangeHRM Automation Test', () => {

  it('TC_001 - Login with valid credentials (Intercept)', () => {
    cy.visit(baseUrl);

    // Intercept login request
    cy.intercept('POST', '**/auth/validate').as('loginRequest');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Wait and verify response
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.url().should('include', '/dashboard');
  });

  it('TC_002 - Login with invalid credentials (Intercept)', () => {
    cy.visit(baseUrl);

    cy.intercept('POST', '**/auth/validate').as('invalidLogin');

    cy.get('input[name="username"]').type('InvalidUser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.wait('@invalidLogin').then((interception) => {
      expect(interception.response.statusCode).to.eq(401);
    });

    cy.contains('Invalid credentials').should('be.visible');
  });

  it('TC_003 - View Dashboard after login', () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.get('h6').contains('Dashboard', { timeout: 10000 }).should('be.visible');
  });

  it('TC_004 - Minimize Sidebar', () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-main-menu-search').parent().find('button').click();
    cy.get('.oxd-sidepanel').should('have.class', 'toggled');
  });

  it('TC_005 - Access Admin Menu (Intercept)', () => {
    cy.visit(baseUrl);

    cy.intercept('GET', '**/api/v2/admin/**').as('adminMenu');

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('Admin').click();
    cy.wait('@adminMenu');
    cy.url().should('include', '/admin');
    cy.contains('User Management').should('be.visible');
  });

  it('TC_006 - Search Employee in PIM (Intercept)', () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('PIM').click();
    cy.url().should('include', '/pim/viewEmployeeList');

    // Intercept employee search request
    cy.intercept('GET', '**/api/v2/pim/employees*').as('searchEmployee');

    cy.get('input[placeholder="Type for hints..."]').eq(0).type('Sophia Turner');
    cy.get('button[type="submit"]').click();

    cy.wait('@searchEmployee').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.data).to.not.be.empty;
    });

    cy.get('.oxd-table-card', { timeout: 10000 }).should('contain.text', 'Sophia Turner');
  });

  it('TC_007 - View Leave List (Intercept)', () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // Intercept Leave List API call
    cy.intercept('GET', '**/api/v2/leave/leave-requests*').as('leaveList');

    cy.contains('Leave').click();
    cy.contains('Leave List').click();

    cy.wait('@leaveList').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.contains('Leave List').should('be.visible');
  });

  it('TC_008 - Access Time Module', () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('Time').click();
    cy.contains('Timesheets').should('be.visible');
  });

  it('TC_009 - Access My Info Page', () => {
    cy.visit(baseUrl);
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.contains('My Info').click();
    cy.url().should('include', '/viewPersonalDetails');
    cy.contains('Personal Details').should('be.visible');
  });

});
