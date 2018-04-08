'use strict';

const express = require('express');
const knex = require('../knex')
const jwt = require("jsonwebtoken")

const router = express.Router();




// YOUR CODE HERE

router.post('/', (req, res, next) => {
  const KEY = req.body.password
  console.log("KEY", KEY)
  console.log("email", req.body.email)

  knex('users')
    .where('email', req.body.email)
    .first()
    .then((rows) => {
      let signedUser = jwt.sign(rows, KEY)
      res.cookie("/token", signedUser, {
        httpOnly: true
      })
      res.send({
        "id": rows.id,
        "firstName": rows.first_name,
        "lastName": rows.last_name,
        "email": rows.email,
      });
    })
    .catch((err) => {
      //res.statusCode(400)
      res.setHeader('content-type', 'text/plain');
      res.status(400)
      res.send("Bad email or password")
    })
})


router.delete('/', (req, res, next) => {
  res.cookie("/token", "", {
    httpOnly: true
  })
  res.send('deleted')
})


router.get('/', (req, res, next) => {
  console.log("hi there");
  //console.log(req);
  //console.log(req.cookies);
  console.log(req.cookies['/token']);

  if (req.cookies['/token']) {
    res.json(true)
  } else {
    res.json(false)
  }
})

module.exports = router;