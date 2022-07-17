'use strict';

const base64 = require('base-64');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function getBasicHeader(username = 'user1', password = 'password') {
  let encodedString = base64.encode(`${username}:${password}`);
  return `Basic ${encodedString}`;
}

function generateToken(user) {
  if (!user) throw new Error('ERROR: user object required');
  const SECRET = process.env.SECRET;
  const EXPIRATION = process.env.EXPIRATION;
  
  return jwt.sign({username: user.username}, SECRET);
}

function getBearerHeader(user) {
  return `Bearer ${generateToken(user)}`;
}

module.exports = {
  getBasicHeader,
  getBearerHeader
}
