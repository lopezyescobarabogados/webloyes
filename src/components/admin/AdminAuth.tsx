'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminKey, setAdminKey] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Verificar si ya está autenticado (sessionStorage)
    const storedAuth = sessionStorage.getItem('admin_authenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminKey }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_authenticated', 'true');
        setAdminKey('');
      } else {
        setError(data.message || 'Clave de administrador incorrecta');
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    } catch (err) {
      console.error('Error de autenticación:', err);
      setError('Error de conexión. Redirigiendo...');
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex items-center space-x-3">
            <svg
              className="text-navy h-6 w-6 animate-spin"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-700">Verificando acceso...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="from-navy to-navy flex min-h-screen items-center justify-center bg-gradient-to-br via-blue-900 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="from-navy mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br to-blue-700">
              <svg
                className="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-navy mb-2 font-serif text-2xl font-bold">
              Panel Administrativo
            </h1>
            <p className="text-gray-600">Acceso restringido</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label
                htmlFor="adminKey"
                className="mb-2 block text-sm font-semibold text-gray-800"
              >
                Clave de Administrador
              </label>
              <input
                type="password"
                id="adminKey"
                value={adminKey}
                onChange={e => setAdminKey(e.target.value)}
                className="focus:ring-navy focus:border-navy w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:ring-2 focus:outline-none"
                placeholder="Ingresa la clave de administrador"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !adminKey.trim()}
              className="bg-navy hover:bg-navy-600 focus:ring-navy w-full rounded-lg px-4 py-3 font-semibold text-white transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-5 w-5 animate-spin"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verificando...
                </div>
              ) : (
                'Acceder'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="hover:text-navy text-sm text-gray-500 transition-colors"
            >
              ← Volver al sitio web
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header del Admin */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-navy font-serif text-xl font-bold">
                Panel Administrativo
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/')}
                className="hover:text-navy text-sm text-gray-600 transition-colors"
              >
                Ver sitio web
              </button>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido del Admin */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
