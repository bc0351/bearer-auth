'use strict';

const { server } = require('../../../../src/server');
const { db } = require('../../../../src/auth/models');
const { getBasicHeader, getBearerHeader } = require('../../../../helpers/auth/auth-functions');
const supertest = require('supertest');
const request = supertest(server);

// test variables
const username = 'user1';
const password = 'password';
let user = {username};
let token;

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  // await db.drop();
  await db.close();
});

describe('./src/auth/middleware/basic-auth.basicAuth()', () => {
  it('should successfully send a POST request to /signup', async () => {
    return request
      .post('/signup')
      .set('Authorization', getBasicHeader(username, password))
      .then(response => {
        expect(response.status).toEqual(201);
        expect(response.body.user.username).toEqual(user.username);
        expect(response.body.user.password).toBeTruthy();
        expect(response.body.user.password).not.toEqual(user.password);
      });
  });
  it('should successfully send a POST request to /signin', async () => {
    return request
      .post('/signin')
      .set('Authorization', getBearerHeader(user))
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.user.username).toEqual(user.username);
      });
  });
});
