'use strict';

const express = require('express');
const knex = require('../knex')

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE


//console.log("favorites");

const getFavorites = (req, res, next) => {
  console.log("getFavorites");

  console.log(req.cookies["/token"]);
  if (!req.cookies["/token"]) {
    res.header("Content-Type", "text/plain")


    res.status(401).send(
      "Unauthorized"
    );
    //return next(boom.create(401, 'Unauthorized'));

  }


  //const events_id = req.body.
  //const users_id = jwt.verify(req.cookies.token, process.env.JWT_KEY).id
  //res.locals.registered = false;

  knex('favorites')
    //  .where({
    //      events_id,
    //      users_id
    //    })
    //.join('events', 'events_users.events_id', 'events.id')
    .then(favorites => {
      console.log(favorites)
      res.status(200).send(favorites)
    })
    .catch(err => {
      next(err)
    })
}

router.get('/', getFavorites)
router.get('/:id', getFavorites)


module.exports = router