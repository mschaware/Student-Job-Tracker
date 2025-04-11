import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
    default: 'Applied'
  },
  appliedDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  link: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

// Create a compound index for company and role to prevent duplicates
jobSchema.index({ company: 1, role: 1 }, { unique: true });

export const Job = mongoose.model('Job', jobSchema);