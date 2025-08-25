import { ReactNode } from 'react';
import AdvancedNavbar from '@/components/navigation/AdvancedNavbar';
import Footer from '@/components/navigation/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AdvancedNavbar />
      <main className="flex-1 pt-16 sm:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
