const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');



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
router.get('/createPlan', (req, res) => {
  res.render('plans/add');
});

// Post routes Add plan
router.post('/createPlan',  async (req, res, next) => {
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

module.exports = router;