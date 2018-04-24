'use strict';

const express = require('express');
const knex = require('../knex')
const humps = require('humps')
const jwt = require("jsonwebtoken")

// eslint-disable-next-line new-cap
const router = express.Router();

// YOUR CODE HERE


//console.log("favorites");

const checkAuth = (req, res, next) => {
  //console.log(req.cookies["/token"]);
  if (req.cookies["/token"]) {
    next()
  } else {
    res.header("Content-Type", "text/plain")
    res.status(401).send("Unauthorized")
  }
}


const getFavorites = (req, res, next) => {
  console.log("getFavorites");

  let bookId

  if (req.query.bookId)
    bookId = Number.parseInt(req.query.bookId);

  if (bookId) {
    console.log("book id is=", bookId);
    knex('favorites')
      .where({
        'favorites.book_id': bookId,
      })
      .join('books', 'favorites.book_id', 'books.id')
      .first()
      .then(favorites => {
        //console.log(favorites)
        if (favorites) {
          res.status(200).send(true)
        } else {
          res.status(200).send(false)
        }
      })
      .catch(err => {})
  } else {
    knex('favorites')
      .join('books', 'favorites.book_id', 'books.id')
      .then(favorites => {
        //console.log(favorites)
        res.status(200).send(humps.camelizeKeys(favorites))
      })
      .catch(err => {
        next(err)
      })
  }
}



const insertFavorites = (req, res, next) => {
  //console.log(req.cookies["/token"]);

  const users_id = jwt.verify(req.cookies["/token"], process.env.JWT_KEY).id
  console.log("users_id", users_id);
  //console.log("req", req);
  knex('favorites')
    .insert({
      'book_id': req.body.bookId,
      'user_id': users_id
    })
    .returning('*')
    // .returning([
    //   'favorites.book_id',
    //   'favorites.user_id'
    // ])
    .then((data) => {
      res.json(humps.camelizeKeys(data[0]))
    })
    .catch((err) => {
      next(err)
    })
}



const deleteFavorites = (req, res, next) => {
  //console.log(req.cookies["/token"]);

  const users_id = jwt.verify(req.cookies["/token"], process.env.JWT_KEY).id
  console.log("users_id", users_id);
  //console.log("req", req);
  knex('favorites')
    .where({
      'favorites.book_id': req.body.bookId,
      'favorites.user_id': users_id
    })
    .then((row) => {
      console.log(row);
      if (!row) return next()
      knex('favorites')
        .del()
        .where({
          'favorites.book_id': req.body.bookId,
          'favorites.user_id': users_id
        })
        .returning([
          'favorites.book_id',
          'favorites.user_id'
        ])
        .then((data) => {
          res.json(humps.camelizeKeys(data[0]))
        })
      // .then(() => {
      //   res.send(`ID ${req.params.id} Deleted`)
      // })
    })
    .catch((err) => {
      next(err)
    })
}



router.get('/', checkAuth, getFavorites)
router.get('/check/', checkAuth, getFavorites)
router.post('/', checkAuth, insertFavorites)
router.delete('/', checkAuth, deleteFavorites)


module.exports = router