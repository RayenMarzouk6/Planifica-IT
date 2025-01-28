const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name_project: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  budget: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  start_day: {
    type: Date,
    required: true,
  },
  end_day: {
    type: Date,
    required: true,
  },
  logo: {
    type: String,
    default: null,
  },
  document: {
    type: String,
    default: null,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Reference to the Client model
    required: true,
  },
  assigned_users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;