const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs')
const crypto=require('crypto');
const { stringify } = require('querystring');


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide user name'],
  },
  email: {
    type: String,
    required: [true, 'please provide your email'],
    unique: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 8,
  },
  passwordconfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'password are not same',
    },
  },
  passwordresettoken:
  String,
});

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password,10);
  this.passwordconfirm = undefined;
  next();
});

schema.methods.checkpassword = async function (password, userpassword) {
  return await bcrypt.compare(password, userpassword);
};

schema.methods.createtoken=function(){
  const resettoken=crypto.randomBytes(32).toString('hex')
  this.passwordresettoken=crypto.createHash('sha256').update(resettoken).digest('hex')
  return resettoken;
}
const User = mongoose.model('testinguser', schema);
module.exports = User;
