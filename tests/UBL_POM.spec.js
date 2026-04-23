import { test, expect } from '@playwright/test';
import RDAFormPage from '../Pages/RDAFormPage';

test('UBL Happy Flow - POM', async ({ page }) => {
  const rda = new RDAFormPage(page);

  // Is file ka test-data folder mein hona zaroori hai
  const testImageName = 'Screenshot 2026-04-22 180521.png';

  await rda.navigate();
  await rda.startApplication();
  await rda.completeInitialSteps();

  await rda.selectCity('Karachi');
  await rda.selectBranch('Buffer Zone');
  await rda.continuePreferences();

  // ✅ FIXED: Pass the variable here
  await rda.uploadDocuments(testImageName); 

  await rda.fillPersonalDetails({
    name: 'Tester',
    cnic: '4210142000000',
    issueDate: '09/08/2016',
    expiryDate: '08/09/2026',
    dob: '19/08/1988',
    fatherName: 'Tester a',
  });

  await rda.fillMotherName('Tester m');

  await rda.fillContactDetails(
    '1234567890',
    'noreenhashimkhan@gmail.com'
  );

  await rda.proceedToOTP();
  
  // Optional: Add assertion to confirm OTP screen reached
  // await expect(page.locator('text=Verification')).toBeVisible();
});