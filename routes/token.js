'use strict';

const express = require('express');
const jwt = require("jsonwebtoken")

const router = express.Router();




// YOUR CODE HERE

router.post('/', (req, res, next) => {
  const KEY = req.body.password
  console.log("KEY", KEY)


  let signedUser = jwt.sign(req.body.email, KEY)
  res.cookie("/token", signedUser)
  // .then((rows) => {
  //   console.log(rows);
  //   res.json(rows)
  // })

  res.send({
    "email": "jkrowling@gmail.com",
    "firstName": "Joanne",
    "id": 1,
    "lastName": "Rowling"
  });

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