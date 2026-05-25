

const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('Book Store Automation', async ({ page }) => {

  // Navigate to DemoQA
  await page.goto('https://demoqa.com/');

  // Open Book Store Application
  await page.locator('text=Book Store Application').click();

  // Click Login button
  await page.locator('#login').click();

  // Login credentials
  await page.locator('#userName').fill('tanoy.s');
  await page.locator('#password').fill('Tanoy123@');

  await page.locator('#login').click();

  // Validate username
  await expect(page.locator('#userName-value'))
    .toHaveText('tanoy.s');

  // Validate logout button
  await expect(
  page.getByRole('button', { name: 'Logout' })
).toBeVisible();

  // Click Book Store button
  await page.locator('text=Go To Book Store').click();

// Search book
await page.locator('#searchBox').click();

await page.locator('#searchBox')
    .fill('Learning JavaScript Design Patterns');

// wait for table update
await page.waitForTimeout(3000);

// Validate searched book
const bookName = page.getByRole('link', {
    name: 'Learning JavaScript Design Patterns'
});


await expect(bookName).toBeVisible();

// Get Title
const title = await page.locator('//*[@id="see-book-Learning JavaScript Design Patterns"]/a')
    .innerText();

// Get Author
const author = await page.locator('//*[@id="root"]/div/div/div/div[2]/div[1]/div[2]/table/tbody/tr/td[3]')
    .innerText();

// Get Publisher
const publisher = await page.locator('//*[@id="root"]/div/div/div/div[2]/div[1]/div[2]/table/tbody/tr/td[4]')
    .innerText();

console.log(`Title: ${title}`);
console.log(`Author: ${author}`);
console.log(`Publisher: ${publisher}`);

  // Write details into file
  const data = `
Title: ${title}
Author: ${author}
Publisher: ${publisher}
`;

  fs.writeFileSync('demoqa_output/bookDetails.txt', data);

  console.log(data);

  // Logout
  await page.locator('//*[@id="submit"]').click();

});