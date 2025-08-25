'use client';

import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ResponsiveGrid from '@/components/ui/ResponsiveGrid';
import ServiceModal from '@/components/ui/ServiceModal';
import { legalServices } from '@/data/legal-services';
import { ServiceModalData } from '@/types/modal';
import Link from 'next/link';

export default function ServiciosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceModalData | null>(null);

  const openServiceModal = (service: typeof legalServices[0]) => {
    const modalData: ServiceModalData = {
      id: service.id,
      title: service.title,
      description: service.shortDescription,
      detailedDescription: service.detailedDescription,
      features: service.features,
      benefits: service.benefits,
      process: service.process
    };
    setSelectedService(modalData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="from-navy to-navy bg-gradient-to-br via-blue-900 py-16 text-white sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h1 className="mb-6 font-serif font-bold sm:text-4xl text-gray-200">
              LÓPEZ & ESCOBAR ABOGADOS
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-white sm:text-xl">
              
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/contacto">
                <Button size="lg" variant="outline" className="w-full border-white bg-white text-navy hover:bg-blue-50 sm:w-auto">
                  Contáctanos
                </Button>
              </Link>
              <Link href="#servicios">
                <Button size="lg" variant="ghost" className="w-full border-white text-white hover:bg-white/10 sm:w-auto">
                  Ver Servicios
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introducción a los Servicios */}
      <section className="bg-white py-16 sm:py-20 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-serif font-bold text-navy sm:text-4xl">
              Nuestro Enfoque
            </h1>
            <p className="mb-10 text-lg leading-relaxed text-gray-600">
              Conocimiento legal profundo, experiencia práctica y comprensión de las necesidades reales del sector empresarial y juridico. Nuestro modelo de trabajo está basado en la prevención de riesgos jurídicos, el acompañamiento permanente y la resolución estratégica de conflictos.
            </p>
            <div className="grid gap-8 md:grid-cols-3 mb-6">
              <div className="text-center">
                
                <h3 className="mb-2 font-semibold text-navy">Prevención</h3>
                <p className="text-sm text-gray-600">Evitamos problemas legales antes de que ocurran</p>
              </div>
              <div className="text-center">
                
                <h3 className="mb-2 font-semibold text-navy">Acompañamiento</h3>
                <p className="text-sm text-gray-600">Asesoría permanente en todas sus decisiones</p>
              </div>
              <div className="text-center">
                
                <h3 className="mb-2 font-semibold text-navy">Resolución</h3>
                <p className="text-sm text-gray-600">Soluciones estratégicas y eficaces</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Detallados */}
      <section id="servicios" className="bg-gray-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-6 font-serif font-bold text-navy sm:text-4xl">
              Áreas de Práctica
            </h2>
          </div>

          <ResponsiveGrid variant="services" gap="lg">
            {legalServices.map((service) => (
              <Card key={service.id} className="group flex h-full flex-col p-8 transition-all duration-300 hover:shadow-xl">
                <h3 className="mb-4 font-serif text-xl font-semibold text-navy sm:text-2xl">
                  {service.title}
                </h3>
                
                <p className="mb-6 flex-1 leading-relaxed text-gray-600">
                  {service.fullDescription}
                </p>

                <div className="mb-6">
                  <h4 className="mb-3 font-medium text-navy">Servicios principales:</h4>
                  <ul className="space-y-2">
                    {service.keyServices.slice(0, 3).map((keyService, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <svg className="mr-2 mt-1 h-3 w-3 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {keyService}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => openServiceModal(service)}
                  >
                    Ver detalles
                  </Button>
                </div>
              </Card>
            ))}
          </ResponsiveGrid>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-navy to-navy bg-gradient-to-br via-blue-900 py-16 text-white sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center text-white">
            <h2 className="mb-6 font-serif text-3xl font-bold sm:text-4xl">
              Te Asesoramos
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-blue-100">
             Orientación jurídica estratégica y especializada
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contacto">
                <Button size="lg" variant="outline" className="w-full border-white bg-white text-navy hover:bg-blue-50 sm:w-auto">
                  Contáctanos
                </Button>
              </Link>
              <Link href="/equipo">
                <Button size="lg" variant="ghost" className="w-full border-white text-white hover:bg-white/10 sm:w-auto">
                  Equipo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          isOpen={isModalOpen}
          onClose={closeModal}
          service={selectedService}
        />
      )}
    </MainLayout>
  );
}
