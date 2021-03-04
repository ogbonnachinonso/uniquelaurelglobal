const express = require('express');
const router = express.Router();
const passport = require('passport');
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const id = mongoose.Types.ObjectId
const User = require('../models/user');
const Plan = require('../models/plan');
const Payment = require('../models/payment')


const path = require('path');

require('dotenv').config();
const cloudinary = require('cloudinary');
require('../handler/cloudinary');
const upload = require('../handler/multer');



// Get route dashboard
router.get("/payments", async (req, res) => {
  Payment.find({})
  .then(payments => {
    res.render('admin/payment', { payments: payments });
  })
  .catch(err => {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/login');
  })
  
});

// Get route dashboard
router.get("/users", (req, res) => {
  User.find({})
    .then(users => {
      res.render('admin/user', { users: users });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/login');
    })
});

// router.get('/users', async (req, res) => {
//   try {
//     const plans = await Plan.find({})
//     const users = await User.find({}).populate({path: "plan", model: "Plan"});
//     res.render('admin/user', {
//       plans: plans,
//       users: users
//     })
//   } catch {
//     req.flash('error_msg', 'ERROR: +err');
//     res.redirect('/register')
//   }
// });

module.exports = router;