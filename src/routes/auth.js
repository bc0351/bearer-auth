'use strict';
const { basicAuth } = require('../middleware/basic-auth')
const {userInterface} = require('../models/index');

const express = require('express');
const router = express.Router();

// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
router.post('/signup', basicAuth, async (req, res, next) => {
  try {
    if (res.status > 299) throw new Error('Failed to sign up new user.');
    res.status(201).send(user);
  } catch (err) {
    res.sendStatus(500);
  }
})

router.post('/signin', basicAuth, async (req, res, next) => {
  try {
    let user = req.user;
    if (res.status !== 200) throw new Error('Failed to sign in.');
    res.status(200).send(user);
  } catch (err) {
    res.status(401).send('Invalid Login');
  }
})

module.exports = router;
