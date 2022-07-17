'use strict';

const express = require('express');
const authRouter = express.Router();

const bearerAuth = require('../middleware/bearer-auth.js');

const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret
} = require('./handlers.js');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', bearerAuth, handleSignin);
authRouter.get('/users', bearerAuth, handleGetUsers);
authRouter.get('/secret', bearerAuth, handleSecret);

module.exports = authRouter;
