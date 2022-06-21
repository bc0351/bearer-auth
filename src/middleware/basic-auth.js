'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { userInterface } = require('../models/index');

async function basicAuth(req, res, next) {
  const saltRounds = 5;
  console.log(`REQUEST HEADERS: ${req.body.username} ${req.body.password}`);
  let { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    res.sendStatus(401);
  } else {
    let authStr = authorization.split(' ')[1];
    console.log('authStr:', authStr);
    let decodedAuthStr = base64.decode(authStr);
    console.log('decodedAuthStr:', decodedAuthStr);
    let [decodedUsername, decodedPassword] = decodedAuthStr.split(':');
    let username = decodedUsername;
    let password = decodedPassword;
    console.log('username:', username);
    console.log('password:', password);
    let user = userInterface.findOne({ username: username });
    if (user !== null) {
      let validUser = await bcrypt.compare(password, user.password);
      console.log(validUser);
      if (validUser) {
        req.user = user;
        next();
      } else {
        next('Invalid Login');
      }
    } else {
      // let salt = await bcrypt.genSalt(saltRounds);
      let encryptedPassword = await bcrypt.hash(password, saltRounds);
      console.log(`encryptedPassword: ${encryptedPassword}`);
      user = await userInterface.create({
        username,
        password: encryptedPassword
      });
    }
  }
};

async function basicEncrypt(req, res, next) {
  try {
    const saltRounds = 5;
    console.log(req.body);
    let { username, password } = req.body;
    let salt = await bcrypt.genSalt(saltRounds);
    let encryptedPassword = await bcrypt.hash(password, salt);
    console.log(`encryptedPassword: ${encryptedPassword}`);
  } catch (err) {

  }
}

module.exports = { basicAuth };
