'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex')
const humps = require('humps')


// eslint-disable-next-line new-cap


// YOUR CODE HERE

// READ ALL records for this table
router.get('/', (req, res, next) => {
  knex('books')
    .orderBy('title')
    .then((rows) => {
      res.json(humps.camelizeKeys(rows))
    })
    .catch((err) => {
      next(err)
    })
})
// READ ONE record for this table
router.get('/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .first()
    .then((rows) => {
      res.json(humps.camelizeKeys(rows))
    })
    .catch((err) => {
      next(err)
    })
})

// CREATE ONE record for this table
router.post('/', (req, res, next) => {
  knex('books')
    .insert({
      "title": req.body.title,
      "author": req.body.author,
      "genre": req.body.genre,
      "description": req.body.description,
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

// UPDATE ONE record for this table
router.patch('/:id', (req, res, next) => {
  knex('books')
    .where('id', req.params.id)
    .then((data) => {
      knex('books')
        .where('id', req.params.id)
        .limit(1)
        .update({
          "title": req.body.title,
          "author": req.body.author,
          "genre": req.body.genre,
          "description": req.body.description,
          "cover_url": req.body.coverUrl,
        })
        .returning('*')
        .then((data) => {
          res.json(humps.camelizeKeys(data[0]))
        })
    })
    .catch((err) => {
      next(err)
    })
})

// DELETE ONE record for this table
router.delete('/:id', function(req, res, next) {
  knex('books')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) return next()
      knex('books')
        .del()
        .where('id', req.params.id)
        .returning(['title', 'author', 'genre', 'description', 'cover_url'])
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
})

module.exports = router;