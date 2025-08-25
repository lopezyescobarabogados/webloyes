'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { ServiceModalData } from '@/types/modal';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceModalData;
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!isOpen) return null;

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
            <div className="bg-gradient-to-r from-navy to-blue-800 px-6 py-8 text-white sm:px-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">{service.title}</h2>
                  <p className="mt-2 text-blue-200">{service.description}</p>
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

              <div className="grid gap-8 lg:grid-cols-2">
                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-navy">¿Qué Incluye?</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                            <svg className="h-3 w-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits */}
                {service.benefits && service.benefits.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-xl font-semibold text-navy">Beneficios</h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                            <svg className="h-3 w-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Process */}
              {service.process && service.process.length > 0 && (
                <div className="mt-8">
                  <h3 className="mb-4 text-xl font-semibold text-navy">Nuestro Proceso</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {service.process.map((step, index) => (
                      <div key={index} className="rounded-lg border border-gray-200 p-4">
                        <div className="mb-2 flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-900">Paso {index + 1}</span>
                        </div>
                        <p className="text-sm text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
