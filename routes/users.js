'use strict';

const express = require('express');
const knex = require('../knex')
const humps = require('humps')
// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE

// router.get('/', (req, res, next) => {
//   knex('books')
//     .orderBy('title')
//     .then((rows) => {
//       res.json(humps.camelizeKeys(rows))
//     })
//     .catch((err) => {
//       next(err)
//     })
// })

// CREATE ONE record for this table
router.post('/', (req, res, next) => {
  // res.send(200)
  knex('users')
    .insert({
      "first_name": req.body.firstName,
      "last_name": req.body.lastName,
      "email": req.body.email,
      "hashed_password": req.body.password,
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
})

module.exports = router;