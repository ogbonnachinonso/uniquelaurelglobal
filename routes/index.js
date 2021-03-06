const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Plan = require('../models/plan');


// landing page
//get route
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
});
router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get('/investment', (req, res) => {
  res.render('investment');
});

module.exports = router;