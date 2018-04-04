'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE

// CREATE ONE record for this table
router.post('/', (req, res, next) => {
  knex('users')
    .insert({
      "first_name": req.body.title,
      "last_name": req.body.author,
      "email": req.body.genre,
      "password": req.body.description,
      "cover_url": req.body.coverUrl
    })
    .returning('*')
    .then((data) => {
      res.json(humps.camelizeKeys(data[0]))
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;