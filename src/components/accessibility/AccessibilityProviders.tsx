'use client';

import { SkipNavigation, usePageAnnouncement } from '@/components/accessibility/SkipNavigation';

export default function AccessibilityProviders({ children }: { children: React.ReactNode }) {
  const PageAnnouncement = usePageAnnouncement();
  
  return (
    <>
      <SkipNavigation />
      {PageAnnouncement}
      {children}
    </>
  );
}
