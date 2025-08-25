import React from 'react';

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Información de Contacto */}
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h3 className="text-navy mb-6 font-serif text-xl font-bold">
          Información
        </h3>

        <div className="space-y-6">
          {/* Teléfono */}
          <div className="flex items-start">
            <div className="bg-navy mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-gray-900">Teléfono</h4>
              <div className="space-y-1">
                <a
                  href="tel:+573004308692"
                  className="hover:text-navy block text-gray-600 transition-colors"
                >
                  300 4308692
                </a>
                <a
                  href="tel:+573113835833"
                  className="hover:text-navy block text-gray-600 transition-colors"
                >
                  311 3835833
                </a>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Lunes a Viernes, 7:30 - 17:30
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start">
            <div className="bg-navy mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="mb-1 font-semibold text-gray-900">Email</h4>
              <div className="space-y-1 break-words">
              <a
                href="mailto:mescobarm@lopezyescobarabogados.com"
                className="hover:text-navy block text-gray-600 transition-colors break-all"
              >
                mescobarm@lopezyescobarabogados.com
              </a>
              <a
                href="mailto:blopez@lopezyescobarabogados.com"
                className="hover:text-navy block text-gray-600 transition-colors break-all"
              >
                blopez@lopezyescobarabogados.com
              </a>
              </div>
              <p className="mt-1 text-sm text-gray-500">
              Respuesta en menos de 24h
              </p>
            </div>
          </div>

          {/* Ubicación */}
          <div className="flex items-start">
            <div className="bg-navy mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
              <svg
                className="h-5 w-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h4 className="mb-1 font-semibold text-gray-900">Oficina</h4>
              <address className="text-gray-600 not-italic">
                Calle 6 Norte No.17-33
                <br />
                Sector Los Profesionales
                <br />
                Armenia, Quindío, Colombia
              </address>
              <p className="mt-1 text-sm text-gray-500">
                Visitas con cita previa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Horarios */}
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h3 className="text-navy mb-6 font-serif text-xl font-bold">
          Horarios de Atención
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 py-2">
            <span className="text-gray-600">Lunes - Viernes</span>
            <span className="font-semibold text-gray-900">7:30 - 17:30</span>
          </div>
          <div className="flex items-center justify-between border-b border-gray-100 py-2">
            <span className="text-gray-600">Sábados</span>
            <span className="text-gray-500">Cerrado</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-600">Domingos</span>
            <span className="text-gray-500">Cerrado</span>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Consultas urgentes:</span> Para
            consultas jurídicas urgentes, contáctanos por WhatsApp al
            <a href="https://wa.me/573004308692" className="ml-1 underline">
              300 4308692
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
