'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TeamTable from './TeamTable';
import TeamForm from './TeamForm';

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string; // Campo requerido en Prisma
  bio?: string;
  imageUrl?: string;
  email: string;
  phone?: string;
  specialties?: string; // JSON string
  education?: string;
  experience?: string;
  barAssociation?: string;
  languages?: string;
  linkedin?: string;
  order?: number;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function TeamManagement() {
  const router = useRouter();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  // Cargar equipo al montar el componente
  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/team');
      if (!response.ok) {
        throw new Error('Error al cargar el equipo');
      }
      
      const data = await response.json();
      setTeam(data);
    } catch (err) {
      console.error('Error loading team:', err);
      setError('Error al cargar el equipo');
    } finally {
      setIsLoading(false);
    }
  };



  const handleCreateMember = () => {
    setSelectedMember(null);
    setIsCreating(true);
    setIsFormOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setIsCreating(false);
    setIsFormOpen(true);
  };

  const handleDeleteMember = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este miembro del equipo?')) {
      return;
    }

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el miembro');
      }

      setTeam(team.filter(member => member.id !== id));
    } catch (err) {
      console.error('Error deleting team member:', err);
      setError('Error al eliminar el miembro del equipo');
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedMember(null);
    setIsCreating(false);
  };

  const handleFormSuccess = (updatedMember: TeamMember) => {
    if (isCreating) {
      setTeam([...team, updatedMember]);
    } else {
      setTeam(team.map(member => 
        member.id === updatedMember.id ? updatedMember : member
      ));
    }
    handleFormClose();
  };



  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 animate-spin text-navy" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700">Cargando equipo...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm font-medium text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Actions Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin')}
              className="flex items-center text-gray-600 hover:text-navy transition-colors"
              title="Volver al panel de administración"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Volver al Admin
            </button>
            <h2 className="text-xl font-serif font-bold text-navy">
              Gestión del Equipo
            </h2>
            <button
              onClick={loadTeam}
              className="text-gray-500 hover:text-navy transition-colors"
              title="Recargar equipo"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <button
            onClick={handleCreateMember}
            className="bg-navy hover:bg-navy-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nuevo Miembro
          </button>
        </div>


      </div>

      {/* Team Table */}
      <TeamTable
        team={team}
        onEdit={handleEditMember}
        onDelete={handleDeleteMember}
      />

      {/* Team Form Modal */}
      {isFormOpen && (
        <TeamForm
          member={selectedMember}
          isCreating={isCreating}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
