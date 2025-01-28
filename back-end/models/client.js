const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  client_name: {
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
    required: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  company_logo: {
    type: String,
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Reference to the Project model
  }],
}, {
  timestamps: true,
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;