'use strict';

const express = require('express');
const knex = require('../knex')
const humps = require('humps')
const bcrypt = require('bcrypt');

const router = express.Router();

// YOUR CODE HERE



// CREATE ONE record for this table
router.post('/', (req, res, next) => {
  // res.send(200)

  //console.log(req.body.password);

  bcrypt.hash(req.body.password, 12).then(function(hash) {
    // Store hash in your password DB.
    console.log(hash);
    insertIntoDB(hash)
  });


  function insertIntoDB(hash) {
    knex('users')
      .insert({
        "first_name": req.body.firstName,
        "last_name": req.body.lastName,
        "email": req.body.email,
        "hashed_password": hash
      })
      .returning([
        "id",
        "first_name",
        "last_name",
        "email"
      ])
      .then((data) => {
        res.json(humps.camelizeKeys(data[0]))
      })
      .catch((err) => {
        next(err)
      })
  }
})

module.exports = router;