class LoginPage {
  elements = {
    usernameField: () => cy.get('input[name="username"]'),
    passwordField: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button[type="submit"]'),
    errorMessage: () => cy.contains('Invalid credentials'),
  };

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
  }

  login(username, password) {
    this.elements.usernameField().type(username);
    this.elements.passwordField().type(password);
    this.elements.loginButton().click();
  }
}

export default new LoginPage();
