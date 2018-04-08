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
      res.cookie("/token", signedUser)
      res.send({
        "id": rows.id,
        "firstName": rows.first_name,
        "lastName": rows.last_name,
        "email": rows.email,
      });
    })
    .catch((err) => {
      next(err)
    })

  // res.send({
  //   "email": "jkrowling@gmail.com",
  //   "firstName": "Joanne",
  //   "id": 1,
  //   "lastName": "Rowling"
  // });


  // .then((rows) => {
  //   console.log(rows);
  //   res.json(rows)
  // })



  //console.log(req);
  // console.log(req.cookies.user);


})


router.get('/', (req, res, next) => {
  console.log("hi there");
  //console.log(req);
  //console.log(req.cookies.user);

  if (req.cookies.user) {
    res.json(true)
  } else {
    res.json(false)
  }
})

module.exports = router;