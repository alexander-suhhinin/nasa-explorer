import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div data-testid="card" className={`bg-white rounded-lg shadow p-6 mb-6 flex flex-col justify-between ${className}`}>
      {children}
    </div>
  );
}

// SkeletonCard for loading states
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      data-testid="skeleton-card"
      className={`bg-white rounded-lg shadow p-6 mb-6 animate-pulse space-y-4 ${className}`}
    >
      <div data-testid="skeleton-element-title" className="h-6 bg-gray-200 rounded w-1/3" />
      <div data-testid="skeleton-element-subtitle" className="h-4 bg-gray-200 rounded w-2/3" />
      <div data-testid="skeleton-element-image" className="h-48 bg-gray-200 rounded" />
      <div data-testid="skeleton-element-text" className="h-4 bg-gray-200 rounded w-full" />
      <div data-testid="skeleton-element-text-2" className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  );
}
