'use strict';
const { server } = require('../src/server.js');
const { sequelize } = require('../src/models/index');
const base64 = require('base-64');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const mockRequest = supertest(server);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  // await sequelize.drop();
  await sequelize.close();
});

const mockUser = {
  username: 'ben',
  password: 'password'
};

let mockAuthString = base64.encode(`${mockUser.username}:${mockUser.password}`);

describe('Auth Tests', () => {
  test('1. POST to /signup to create a new user', async () => {

    let response = await mockRequest
      .post('/signup')
      .set('Authorization', `Bearer ${mockAuthString}`);
    expect(response.status).toEqual(201);
  });

  test('2. POST to /signin to login as a user (use basic auth)', async () => {

    let response = await mockRequest
      .post('/signin')
      .set('Authorization', `Bearer ${mockAuthString}`)
    expect(response.status).toEqual(200);
  });

  test('3. POST to /signin with a basic header', async () => {

    let response = await mockRequest
      .post('/signin')
    expect(response.status).toEqual(401);
  });

  test('4. POST to /signin with a basic header', async () => {

    let response = await mockRequest
      .post('/signin')
    expect(response.status).toEqual(401);
  });

  test('5. POST to /signin with incorrect password', async () => {
    let incorrectUser = { username: 'ben', password: 'incorrect' };
    let encryptedAuthString = base64.encode(`${incorrectUser.username}:${incorrectUser.password}`);
    let response = await mockRequest
      .post('/signin')
      .set('Authorization', `Bearer ${encryptedAuthString}`);
    expect(response.status).toEqual(500);
  });
});
