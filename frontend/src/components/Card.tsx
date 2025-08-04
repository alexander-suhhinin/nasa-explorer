import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 mb-6 ${className}`}>
      {children}
    </div>
  );
}

// SkeletonCard for loading states
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-white rounded-lg shadow p-6 mb-6 animate-pulse space-y-4 ${className}`}
    >
      <div className="h-6 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-48 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  );
}
