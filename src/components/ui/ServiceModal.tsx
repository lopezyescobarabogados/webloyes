'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Button from './Button';
import { ServiceModalData } from '@/types/modal';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceModalData;
}

interface ServiceSection {
  title: string;
  items: string[];
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (index: number) => {
    setOpenSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  if (!isOpen) return null;

  const isServiceSection = (item: string | ServiceSection): item is ServiceSection => {
    return typeof item === 'object' && 'title' in item && 'items' in item;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative mx-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-navy via-blue-900 to-blue-950 px-6 py-8 text-gray-800 sm:px-8 overflow-hidden">
              {/* White gradient overlay on the right */}
              <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/70 to-transparent" />
              
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">{service.title}</h2>
                  <p className="mt-2 text-gray-900">{service.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {/* Detailed Description */}
              {service.detailedDescription && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-semibold text-navy">Descripción Detallada</h3>
                  <p className="leading-relaxed text-gray-700">{service.detailedDescription}</p>
                </div>
              )}

              <div className="grid gap-8">
                {/* Key Services / Portfolio */}
                {service.keyServices && service.keyServices.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-navy">Portafolio de Servicios</h3>
                    
                    {/* Check if we have structured services (accordion) */}
                    {isServiceSection(service.keyServices[0]) ? (
                      <div className="space-y-3">
                        {(service.keyServices as ServiceSection[]).map((section, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => toggleSection(index)}
                              className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
                            >
                              <span className="font-medium text-gray-900">{section.title}</span>
                              <svg
                                className={`h-5 w-5 text-gray-500 transition-transform ${
                                  openSections.includes(index) ? 'rotate-180' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            
                            <AnimatePresence>
                              {openSections.includes(index) && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 py-3 bg-white">
                                    <ul className="space-y-2">
                                      {section.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start gap-3">
                                          <div className="mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-100">
                                            <svg className="h-2.5 w-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                          </div>
                                          <span className="text-sm text-gray-700">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Regular list for services without sections */
                      <ul className="space-y-3">
                        {(service.keyServices as string[]).map((serviceItem, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                              <svg className="h-3 w-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-gray-700">{serviceItem}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="mt-8 rounded-lg bg-gray-50 p-6 text-center">
                <h3 className="mb-2 text-lg font-semibold text-navy">
                  ¿Necesitas este servicio?
                </h3>
                <p className="mb-4 text-gray-600">
                  Contáctanos para una consulta personalizada y sin compromiso
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button 
                    size="lg" 
                    onClick={() => {
                      onClose();
                      window.location.href = '/contacto';
                    }}
                  >
                    Solicitar Consulta
                  </Button>
                  <Button variant="outline" size="lg" onClick={onClose}>
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
