const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');
const User = require('../models/user');
const Payment = require('../models/payment');
const mongoose = require('mongoose');
const id = mongoose.Types.ObjectId;
const { ensureAuth } = require('../middleware/authenticate');
const path = require('path');

require('dotenv').config();
const cloudinary = require('cloudinary');
require('../handler/cloudinary');
const upload = require('../handler/multer');




// landing page
// Get routes home
router.get("/investment", (req, res) => {
  Plan.find({})
    .then(plans => {
      res.render('plans/invest', { plans: plans });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/');
    })
});

// Get routes add folio
router.get('/createPlan', ensureAuth, (req, res) => {
  res.render('plans/add');
});

router.get('/addPayment', ensureAuth, async(req, res) => {
  try {
    const users = await User.find({})
    const payment = new Payment() 
    res.render('plans/payment', {
      payment: payment,
      users:  users
    })
  } catch {
    res.redirect('/addPayment')
  }
});


router.post('/addPayment', upload.single('image'), ensureAuth, async (req, res, next) => {
  try {
    
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const payment = new Payment()
    payment.user = req.body.user,
    payment.plan = req.body.plan,
    payment.amount =req.body.amount,
    payment.description = req.body.description,
    payment.imgUrl = result.secure_url
    await payment.save()
    req.flash('success_msg', 'Proof of payment uploaded Successfully')
    res.redirect('/dashboard')
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    console.error(err);
    res.redirect('/addPayment');
  }
});
router.get('/payment/:id', ensureAuth, (req, res) => {
  Payment.findOne({ _id: req.params.id })
    .then((payment) => {
      res.render('plans/paymentDetails', { payment: payment });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/payment');
      console.error(err)
    });
});



router.post('/editPayment/:id', upload.single("image"), ensureAuth, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(payment.imgUrl);
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    let data = {
      user: req.body.user,
      amount: req.body.amount,
      plan: req.body.plan,
      description: req.body.description,
       imgUrl: result.secure_url

    };
    await Payment.findByIdAndUpdate({ _id: req.params.id }, data, {
      new: true,
      // runValidators: true,
    })
    req.flash('success_msg', 'Gallery updated successfully');
    res.redirect('/payments');
  } catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/payments');
    console.error(err)
  }
});

//delete request starts here
router.post("/deletePayment/:id", ensureAuth, async (req, res) => {
  try {
    // Find gallery by id
    let payment = await Payment.findById(req.params.id);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(payment.imgUrl);
    // Delete gallery from db
    await payment.remove();
    req.flash('success_msg', 'Payment post deleted successfully');
    res.redirect('/paymentdashboard');
  } catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    res.redirect('/paymentdashboard');
  }
});
// Post routes Add plan
router.post('/createPlan', ensureAuth, async (req, res, next) => {
  try {
    const plan = new Plan()
    plan.category = req.body.category,
    await plan.save()
    req.flash('success_msg', 'Investment Plan Added Successfully')
    res.redirect('/createPlan')
  }
  catch (err) {
    req.flash('error_msg', 'ERROR: +err');
    console.error(err);
    res.redirect('/createPlan');
  }
});


// Get route dashboard
router.get("/paymentdashboard", ensureAuth, (req, res) => {
  Payment.find({})
    .then(payments => {
      res.render('plans/planDashboard', { payments: payments });
    })
    .catch(err => {
      req.flash('error_msg', 'ERROR: +err');
      res.redirect('/login');
    })
});

module.exports = router;