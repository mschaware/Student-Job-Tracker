import React, { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { JobForm } from './components/JobForm';
import { JobList } from './components/JobList';
import { StatusFilter } from './components/StatusFilter';
import { StatsCard } from './components/StatsCard';
import type { JobApplication, JobStatus, JobStatusCount } from './types';

const API_URL = 'http://localhost:3000/api';

function App() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<JobStatus | 'All'>('All');
  const [stats, setStats] = useState<JobStatusCount>({
    Applied: 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  });

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${API_URL}/jobs${selectedStatus !== 'All' ? `?status=${selectedStatus}` : ''}`
        );
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [selectedStatus]);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${API_URL}/jobs/stats`);
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [jobs]);

  const handleAddJob = async (job: Omit<JobApplication, '_id'>) => {
    try {
      const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const newJob = await response.json();
      setJobs([newJob, ...jobs]);
    } catch (error) {
      console.error('Error adding job:', error);
      alert(error instanceof Error ? error.message : 'Error adding job');
    }
  };

  const handleStatusUpdate = async (id: string, status: JobStatus) => {
    try {
      const response = await fetch(`${API_URL}/jobs/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      const updatedJob = await response.json();
      setJobs(jobs.map((job) => (job._id === id ? updatedJob : job)));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <Briefcase className="h-10 w-10 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Job Application Tracker</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <StatsCard stats={stats} />
        <section className="mb-12 animate-slide-up">
          <JobForm onSubmit={handleAddJob} />
        </section>
        <section className="animate-slide-up">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Your Applications</h2>
            <StatusFilter selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
          </div>
          <JobList jobs={jobs} onStatusUpdate={handleStatusUpdate} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}

export default App;