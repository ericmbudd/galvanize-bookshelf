'use strict';

const express = require('express');
const knex = require('../knex')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const router = express.Router();


function verifyLogin(req, res) {
  const KEY = req.body.password
  // console.log("KEY", KEY)
  // console.log("email", req.body.email)
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((rows) => {
      // console.log(rows);

      bcrypt.compare(KEY, rows.hashed_password, function(err, passwordRes) {
        // res == true
        // console.log('key', KEY);
        // console.log('input hashed', rows.hashed_password);
        // console.log('res', passwordRes);

        if (passwordRes === true) {
          let signedUser = jwt.sign(rows, KEY)
          //console.log(signedUser);
          res.cookie("/token", signedUser, {
            httpOnly: true
          })
          res.send({
            "id": rows.id,
            "firstName": rows.first_name,
            "lastName": rows.last_name,
            "email": rows.email,
          });
        } else {
          res.setHeader('content-type', 'text/plain');
          res.status(400)
          res.send("Bad email or password")
        }
      });

    })
    .catch((err) => {
      //res.statusCode(400)
      res.setHeader('content-type', 'text/plain');
      res.status(400)
      res.send("Bad email or password")
    })
}

// YOUR CODE HERE

router.post('/', (req, res, next) => {

  //console.log("hashed_password", bcrypt.hash(req.body.password, 10))

  // need password handling for bcrypt promise
  verifyLogin(req, res)
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