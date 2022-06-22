'use strict';
const { authorize } = require('../middleware/basic-auth');

const express = require('express');
const router = express.Router();

router.post('/signup', authorize, async (req, res) => {
  try {
    res.status(201).send(req.user);
  } catch (err) {
    // console.log(err.toString())
    res.sendStatus(500);
  }
})

router.post('/signin', authorize, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(403).send('Failed to Authorize.');
  }
})

module.exports = router;
