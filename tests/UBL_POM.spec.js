import { test, expect } from '@playwright/test';
import RDAFormPage from '../Pages/RDAFormPage';

test('UBL Happy Flow - POM', async ({ page }) => {
  const rda = new RDAFormPage(page);

  const testImage = 'C:/Users/Noreen/Downloads/Screenshot 2026-04-16 115601.png';

  await rda.navigate();
  await rda.startApplication();
  await rda.completeInitialSteps();

  await rda.selectCity('Karachi');
  await rda.selectBranch('Buffer Zone');
  await rda.continuePreferences();

  // ✅ FIXED variable
  await rda.uploadDocuments(testImage);

  await rda.fillPersonalDetails({
    name: 'Tester',
    cnic: '4210142000000',
    issueDate: '09/08/2016',
    expiryDate: '08/09/2026',
    dob: '19/08/1988',
    fatherName: 'Tester a',
    
  });

 await rda.fillMotherName(
    'Tester m'
  );

  // ✅ FIXED arguments
  await rda.fillContactDetails(
    '1234567890',
    'noreenhashimkhan@gmail.com'
  );

  await rda.proceedToOTP();

  // await expect(page.getByText(/OTP|verification/i)).toBeVisible();
});