'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  description: string;
  bio?: string;
  imageUrl?: string;
  email: string;
  phone?: string;
  specialties?: string;
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

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cargar miembros del equipo desde la API
  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        const response = await fetch('/api/team');
        if (response.ok) {
          const data = await response.json();
          const activeMembers = data.filter((member: TeamMember) => member.active !== false);
          setTeamMembers(activeMembers);
        }
      } catch (error) {
        console.error('Error loading team members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  // Auto-scroll del carrusel cada 10 segundos
  useEffect(() => {
    if (teamMembers.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [teamMembers.length]);

  // Funciones de navegación del carrusel
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Parsear especialidades desde JSON string
  const parseSpecialties = (specialties?: string): string[] => {
    if (!specialties) return [];
    try {
      return JSON.parse(specialties);
    } catch {
      return [specialties];
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center space-x-3">
              <svg
                className="text-navy h-8 w-8 animate-spin"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-700">Cargando equipo...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
          <h2 className="text-navy mb-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
            Conoce a Nuestro Equipo
          </h2>
        </div>

        {teamMembers.length > 0 ? (
          <div className="relative">
            {/* Carrusel Horizontal */}
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="w-full flex-shrink-0"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Imagen del miembro */}
                        <div className="text-center">
                          <div className="mx-auto mb-6 h-64 w-64 overflow-hidden rounded-full bg-gray-200 shadow-lg">
                            {member.imageUrl ? (
                              <Image
                                src={member.imageUrl}
                                alt={member.name}
                                width={256}
                                height={256}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy to-blue-700 text-white">
                                <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Información del miembro */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-navy font-serif text-2xl font-bold md:text-3xl">
                              {member.name}
                            </h3>
                            <p className="text-lg font-medium text-blue-600">
                              {member.position}
                            </p>
                          </div>

                          <p className="text-gray-700 leading-relaxed">
                            {member.description || member.bio}
                          </p>

                          {/* Especialidades */}
                          {member.specialties && parseSpecialties(member.specialties).length > 0 && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Especialidades:</h4>
                              <div className="flex flex-wrap gap-2">
                                {parseSpecialties(member.specialties).map((specialty, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                                  >
                                    {specialty}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Información de contacto */}
                          <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="flex items-center text-gray-600 hover:text-navy transition-colors"
                              >
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                {member.email}
                              </a>
                            )}
                            {member.phone && (
                              <a
                                href={`tel:${member.phone}`}
                                className="flex items-center text-gray-600 hover:text-navy transition-colors"
                              >
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {member.phone}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navegación del carrusel */}
            {teamMembers.length > 1 && (
              <>
                {/* Botones de navegación */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl z-10"
                  aria-label="Miembro anterior"
                >
                  <svg className="h-6 w-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-xl z-10"
                  aria-label="Siguiente miembro"
                >
                  <svg className="h-6 w-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Indicadores de posición */}
                <div className="mt-8 flex justify-center space-x-2">
                  {teamMembers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-3 w-3 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'bg-navy' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Ver miembro ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          // Estado vacío - sin miembros del equipo
          <div className="py-20 text-center">
            <div className="mb-6 text-gray-400">
              <svg
                className="mx-auto h-20 w-20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-700">
              Equipo en Construcción
            </h3>
            <p className="mx-auto mb-8 max-w-md text-lg text-gray-500">
              Estamos preparando la presentación de nuestro equipo de profesionales especializados. Próximamente podrás conocer a los expertos que conforman López & Escobar Abogados Asociados.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/contacto">
                <Button size="lg" className="w-full sm:w-auto">
                  Contactar Ahora
                </Button>
              </Link>
              <Link href="/servicios">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Ver Servicios
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
