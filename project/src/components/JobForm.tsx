import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { JobApplication, JobStatus } from '../types';

interface JobFormProps {
  onSubmit: (job: Omit<JobApplication, '_id'>) => void;
}

const statuses: JobStatus[] = ['Applied', 'Interview', 'Offer', 'Rejected'];

export function JobForm({ onSubmit }: JobFormProps) {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied' as JobStatus,
    appliedDate: new Date().toISOString().split('T')[0],
    link: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      company: '',
      role: '',
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      link: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-6 animate-slide-up">
      <h2 className="text-xl font-semibold text-gray-800">Add New Application</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            required
            className="input-field"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Enter company name"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="role"
            required
            className="input-field"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            placeholder="Enter job role"
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            className="input-field"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as JobStatus })}
            aria-label="Select job status"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="appliedDate" className="block text-sm font-medium text-gray-700 mb-1">
            Application Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="appliedDate"
            required
            className="input-field"
            value={formData.appliedDate}
            onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
            aria-required="true"
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
            Job Link <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="link"
            required
            className="input-field"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="https://example.com/job"
            aria-required="true"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="btn-primary">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Application
        </button>
      </div>
    </form>
  );
}