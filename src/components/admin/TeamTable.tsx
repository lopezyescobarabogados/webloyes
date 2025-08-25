'use client';

import { TeamMember } from './TeamManagement';
import { AvatarImage } from '@/components/ui/OptimizedImage';

interface TeamTableProps {
  team: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
}

export default function TeamTable({ team, onEdit, onDelete }: TeamTableProps) {
  if (team.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="text-center py-12">
          <svg 
            className="w-16 h-16 text-gray-300 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay miembros del equipo</h3>
          <p className="text-gray-500">No se encontraron miembros que coincidan con los filtros aplicados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Vista Desktop */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200" role="table" aria-label="Lista de miembros del equipo">
            <thead className="bg-gray-50">
              <tr role="row">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Miembro
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cargo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especialidades
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experiencia
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="sr-only">Acciones</span>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors" role="row">
                  <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <AvatarImage
                          src={member.imageUrl}
                          alt={`Foto de ${member.name}`}
                          size="md"
                          fallbackInitials={member.name.charAt(0)}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                    <div className="text-sm text-gray-900">{member.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {member.specialties ? JSON.parse(member.specialties)[0] || 'N/A' : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" role="gridcell">
                    {member.experience || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap" role="gridcell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {member.active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" role="gridcell">
                    <a 
                      href={`mailto:${member.email}`} 
                      className="text-navy hover:text-navy-600 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
                      aria-label={`Enviar email a ${member.name}`}
                    >
                      {member.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" role="gridcell">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onEdit(member)}
                        className="text-navy hover:text-navy-600 transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded p-1"
                        aria-label={`Editar ${member.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(member.id)}
                        className="text-red-600 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded p-1"
                        aria-label={`Eliminar ${member.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vista Mobile */}
      <div className="lg:hidden" role="list" aria-label="Lista de miembros del equipo">
        <div className="space-y-4 p-4">
          {team.map((member) => (
            <div key={member.id} className="border border-gray-200 rounded-lg p-4 bg-white" role="listitem">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AvatarImage
                    src={member.imageUrl}
                    alt={`Foto de ${member.name}`}
                    size="lg"
                    fallbackInitials={member.name.charAt(0)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 truncate">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <button
                        onClick={() => onEdit(member)}
                        className="text-navy hover:text-navy-600 transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded p-1"
                        aria-label={`Editar ${member.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(member.id)}
                        className="text-red-600 hover:text-red-800 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded p-1"
                        aria-label={`Eliminar ${member.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {member.specialties ? JSON.parse(member.specialties)[0] || 'N/A' : 'N/A'}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {member.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{member.experience || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      <a 
                        href={`mailto:${member.email}`} 
                        className="text-navy hover:text-navy-600 flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 rounded"
                        aria-label={`Enviar email a ${member.name}`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span>{member.email}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
