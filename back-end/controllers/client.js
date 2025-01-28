const express = require('express');
const router = express.Router();
const multer = require('multer');
const Client = require('../models/client'); // Import the Client model
const Project = require('../models/project'); // Import the Project model

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: './uploads/client',
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Add a new client
router.post('/addClient', upload.single('company_logo'), async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debug: Log the request body
    console.log('Uploaded File:', req.file); // Debug: Log the uploaded file

    const { client_name, email, phone, adresse, company_name, projects } = req.body;

    if (!client_name || !email || !phone || !adresse || !company_name) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    const company_logo = req.file ? req.file.path : null;

    // Validate project IDs if provided
    let validProjects = [];
    if (projects && projects.length > 0) {
      validProjects = await Project.find({ _id: { $in: projects } });
      if (validProjects.length !== projects.length) {
        return res.status(400).json({ message: 'One or more project IDs are invalid.' });
      }
    }

    const client = new Client({
      client_name,
      email,
      phone,
      adresse,
      company_name,
      company_logo,
      projects: validProjects.map((project) => project._id),
    });

    const savedClient = await client.save();

    res.status(201).json({ message: 'Client added successfully', client: savedClient });
  } catch (err) {
    console.error('Error adding client:', err); // Debug: Log the error
    res.status(500).json({ message: 'Failed to add client', error: err.message });
  }
});

// Add a project to a client
router.put('/addProjectToClient/:clientId', async (req, res) => {
    try {
      const { projectId } = req.body;
  
      // Validate projectId
      if (!projectId) {
        return res.status(400).json({ message: 'Project ID is required.' });
      }
  
      // Check if the project exists
      const projectExists = await Project.findById(projectId);
      if (!projectExists) {
        return res.status(404).json({ message: 'Project not found.' });
      }
  
      // Add project to the client's projects array
      const updatedClient = await Client.findByIdAndUpdate(
        req.params.clientId,
        { $addToSet: { projects: projectId } }, // Use $addToSet to avoid duplicates
        { new: true }
      ).populate('projects'); // Populate projects for the response
  
      if (!updatedClient) {
        return res.status(404).json({ message: 'Client not found.' });
      }
  
      res.status(200).json({
        message: 'Project successfully added to client.',
        client: updatedClient,
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to add project to client', error: err.message });
    }
  });
  

// Get all clients
router.get('/getAllClients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve clients', error: err.message });
    }
});

// Get a client by ID
router.get('/getClient/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(client);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve client', error: err.message });
    }
});

// Update a client
router.put('/updateClient/:id', upload.single('company_logo'), async (req, res) => {
    try {
        const { client_name, email, phone, adresse, company_name } = req.body;

        const updatedFields = { client_name, email, phone, adresse, company_name };

        if (req.file) {
            updatedFields.company_logo = req.file.path;
        }

        const updatedClient = await Client.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ message: 'Client updated successfully', client: updatedClient });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update client', error: err.message });
    }
});

// Delete a client
router.delete('/deleteClient/:id', async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ message: 'Client deleted successfully', client: deletedClient });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete client', error: err.message });
    }
});

module.exports = router;
