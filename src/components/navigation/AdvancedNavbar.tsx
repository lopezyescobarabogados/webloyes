'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/Logo';

interface SubmenuItem {
  href: string;
  label: string;
  labelEn?: string;
  description?: string;
  descriptionEn?: string;
}

interface NavItem {
  href: string;
  label: string;
  labelEn?: string;
  submenu?: SubmenuItem[];
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  // Detectar scroll para cambiar estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const navigationItems: NavItem[] = [
    {
      href: '/',
      label: 'Inicio',
      labelEn: 'Home',
    },
    {
      href: '/nosotros',
      label: 'Nosotros',
      labelEn: 'About Us',
    },
    {
      href: '/servicios',
      label: 'Servicios',
      labelEn: 'Services',
    },
    {
      href: '/equipo',
      label: 'Nuestro Equipo',
      labelEn: 'Our Team',
    },
    {
      href: '/noticias',
      label: 'Noticias Jurídicas',
      labelEn: 'Legal News',
    },
    {
      href: '/contacto',
      label: 'Contacto',
      labelEn: 'Contact',
    },
  ];

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'));
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const getNavItemLabel = (item: NavItem) => {
    return language === 'en' && item.labelEn ? item.labelEn : item.label;
  };

  const getSubmenuLabel = (submenuItem: SubmenuItem) => {
    return language === 'en' && submenuItem.labelEn
      ? submenuItem.labelEn
      : submenuItem.label;
  };

  const getSubmenuDescription = (submenuItem: SubmenuItem) => {
    return language === 'en' && submenuItem.descriptionEn
      ? submenuItem.descriptionEn
      : submenuItem.description;
  };

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-gray-200 bg-white/95 shadow-lg backdrop-blur-md'
          : 'bg-white'
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="rounded-md px-2 py-1 transition-all duration-300 hover:opacity-80 focus:ring-2 focus:ring-navy focus:ring-offset-2 focus:outline-none"
              aria-label="López y Escobar Abogados - Ir a página de inicio"
            >
              <Logo size="sm" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigationItems.map(item => (
              <div key={item.href} className="dropdown-container relative">
                {item.submenu ? (
                  <button
                    onClick={() => handleDropdownToggle(item.label)}
                    className={`focus:ring-navy inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                      isScrolled
                        ? 'hover:text-navy text-gray-700'
                        : 'hover:text-navy text-gray-700'
                    }`}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {getNavItemLabel(item)}
                    <svg
                      className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`focus:ring-navy inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                      isScrolled
                        ? 'hover:text-navy text-gray-700'
                        : 'hover:text-navy text-gray-700'
                    }`}
                    aria-label={`Ir a ${getNavItemLabel(item)}`}
                  >
                    {getNavItemLabel(item)}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.submenu && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="ring-opacity-5 absolute left-0 z-50 mt-2 w-80 origin-top-left rounded-lg bg-white shadow-xl ring-1 ring-black focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <div className="p-4">
                        <div className="grid gap-2">
                          {item.submenu.map(submenuItem => (
                            <Link
                              key={submenuItem.href}
                              href={submenuItem.href}
                              className="group focus:ring-navy block rounded-lg p-3 transition-colors duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                              role="menuitem"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="text-navy group-hover:text-navy-700 text-sm font-medium">
                                {getSubmenuLabel(submenuItem)}
                              </div>
                              {submenuItem.description && (
                                <div className="mt-1 text-xs text-gray-500">
                                  {getSubmenuDescription(submenuItem)}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Language Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`focus:ring-navy rounded-md border px-3 py-2 text-xs font-medium transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                isScrolled
                  ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
              aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
            >
              <span className="flex items-center space-x-1">
                <span className={language === 'es' ? 'font-bold' : ''}>ES</span>
                <span className="text-gray-400">/</span>
                <span className={language === 'en' ? 'font-bold' : ''}>EN</span>
              </span>
            </button>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`focus:ring-navy inline-flex items-center justify-center rounded-md p-2 transition-colors duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                  isScrolled
                    ? 'hover:text-navy text-gray-700 hover:bg-gray-100'
                    : 'hover:text-navy text-gray-700 hover:bg-gray-100'
                }`}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              >
                <span className="sr-only">
                  {isMenuOpen
                    ? 'Cerrar menú principal'
                    : 'Abrir menú principal'}
                </span>
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden lg:hidden"
              id="mobile-menu"
            >
              <div className="border-t border-gray-200 bg-gray-50 pt-4 pb-6">
                {navigationItems.map(item => (
                  <div key={item.href} className="px-4">
                    {item.submenu ? (
                      <div className="py-2">
                        <button
                          onClick={() => handleDropdownToggle(item.label)}
                          className="hover:text-navy flex w-full items-center justify-between py-2 text-base font-medium text-gray-700 transition-colors duration-300"
                          aria-expanded={activeDropdown === item.label}
                        >
                          {getNavItemLabel(item)}
                          <svg
                            className={`h-4 w-4 transition-transform duration-300 ${
                              activeDropdown === item.label ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-2 space-y-2 pl-4">
                                {item.submenu.map(submenuItem => (
                                  <Link
                                    key={submenuItem.href}
                                    href={submenuItem.href}
                                    className="hover:text-navy block py-2 text-sm text-gray-600 transition-colors duration-300"
                                    onClick={() => {
                                      setIsMenuOpen(false);
                                      setActiveDropdown(null);
                                    }}
                                  >
                                    {getSubmenuLabel(submenuItem)}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="hover:text-navy hover:border-navy block border-l-4 border-transparent py-3 pl-4 text-base font-medium text-gray-700 transition-colors duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {getNavItemLabel(item)}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
