'use client';

import { useRouter } from 'next/navigation';
import AdminAuth from '@/components/admin/AdminAuth';

export default function AdminPage() {
  const router = useRouter();

  return (
    <AdminAuth>
      <div className="space-y-8">
        {/* Header del Dashboard */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-navy mb-2 font-serif text-3xl font-bold">
                Dashboard Administrativo
              </h1>
              <p className="text-gray-600">
                Gestión y administración del sitio web López y Escobar Abogados
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Último acceso</p>
              <p className="text-navy text-lg font-semibold">
                {new Date().toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Módulos de Administración */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Gestión de Contenido */}
          <div className="rounded-2xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
                <svg
                  className="h-8 w-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-navy mb-2 font-serif text-lg font-bold">
                Gestión de Contenido
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Administrar páginas, noticias y contenido dinámico del sitio
              </p>
              <button 
                onClick={() => router.push('/admin/noticias')}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Acceder
              </button>
            </div>
          </div>

          {/* Mensajes de Contacto */}
          <div className="rounded-2xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700">
                <svg
                  className="h-8 w-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-navy mb-2 font-serif text-lg font-bold">
                Mensajes de Contacto
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Ver y gestionar consultas y mensajes recibidos
              </p>
              <div className="mb-4 flex items-center justify-center">
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                  3 sin leer
                </span>
              </div>
              <button 
                onClick={() => router.push('/admin/contacto')}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
              >
                Ver Mensajes
              </button>
            </div>
          </div>

          {/* Gestión del Equipo */}
          <div className="rounded-2xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-700">
                <svg
                  className="h-8 w-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-navy mb-2 font-serif text-lg font-bold">
                Gestión del Equipo
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Administrar perfiles y información del equipo
              </p>
              <button 
                onClick={() => router.push('/admin/equipo')}
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
              >
                Gestionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminAuth>
  );
}
