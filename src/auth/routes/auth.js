'use strict';
const  basicAuth  = require('../middleware/basic-auth');
const  bearerAuth  = require('../middleware/bearer-auth');

const express = require('express');
const router = express.Router();

router.post('/signup', basicAuth, async (req, res) => {
  try {
    res.status(201).send(req.user);
  } catch (err) {
    // console.log(err.toString())
    res.sendStatus(500);
  }
})

router.post('/signin', bearerAuth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(403).send('Failed to Authorize.');
  }
})

module.exports = router ;
