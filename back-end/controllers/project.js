const express = require('express');
const Project = require('../models/project');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadPath =
      file.fieldname === 'document'
        ? './uploads/project/document'
        : './uploads/project/logo';
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const timestamp = Date.now();
    const extension = file.mimetype.split('/')[1];
    const fileName = `${timestamp}.${extension}`;
    callback(null, fileName);
  },
});

// Middleware for file uploads
const upload = multer({ storage });

// Add a new project
router.post(
  '/projects',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        name_project,
        description,
        budget,
        start_day,
        end_day,
        client,
        assigned_users,
      } = req.body;

      // Validate required fields
      if (
        !name_project ||
        !description ||
        !budget ||
        !start_day ||
        !end_day ||
        !client
      ) {
        return res.status(400).json({ message: 'All fields are required.' });
      }

      // File paths
      const logoPath = req.files['logo']
        ? `/uploads/project/logo/${req.files['logo'][0].filename}`
        : '/uploads/default/default_logo.avif';

      const documentPath = req.files['document']
        ? `/uploads/project/document/${req.files['document'][0].filename}`
        : null;

      // Create a new project
      const project = new Project({
        name_project,
        description,
        budget,
        start_day,
        end_day,
        logo: logoPath,
        document: documentPath,
        client,
        assigned_users: assigned_users ? JSON.parse(assigned_users) : [],
      });

      const savedProject = await project.save();
      res
        .status(201)
        .json({ message: 'Project added successfully', project: savedProject });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to add project', error: error.message });
    }
  }
);

// Get all projects (with populated client and users)
router.get('/getAllProjects', async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('client') // Populate client details
      .populate('assigned_users'); // Populate assigned users

    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch projects', error: error.message });
  }
});

// Get a single project by ID (with populated client and users)
router.get('/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findById(projectId)
      .populate('client')
      .populate('assigned_users');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch project', error: error.message });
  }
});

// Update a project
router.put(
  '/projects/:id',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'document', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name_project, description, budget, start_day, end_day } = req.body;
      const updatedFields = { name_project, description, budget, start_day, end_day };

      if (req.files['logo']) {
        updatedFields.logo = `/uploads/project/logo/${req.files['logo'][0].filename}`;
      }

      if (req.files['document']) {
        updatedFields.document = `/uploads/project/document/${req.files['document'][0].filename}`;
      }

      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true, runValidators: true }
      );

      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res
        .status(200)
        .json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to update project', error: error.message });
    }
  }
);

// Delete a project
router.delete('/deleteProject/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res
      .status(200)
      .json({ message: 'Project deleted successfully', project: deletedProject });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete project', error: error.message });
  }
});

module.exports = router;
