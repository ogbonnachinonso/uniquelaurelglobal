const mongoose = require('mongoose');
const Plan = require('./plan')
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
  username:String,
  
  referralName:String,
  
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
 
  password:{
    type: String,
    select: false
  },
  phone:{
    type: Number,
    required: true,
    
  },
  plan:{
    type: String,
    required: true,
    
  },
  amount:{
    type: String,
    
  },
  bonus:{
    type: Number,
  },
tokens:[{
  access:{
    type: String,
    required: true
  },
  token:{
    type: String,
    required: true,
  }
}],
resetPasswordToken : String,
resetPasswordExpires : Date

})
userSchema.plugin(passportLocalMongoose,{usernameField: 'username', emailField: 'email'});

module.exports = mongoose.model('User', userSchema);