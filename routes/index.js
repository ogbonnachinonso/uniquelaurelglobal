const express = require('express');
const router = express.Router();



// landing page
//get route
router.get('/', (req, res) => {
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;