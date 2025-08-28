import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Navegación',
      links: [
        { href: '/', label: 'Inicio' },
        { href: '/nosotros', label: 'Nosotros' },
        { href: '/noticias', label: 'Noticias' },
        { href: '/contacto', label: 'Contacto' },
      ],
    },
    {
      title: 'Información',
      links: [
        { href: '/politica-privacidad', label: 'Política de Privacidad' },
        { href: '/cookies', label: 'Política de Cookies' },
        { href: '/admin', label: 'Panel Admin' },
      ],
    },
  ];

  return (
    <footer className="bg-navy-50 text-navy">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand with Logo */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-bold mb-3 text-navy">
              López & Escobar Abogados Asociados S.A.S.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Firma de abogados Litigio y Asesorías en Derecho| Civil - Inmobiliario | Comercial - Societario | Tributario | Laboral y Seguridad Social | SG-SST | SAGRILAFT/SARLAFT/PTEE | Planeación en dichas materias con mas de 25 años de experiencia.
            </p>
          </div>

          {/* Footer sections */}
          {footerSections.map(section => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-navy">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-navy transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contacto Section */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-navy">
              Contacto
            </h3>
            <div className="mt-4 space-y-4">
              {/* Teléfonos */}
              <div>
                <h4 className="text-sm font-medium text-navy mb-2">Teléfono</h4>
                <div className="space-y-1">
                  <a
                    href="tel:+573004308692"
                    className="block text-gray-600 hover:text-navy transition-colors"
                  >
                    300 4308692
                  </a>
                  <a
                    href="tel:+573113835833"
                    className="block text-gray-600 hover:text-navy transition-colors"
                  >
                    311 3835833
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Lunes a Viernes, 7:30-13:00/14:00-17:30
                </p>
              </div>

              {/* Emails */}
              <div>
                <h4 className="text-sm font-medium text-navy mb-2">Email</h4>
                <div className="space-y-1">
                  <a
                    href="mailto:mescobarm@lopezyescobarabogados.com"
                    className="block text-gray-600 hover:text-navy transition-colors text-sm"
                  >
                    mescobarm@lopezyescobarabogados.com
                  </a>
                  <a
                    href="mailto:blopez@lopezyescobarabogados.com"
                    className="block text-gray-600 hover:text-navy transition-colors text-sm"
                  >
                    blopez@lopezyescobarabogados.com
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Respuesta en menos de 24h
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-300 pt-8">
          <div className="flex justify-center mb-4">
            <Logo size="md" className="h-10 w-auto" />
          </div>
          <p className="text-center text-gray-500">
            © {currentYear} López & Escobar Abogados. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}