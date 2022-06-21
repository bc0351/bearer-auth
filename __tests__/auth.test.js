'use strict';

const { server } = require('../src/server.js');
const {sequelize} = require('../src/models/index');
const base64 = require('base-64');
const supertest = require('supertest');
const mockRequest = supertest(server);

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
  await sequelize.close();
});

const mockUser = {
  username: 'ben',
  password: 'password'
};

let mockAuthString;
let mockCredentials;

describe('Auth Tests', () => {
  it('1. POST to /signup to create a new user', async () => {
    // create mockResponse
    mockAuthString = base64.encode(`${mockUser.username}:${mockUser.password}`);

    let response = await mockRequest
      .post('/signup')
      .set('Authorization', `Bearer ${mockAuthString}`);

    let responseBody = base64.decode(response.body);
    console.log(`responseBody: ${responseBody}`);
    mockCredentials = {username, password} = responseBody;
    console.log(`mockCredentials: ${mockCredentials}`);
    mockAuthString = `${mockCredentials.username}:${mockCredentials.password}`;
    console.log(`mockAuthString: ${mockAuthString}`);

    console.log('Response Body', response.body);
    expect(response.status).toEqual(201);
  });

  test('2. POST to /signin to login as a user (use basic auth)', async () => {
    // create mockResponse
    let response = await mockRequest
      .post('/signin')
      .set('Authorization', `Bearer ${ base64.encode(mockAuthString) }`)
      .send(mockCredentials);
      expect(response.status).toEqual(201);
    console.log('Response Body', response.body);
  });
});
