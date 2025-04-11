import express from 'express';
import { Job } from '../models/job.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    const query = status && status !== 'All' ? { status } : {};
    const jobs = await Job.find(query).sort({ appliedDate: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new job
router.post('/', async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    // Check for duplicate entry error
    if (error.code === 11000) {
      res.status(400).json({ message: 'A job application for this company and role already exists' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// Update job status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const job = await Job.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get job statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const formattedStats = {
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0
    };
    
    stats.forEach(({ _id, count }) => {
      formattedStats[_id] = count;
    });
    
    res.json(formattedStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;