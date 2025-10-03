class DashboardPage {
  elements = {
    dashboardHeader: () => cy.contains('Dashboard'),
    sidePanel: () => cy.get('.oxd-sidepanel'),
    adminMenu: () => cy.contains('Admin'),
    myInfoMenu: () => cy.contains('My Info'),
  };

  verifyDashboardVisible() {
    cy.url().should('include', '/dashboard');
    this.elements.dashboardHeader().should('be.visible');
  }

  minimizeSidebar() {
    cy.get('.oxd-main-menu-search').parent().find('button').click();
    this.elements.sidePanel().should('have.class', 'toggled');
  }

  openAdminMenu() {
    this.elements.adminMenu().click();
    cy.url().should('include', '/admin');
  }

  openMyInfo() {
    this.elements.myInfoMenu().click();
    cy.url().should('include', '/viewPersonalDetails');
  }
}

export default new DashboardPage();
