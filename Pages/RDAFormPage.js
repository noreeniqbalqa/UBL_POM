import path from 'path';

export default class RDAFormPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(
      'https://www.ubldigital.com/NRP-Services/Roshan-Digital-Account-Opening-Form'
    );
  }

  async startApplication() {
    await this.page.getByRole('button', { name: "Let's Begin" }).click();
  }

  async completeInitialSteps() {
    await this.page.locator('#btnNext_residentCheck').click();
    await this.page.locator('#btnNext_1').click();

    await this.page.locator('#dnn_ctr7394_RdaAccountForm_pnlAccountType').click();

    await this.page.getByText('PKR').click();

    await this.page.locator('#dnn_ctr7394_RdaAccountForm_pnlAccountCurrency').click();
  }

  async selectCity(city) {
    await this.page.locator('#select2-dnn_ctr7394_RdaAccountForm_ddlCity-container').click();

    const searchField = this.page.locator('.select2-search__field');
    await searchField.waitFor({ state: 'visible' });
    await searchField.fill(city);

    await this.page.locator('.select2-results__option', { hasText: city }).first().click();
  }

  async selectBranch(branch) {
    await this.page.locator('#select2-ddlBranches-container').click();

    const searchField = this.page.locator('.select2-search__field');
    await searchField.waitFor({ state: 'visible' });
    await searchField.fill(branch);

    await this.page.locator('.select2-results__option', { hasText: branch }).first().click();
  }

  async continuePreferences() {
    await this.page.locator('#btnContinuePrefPrimaryRDA').click();
  }

  // ✅ STABLE FILE UPLOAD
  async uploadDocuments(filePath) {
    const finalPath =
      filePath ||
      path.resolve(
        'C:/Users/Noreen/Downloads/Screenshot 2026-04-16 115601.png'
      );

    const fileInputs = this.page.locator('input[id^="filepond--browser"]');

    await fileInputs.first().waitFor({ state: 'visible' });

    await fileInputs.nth(0).setInputFiles(finalPath);
    await fileInputs.nth(1).setInputFiles(finalPath);

    // Wait for upload completion (Remove button visible)
    await this.page.getByRole('button', { name: /remove/i }).first().waitFor({ state: 'visible', timeout: 50000 });
  }

  async fillPersonalDetails(data) {
    await this.page.locator('#dnn_ctr7394_RdaAccountForm_txtFullName').fill(data.name);

    await this.page.locator('#dnn_ctr7394_RdaAccountForm_txtNIC').fill(data.cnic);

    await this.page.locator('#dnn_ctr7394_RdaAccountForm_txtDateOfIssuance').fill(data.issueDate);

    await this.page.locator('#dnn_ctr7394_RdaAccountForm_txtDateOfExpiry').fill(data.expiryDate);

    await this.page.locator('#dnn_ctr7394_RdaAccountForm_txtDateOfBirth').fill(data.dob);

    await this.page.locator('#dnn_ctr7394_RdaAccountForm_txtFatherName').fill(data.fatherName);

    await this.page.locator('#btnNext_5').click();
  }

  async fillMotherName(name) {
    await this.page.locator('#dnn_ctr7394_RdaAccountForm_txtMotherName').fill(name);
    await this.page.locator('#btnNext_6').click();
  }

  // ✅ FIXED SELECT2 COUNTRY DROPDOWN
  async fillContactDetails(phone, email) {
    // Open dropdown
    await this.page.locator('#select2-dnn_ctr7394_RdaAccountForm_ddlCountryCode-container').click();

    // Wait for search input
    const searchField = this.page.locator('.select2-search__field');
    await searchField.waitFor({ state: 'visible' });

    // Type country
    await searchField.fill('USA');

    // Select option
    await this.page.locator('.select2-results__option', { hasText: 'USA' }).first().click();

    // Fill phone
    await this.page.locator('input[placeholder*="X"]').fill(phone);
    await this.page.waitForTimeout(1500);

    // Fill email
    await this.page.locator('#dnn_ctr7394_RdaAccountForm_txtEmail').fill(email);
    await this.page.waitForTimeout(1500);
    await this.page.locator('#btnNext_9').click();
  }

  async proceedToOTP() {
     await this.page.locator('#btnNextDetailsPrimaryRDA').click();  
     await this.page.waitForTimeout(5000);
     await this.page.locator('#dnn_ctr7394_RdaAccountForm_Eotp1').click();
     await this.page.locator('#btnVerifyEmailOTPPrimaryRDA').click();
     await this.page.pause();

  }
}