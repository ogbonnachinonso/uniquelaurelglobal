const express = require('express');
const router = express.Router();
const passport = require('passport');
const crypto = require('crypto');
const async = require('async');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
// const id = mongoose.Types.ObjectId
const User = require('../models/user');
const Plan = require('../models/plan');
const Payment = require('../models/payment')
const { ensureAuth } = require('../middleware/authenticate');
const verify = require("../middleware/role");

const path = require('path');

require('dotenv').config();
const cloudinary = require('cloudinary');
require('../handler/cloudinary');
const upload = require('../handler/multer');



// Get route dashboard
router.get("/payments", ensureAuth, verify.isAdmin, async (req, res) => {
  Payment.find({})
  .then(payments => {
    res.render('admin/payment', { payments: payments });
  })
  .catch(err => {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/login');
  })
  
});

//Admin approval get route
router.get("/users/:id",ensureAuth, verify.isAdmin, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.render('admin/register', { user });
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/users');
    console.error(err)
  }
});

//User get route
router.get("/user/:id", ensureAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    res.render('admin/userDetails', { user });
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/users');
    console.error(err)
  }
});

//Edit Payment Get Route
router.get("/editPayment/:id", ensureAuth, upload.single('image'), async (req, res) => {
  try {
    const payment = await Payment.findOne({ _id: req.params.id });
    res.render('plans/editpayment', { payment });
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/payments');
    console.error(err)
  }
});


//Update User Post route
router.post('/users/:id', ensureAuth, verify.isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    let data = {
      plan: req.body.plan,
      amount: req.body.amount,
      phone: req.body.phone,
      bonus: req.body.bonus,
    };
    await User.findByIdAndUpdate({ _id: req.params.id }, data, {
      new: true,
      // runValidators: true,
    })
    req.flash('success_msg', 'User updated successfully');
    res.redirect('/users');
  } catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/users');
    console.error(err)
  }
});

// Get route Referral Dashboard
router.get("/referralaccount", ensureAuth, verify.isAdmin,(req, res) => {
  User.find({})
    .then(users => {
      res.render('admin/approve', { users: users });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/users');
    })
});
// Get route Users dashboard
router.get("/users", ensureAuth, verify.isAdmin,(req, res) => {
  User.find({})
    .then(users => {
      res.render('admin/user', { users: users });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/login');
    })
});



module.exports = router;