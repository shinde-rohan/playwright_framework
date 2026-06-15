// pages/LoginPage.js
import { LoginLocators } from "../locators/LoginLocators.js";

export class LoginPage {
  constructor(page) {
    this.page = page; // store the Playwright page instance
  }

  async login(username, password) {
    await this.page.fill(LoginLocators.userNameInput, username);
    await this.page.fill(LoginLocators.passwordInput, password);
    await this.page.click(LoginLocators.loginButton);
  }
}
