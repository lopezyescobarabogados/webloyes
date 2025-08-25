import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export default function Card({
  children,
  className = '',
  interactive = false,
}: CardProps) {
  const baseClasses = 'rounded-lg border border-gray-200 bg-white elevation-sm';
  const interactiveClasses = interactive
    ? 'elevation-hover cursor-pointer transition-all duration-300'
    : '';

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} p-6 ${className}`}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
    </div>
  );
}
