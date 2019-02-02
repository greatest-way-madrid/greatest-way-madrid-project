const constants = require('../constants');
const mongoose = require('mongoose');
const FIRST_ADMIN_EMAIL = process.env.FIRST_ADMIN_EMAIL;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  social: {
    googleId: String
  },
  role: {
    type: String,
    enum: [constants.ROLE_ADMIN, constants.ROLE_USER],
    default: constants.ROLE_USER
  }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
module.exports = User;