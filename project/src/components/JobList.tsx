import React from 'react';
import { ExternalLink, Trash2 } from 'lucide-react';
import type { JobApplication, JobStatus } from '../types';

interface JobListProps {
  jobs: JobApplication[];
  onStatusUpdate: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  Applied: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  Interview: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  Offer: 'bg-green-100 text-green-800 hover:bg-green-200',
  Rejected: 'bg-red-100 text-red-800 hover:bg-red-200',
};

const statuses: JobStatus[] = ['Applied', 'Interview', 'Offer', 'Rejected'];

export function JobList({ jobs, onStatusUpdate, onDelete }: JobListProps) {
  return (
    <div className="card animate-slide-up">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No applications found.
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{job.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      className={`text-sm rounded-full px-3 py-1 font-semibold ${statusColors[job.status]} transition-all duration-200`}
                      value={job.status}
                      onChange={(e) => job._id && onStatusUpdate(job._id, e.target.value as JobStatus)}
                      aria-label={`Update status for ${job.company}`}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(job.appliedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      aria-label={`View job link for ${job.company}`}
                    >
                      <ExternalLink className="w-5 h-5 inline" />
                    </a>
                    <button
                      onClick={() => job._id && onDelete(job._id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      aria-label={`Delete application for ${job.company}`}
                    >
                      <Trash2 className="w-5 h-5 inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}