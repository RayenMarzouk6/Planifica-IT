const express = require('express');
const Task = require('../models/task');

const router = express.Router();

// Create a new task
router.post('/addTask', async (req, res) => {
    try {
        const { title, description, project_id, assigned_to, status, duration } = req.body;

        // Validate required fields
        if (!title || !project_id || !assigned_to || !status || !duration) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const task = new Task({ title, description, project_id, assigned_to, status, duration });
        const savedTask = await task.save();

        res.status(201).json({ message: 'Task created successfully', task: savedTask });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create task', error: err.message });
    }
});

// Get all tasks
router.get('/getAllTasks', async (req, res) => {
    try {
        const tasks = await Task.find().populate('project_id assigned_to'); // Populates references
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve tasks', error: err.message });
    }
});

// Get a task by ID
router.get('/getTask/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('project_id assigned_to');
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve task', error: err.message });
    }
});

// Update a task
router.put('/updateTask/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update task', error: err.message });
    }
});

// Delete a task
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete task', error: err.message });
    }
});


// Update task status
router.patch('/updateTaskStatus/:id', async (req, res) => {
    const { status } = req.body;
    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
  
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task status updated successfully', task });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update task status', error: err.message });
    }
  });
  

module.exports = router;
