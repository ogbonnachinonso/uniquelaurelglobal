const mongoose = require('mongoose');

let paymentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  name:{
    type:String,
    required: true,
    
  },
  plan:{
    type: String,
    required: true,
    
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
