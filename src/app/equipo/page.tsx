import { Metadata } from 'next';
import { Suspense } from 'react';
import MainLayout from '@/layouts/MainLayout';
import TeamSection from '@/components/team/TeamSection';

export const metadata: Metadata = {
  title: 'Nuestro Equipo - López y Escobar Abogados | Conoce a Nuestros Expertos',
  description:
    'Conoce al equipo profesional de López y Escobar Abogados: especialistas en derecho corporativo, civil, penal y administrativo comprometidos con la excelencia.',
  keywords:
    'equipo, abogados profesionales, derecho corporativo, civil, penal, administrativo, López y Escobar, expertos',
  openGraph: {
    title: 'Nuestro Equipo - López y Escobar Abogados',
    description:
      'Descubre a los profesionales que hacen posible cada éxito legal',
    type: 'website',
  },
};

export default function EquipoPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="from-navy to-navy bg-gradient-to-br via-blue-900 py-16 text-white sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-serif text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              Nuestro{' '}
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Equipo
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-200 sm:text-xl md:text-2xl">
             Contamos con un equipo multidisciplinario que combina conocimiento jurídico especializado, visión estratégica y compromiso permanente con los intereses de nuestros clientes.
            </p>
          </div>
        </div>
      </section>


      {/* Sección del Equipo con Filtros */}
      <Suspense
        fallback={
          <section className="py-16 sm:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="mx-auto mb-4 h-8 w-64 rounded bg-gray-300"></div>
                  <div className="mx-auto h-4 w-96 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </section>
        }
      >
        <TeamSection />
      </Suspense>

      
    </MainLayout>
  );
}
