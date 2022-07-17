'use strict';

const { users } = require('../models/index.js');
const base64 = require('base-64');

async function handleSignup(req, res, next) {
  try {
    let encodedUser = req.headers.authorization.split(' ')[1];
    let [username, password] = base64.decode(encodedUser).split(':');
    let user = {};
    user.username = username;
    user.password = password;

    let userRecord = await users.create(user);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    console.log(output);
    res.status(201).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    let {username} = req.user.username;
    let userRecord = await users.findOne({where: {username}});

    const user = {
      user: userRecord.username,
      token: userRecord.token
    };

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await Users.findAll({});
    const list = users.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).text("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
}
