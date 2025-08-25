import { Metadata } from 'next';
import AdminAuth from '@/components/admin/AdminAuth';
import TeamManagement from '@/components/admin/TeamManagement';

export const metadata: Metadata = {
  title: 'Gestión de Equipo - Panel Admin',
  description: 'Administración del equipo y miembros del sitio web',
  robots: 'noindex, nofollow',
};

export default function AdminTeamPage() {
  return (
    <AdminAuth>
      <div className="space-y-8">
        {/* Componente de gestión */}
        <TeamManagement />
      </div>
    </AdminAuth>
  );
}
