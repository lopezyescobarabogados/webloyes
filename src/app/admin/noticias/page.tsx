import { Metadata } from 'next';
import AdminAuth from '@/components/admin/AdminAuth';
import NewsManagement from '@/components/admin/NewsManagement';

export const metadata: Metadata = {
  title: 'Gestión de Noticias - Panel Admin',
  description: 'Administración de noticias del sitio web',
  robots: 'noindex, nofollow',
};

export default function AdminNewsPage() {
  return (
    <AdminAuth>
      <div className="space-y-8">
        {/* Componente de gestión */}
        <NewsManagement />
      </div>
    </AdminAuth>
  );
}
