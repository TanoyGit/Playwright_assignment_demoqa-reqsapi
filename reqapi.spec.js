// tests/reqapi.spec.js

const { test, expect } = require('@playwright/test');

let userId;

const headers = {
  'x-api-key': 'free_user_3ECUQoDjKqCERLZXnxac66bBeEj'
};

test('Create User', async ({ request }) => {

  const response = await request.post(
    'https://reqres.in/api/users',
    {
      headers,
      data: {
        name: 'Tanoy',
        job: 'QA Automation Engineer'
      }
    }
  );

  console.log(await response.text());

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  console.log(responseBody);

  userId = responseBody.id;
});

test('Get User Details', async ({ request }) => {

  const response = await request.get(
    `https://reqres.in/api/users/2`,
    {
      headers
    }
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log(responseBody);
});

test('Update User', async ({ request }) => {

  const response = await request.put(
    `https://reqres.in/api/users/2`,
    {
      headers,
      data: {
        name: 'Tanoy Saha'
      }
    }
  );

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  console.log(responseBody);

  expect(responseBody.name)
    .toBe('Tanoy Saha');
});