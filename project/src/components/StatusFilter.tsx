import React from 'react';
import type { JobStatus } from '../types';

interface StatusFilterProps {
  selectedStatus: JobStatus | 'All';
  onStatusChange: (status: JobStatus | 'All') => void;
}

const statuses: (JobStatus | 'All')[] = ['All', 'Applied', 'Interview', 'Offer', 'Rejected'];

const statusStyles = {
  All: 'bg-gray-100 text-gray-800 border-gray-300',
  Applied: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Interview: 'bg-blue-100 text-blue-800 border-blue-300',
  Offer: 'bg-green-100 text-green-800 border-green-300',
  Rejected: 'bg-red-100 text-red-800 border-red-300',
};

export function StatusFilter({ selectedStatus, onStatusChange }: StatusFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 animate-slide-up">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`px-4 py-2 rounded-full text-sm font-semibold border ${
            selectedStatus === status
              ? `${statusStyles[status]} shadow-md`
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          aria-pressed={selectedStatus === status}
        >
          {status}
        </button>
      ))}
    </div>
  );
}