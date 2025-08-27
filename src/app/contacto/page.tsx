import { Metadata } from 'next';
import MainLayout from '@/layouts/MainLayout';
import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';

export const metadata: Metadata = {
  title: 'Contacto - López y Escobar Abogados | Consulta Jurídica',
  description:
    'Contacta a López y Escobar Abogados Asociados para recibir asesoría jurídica especializada. Formulario de contacto, teléfono y ubicación.',
  keywords:
    'contacto, consulta jurídica, asesoría legal, abogados, López y Escobar, derecho civil, comercial',
  openGraph: {
    title: 'Contacto - López y Escobar Abogados',
    description: 'Cuéntanos tu situación jurídica y descubre cómo podemos asesorarte',
    type: 'website',
  },
};

export default function ContactoPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="from-navy to-navy bg-gradient-to-br via-blue-900 py-16 text-white sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-serif text-4xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Contáctenos 
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* Formulario y Información de Contacto */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-12">
              {/* Formulario de Contacto */}
              <div className="lg:col-span-8">
                <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-12">
                  <div className="mb-8">
                    <h3 className="text-navy mb-4 font-serif text-2xl font-bold sm:text-3xl">
                      
                    </h3>
                    <p className="text-gray-600">
                      Completa este formulario.
                    </p>
                  </div>

                  <ContactForm />
                </div>
              </div>

              {/* Información de Contacto */}
              <div className="lg:col-span-4">
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
