// Sanbercode Tugas 16 - Intercept
// Author: Oktaryan Hugo Wiratama

const baseUrl = 'https://opensource-demo.orangehrmlive.com/';

// TC_001 - Login dengan kredensial valid
it('TC_001 - Login with valid credentials', () => {
  cy.intercept('POST', '**/web/index.php/auth/validate*').as('loginRequest');
  cy.visit(baseUrl);
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();
  cy.wait('@loginRequest').its('response.statusCode').should('be.oneOf', [200, 302]);
  cy.url().should('include', '/dashboard');
});

// TC_002 - Login dengan kredensial salah
it('TC_002 - Login with invalid credentials', () => {
  cy.intercept('POST', '**/web/index.php/auth/validate*').as('invalidLogin');
  cy.visit(baseUrl);
  cy.get('input[name="username"]').type('InvalidUser');
  cy.get('input[name="password"]').type('wrongpass');
  cy.get('button[type="submit"]').click();
  cy.wait('@invalidLogin');
  cy.contains('Invalid credentials').should('be.visible');
});

// TC_003 - Lihat dashboard setelah login
it('TC_003 - View Dashboard after login', () => {
  cy.intercept('GET', '**/web/index.php/api/v2/dashboard/**').as('getDashboard'); // ✅ lebih luas
  cy.visit(baseUrl);
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();

  cy.wait('@getDashboard', { timeout: 10000 })
    .its('response.statusCode')
    .should('eq', 200);

  cy.contains('Dashboard').should('be.visible');
});

// TC_004 - Buka menu Admin
it('TC_004 - Access Admin Menu', () => {
  cy.intercept('GET', '**/web/index.php/api/v2/admin/users*').as('getAdminUsers');
  cy.visit(baseUrl);
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();
  cy.contains('Admin').click();
  cy.wait('@getAdminUsers').its('response.statusCode').should('eq', 200);
  cy.contains('User Management').should('be.visible');
});

// TC_005 - Akses halaman My Info
it('TC_005 - Access My Info Page', () => {
  cy.intercept('GET', '**/web/index.php/api/v2/pim/employees/*').as('getMyInfo');
  cy.visit(baseUrl);
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button[type="submit"]').click();
  cy.contains('My Info').click();
  cy.wait('@getMyInfo').its('response.statusCode').should('eq', 200);
  cy.contains('Personal Details').should('be.visible');
});