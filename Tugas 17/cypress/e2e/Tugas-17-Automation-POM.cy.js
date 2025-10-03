// Sanbercode Tugas 17 - Automation with POM
// Author: Oktaryan Hugo Wiratama

import { loginData } from '../support/data/loginData';
import DashboardPage from '../support/pages/DashboardPage';
import LoginPage from '../support/pages/LoginPage';

describe('OrangeHRM - Login Feature (POM)', () => {
  
  beforeEach(() => {
    LoginPage.visit();
  });

  it('TC_001 - Login with valid credentials', () => {
    LoginPage.login(loginData.validUser.username, loginData.validUser.password);
    DashboardPage.verifyDashboardVisible();
  });

  it('TC_002 - Login with invalid credentials', () => {
    LoginPage.login(loginData.invalidUser.username, loginData.invalidUser.password);
    LoginPage.elements.errorMessage().should('be.visible');
  });

  it('TC_003 - Verify dashboard appears after login', () => {
    LoginPage.login(loginData.validUser.username, loginData.validUser.password);
    DashboardPage.verifyDashboardVisible();
  });

  it('TC_004 - Minimize sidebar after login', () => {
    LoginPage.login(loginData.validUser.username, loginData.validUser.password);
    DashboardPage.minimizeSidebar();
  });

  it('TC_005 - Access Admin menu after login', () => {
    LoginPage.login(loginData.validUser.username, loginData.validUser.password);
    DashboardPage.openAdminMenu();
  });

});