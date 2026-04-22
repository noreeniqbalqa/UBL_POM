import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to form page
  await page.goto('https://www.ubldigital.com/NRP-Services/Roshan-Digital-Account-Opening-Form', {
    waitUntil: 'domcontentloaded',
    timeout: 60000
  });

  // Click LET'S BEGIN
  await page.getByRole('button', { name: "Let's Begin" }).click();
  await page.waitForTimeout(1500);

  // Click Next x3
  await page.locator('#btnNext_1').click();
  await page.waitForTimeout(1500);
  await page.locator('#btnNext_1a').click();
   await page.waitForTimeout(1500);
   await page.getByText('PKR').click();
   await page.locator('#btnNext_1b').click();

   await page.getByRole('textbox', { name: 'Select one' }).click();
   await page.getByRole('searchbox').fill('kara');
   await page.getByRole('option',{ name: /karachi/i}).click();
   await page.pause();
   
   


})