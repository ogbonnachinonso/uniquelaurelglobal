const mongoose = require('mongoose');

let paymentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  imgUrl:{  
    type: String 
} 
 
});



module.exports = mongoose.model('Payment', paymentSchema);
