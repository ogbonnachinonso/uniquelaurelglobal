const mongoose = require('mongoose');

let planSchema = new mongoose.Schema({
  category:{
    type: String,
    required: true,
  }

});


module.exports = mongoose.model('Plan', planSchema);