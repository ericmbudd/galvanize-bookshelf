'use strict';

const express = require('express');
const knex = require('../knex')

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE

const getFavorites = (req, res, next) => {
  console.log("getFavorites");

  // if (!req.cookies.token)
  //   next()

  //const events_id = req.body.
  //const users_id = jwt.verify(req.cookies.token, process.env.JWT_KEY).id
  //res.locals.registered = false;

  knex('favorites')
    //  .where({
    //      events_id,
    //      users_id
    //    })
    .then(favorites => {
      console.log(favorites)
      res.status(200).send(favorites)
    })
    .catch(err => {
      next(err)
    })
}

router.get('/favorites/', getFavorites)


module.exports = router;