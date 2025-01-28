// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'EMPLOYE'],
    default: 'EMPLOYE',
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);
module.exports = User;