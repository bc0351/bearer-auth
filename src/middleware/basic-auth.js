'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { userInterface } = require('../models/index');

const saltRounds = 5;

async function authorize(req, res, next) {
  try {

    let { authorization } = req.headers;

    if (!authorization) {
      res.sendStatus(401);
      next();

    } else {

      let authStr = authorization.split(' ')[1];
      // console.log('authStr:', authStr);

      let decodedAuthStr = base64.decode(authStr);
      // console.log('decodedAuthStr:', decodedAuthStr);

      let [username, password] = decodedAuthStr.split(':');

      // console.log('username:', username);
      // console.log('password:', password);

      let user = await userInterface.findOne({username: username});
      
      if (user) {
        let validUser = await bcrypt.compare(password, user.password);
        if (validUser) {
          req.user = user;
          next();
        } else {
          next('Invalid Login');
        }
      } else {
        let salt = await bcrypt.genSalt(saltRounds);
        let encryptedPassword = await bcrypt.hash(password, salt);

        // console.log(`encryptedPassword: ${encryptedPassword}`);

        user = await userInterface.create({
          username: username,
          password: encryptedPassword,
          salt: salt
        });
      }
      req.user = user;
      next();
    }
  } catch (err) {
    res.sendStatus(403);
    next('Failed to Authorize.')
  }
}

module.exports = { authorize };
