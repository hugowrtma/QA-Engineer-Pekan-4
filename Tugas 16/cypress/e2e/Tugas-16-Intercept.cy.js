// Sanbercode Quiz 3 - OrangeHRM Automation Test
// Author: Oktaryan Hugo Wiratama


// Base URL
const baseUrl = 'https://opensource-demo.orangehrmlive.com/';

it('TC_001 - Login with valid credentials', () => {
  cy.visit(baseUrl);
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/dashboard');
});

it('TC_002 - Login with invalid credentials', () => {
  cy.visit(baseUrl);
  cy.get('input[name="username"]').type('InvalidUser');
  cy.get('input[name="password"]').type('wrongpass');
  cy.get('button[type="submit"]').click();
  cy.contains('Invalid credentials').should('be.visible');
});

it('TC_003 - View Dashboard after login', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/');
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();

  // Wait for dashboard to load safely
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

it('TC_005 - Access Admin Menu', () => {
  cy.visit(baseUrl);
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();

  cy.contains('Admin').click();
  cy.url().should('include', '/admin');
  cy.contains('User Management').should('be.visible');
});

it('TC_006 - Search Employee in PIM', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/');
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();

  cy.contains('PIM').click();
  cy.url().should('include', '/pim/viewEmployeeList');

  // Use more specific selector for employee name field
  cy.get('input[placeholder="Type for hints..."]').eq(0).type('Sophia Turner');
  cy.get('button[type="submit"]').click();

  // Wait until result table loads
  cy.get('.oxd-table-card', { timeout: 10000 }).should('contain.text', 'Sophia Turner');
});

it('TC_007 - View Leave List', () => {
  cy.visit(baseUrl);
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();

  cy.contains('Leave').click();
  cy.contains('Leave List').click();
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