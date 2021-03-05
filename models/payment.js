const mongoose = require('mongoose');

let paymentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  user:{
    type: String,
  },
  plan:{
    type: String,
    required: true,
    
  },
  amount:{
    type: Number,
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
