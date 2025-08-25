import { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  variant?: 'cards' | 'news' | 'team' | 'services';
  gap?: 'sm' | 'md' | 'lg';
}

const gridVariants = {
  cards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  news: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  team: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  services: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

const gapVariants = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export default function ResponsiveGrid({
  children,
  className = '',
  variant = 'cards',
  gap = 'md',
}: ResponsiveGridProps) {
  const gridClasses = gridVariants[variant];
  const gapClasses = gapVariants[gap];

  return (
    <div className={`${gridClasses} ${gapClasses} ${className}`}>
      {children}
    </div>
  );
}
