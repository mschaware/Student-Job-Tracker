import React from 'react';
import type { JobStatusCount } from '../types';

interface StatsCardProps {
  stats: JobStatusCount;
}

const statusStyles = {
  Applied: 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500',
  Interview: 'bg-blue-100 text-blue-800 border-l-4 border-blue-500',
  Offer: 'bg-green-100 text-green-800 border-l-4 border-green-500',
  Rejected: 'bg-red-100 text-red-800 border-l-4 border-red-500',
};

export function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {(['Applied', 'Interview', 'Offer', 'Rejected'] as const).map((status, index) => (
        <div
          key={status}
          className={`card ${statusStyles[status]} p-4 animate-slide-up`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <h3 className="text-lg font-semibold">{status}</h3>
          <p className="text-3xl font-bold mt-1">{stats[status]}</p>
        </div>
      ))}
    </div>
  );
}