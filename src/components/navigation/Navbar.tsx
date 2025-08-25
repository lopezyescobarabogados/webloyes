'use client';

import Link from 'next/link';
import { useState } from 'react';
import Logo from '@/components/Logo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { href: '/', label: 'Inicio' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/equipo', label: 'Equipo' },
    { href: '/noticias', label: 'Noticias' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <nav
      className="border-b border-gray-100 bg-white shadow-sm"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link
                href="/"
                className="rounded-md px-2 py-1 transition-all duration-300 hover:opacity-80 focus:ring-2 focus:ring-navy focus:ring-offset-2 focus:outline-none"
                aria-label="López y Escobar Abogados - Ir a página de inicio"
              >
                <Logo size="sm" />
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navigationItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-navy focus:ring-navy inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                aria-label={`Ir a ${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:ring-navy inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-offset-2 focus:outline-none"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className="sr-only">
                {isMenuOpen ? 'Cerrar menú principal' : 'Abrir menú principal'}
              </span>
              {/* Menu icon */}
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 border-t border-gray-200 bg-gray-50 pt-2 pb-3">
            {navigationItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:border-navy hover:text-navy focus:ring-navy block border-l-4 border-transparent py-3 pr-4 pl-6 text-base font-medium text-gray-600 transition-all duration-300 hover:bg-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
                onClick={() => setIsMenuOpen(false)}
                aria-label={`Ir a ${item.label}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
